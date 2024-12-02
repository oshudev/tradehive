<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FreelanceController extends Controller
{
    public function index(): Response {
        $projects = Project::where('status', 'open')->get();

        return Inertia::render('Freelancer/Home', [
            'projects' => $projects,
        ]);
    }
}
