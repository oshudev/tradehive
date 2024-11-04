<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'status' => 'required|in:open,in_progress,completed,cancelled',
            'type' => 'required|in:fixed,hourly',
        ]);

        $clientId = Auth::id();

        Project::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'budget' => $request->input('budget'),
            'status' => 'open',
            'type' => $request->input('type'),
            'client_id' => $clientId,
        ]);

        return redirect()->route('client.dashboard')->with('success', 'Job posted successfully!');
    }
}
