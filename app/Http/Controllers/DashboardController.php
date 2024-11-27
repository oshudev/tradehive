<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $projects = Project::all(
            ['id', 'title', 'description', 'budget', 'status', 'type']
        )->where('client_id', Auth::id());

        return Inertia::render('Client/Dashboard', [
            'projects' => $projects,
        ]);
    }

    public function freelancer_index() {
        $proposals = Proposal::with('project:id,title,status')
            ->where('freelancer_id', Auth::id())
            ->get()
            ->map(function ($proposal) {
                return [
                    'id' => $proposal->id,
                    'project_id' => $proposal->project->id,
                    'freelancer' => $proposal->freelancer->first_name . ' ' . $proposal->freelancer->last_name,
                    'bid_amount' => $proposal->bid_amount,
                    'title' => $proposal->project->title,
                    'status' => $proposal->project->status,
                ];
            });

        return $proposals;
        
    }
}
