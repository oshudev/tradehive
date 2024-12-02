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
        $projects = Project::where('client_id', Auth::id())->get(['id', 'title', 'description', 'budget', 'status', 'type']);

        return Inertia::render('Client/Dashboard', [
            'projects' => $projects,
        ]);
    }
}
