<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectAssignmentController extends Controller
{
    public function index() {
        $approvedProposals = Proposal::with([
            'freelancer:id,first_name,last_name', // Get freelancer first and last name
            'project:id,title,status' // Get project title and status
        ])
        ->where('status', 'accepted') // Only accepted proposals
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

        return Inertia::render('Client/AllContracts', [
            'contracts' => $approvedProposals,
        ]);
    }
}
