<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Single-action controller to display the dashboard
     * along with project postings
     */
    public function __invoke(Request $request) {
        $client = Auth::user();

        return Inertia::render('Client/Dashboard', [
            'projects' => $client->projects,
        ]);
    }
}
