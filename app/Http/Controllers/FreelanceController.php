<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FreelanceController extends Controller
{
    public function index(): Response {
        $projects = Project::with('project:id,title,status')
            ->where('status', 'open')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,                    
                    'budget' => $project->budget,
                    'type' => $project->type,
                    'status' => $project->status,
                ];
            });

        return Inertia::render('Freelancer/Home', [
            'projects' => $projects,
        ]);
    }
}
