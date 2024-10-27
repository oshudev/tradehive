<?php

namespace App\Http\Controllers\Auth;

use App\Enums\AuthProviders;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\AuthAccount;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        \Log::info('Registration request received', $request->all()); // Log the request data

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'role' => ['required', new Enum(UserRole::class)],
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', Rules\Password::defaults()],
        ]);

        try {
            // Attempt to create the user
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'role' => $request->role,
                'email' => $request->email,
            ]);

            $authAccount = AuthAccount::create([
                'provider' => AuthProviders::Password,
                'provider_account_id' => $request->email,
                'secret' => Hash::make($request->password),
                'user_id' => $user->id,
            ]);

            event(new Registered($authAccount));

            Auth::login($authAccount);

            return redirect(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            // Log the error and return a response
            \Log::error('Registration error: ' . $e->getMessage());
            \Log::info('Registration request received', $request->all());
            return redirect()->back()->withErrors(['error' => 'Registration failed.']);
        }
    }
}
