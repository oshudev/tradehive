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
}
