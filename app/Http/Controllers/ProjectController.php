<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectUpdateRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index() {
        return Inertia::render('Client/JobPost');
    }

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

    public function update(ProjectUpdateRequest $request) {
        $validated = $request->validated();

        $project = Project::find($validated['id']);
        $project->fill($validated);
        $project->save();

        return redirect()->route('client.dashboard')->with('success', 'Job edited successfully');
    }

    public function cancel(Project $project)
    {
        if ($project->status === 'cancelled') {
            return response()->json(['message' => 'Project is already cancelled.'], 400); // Return with a bad request status
        }
    
        $project->update(['status' => 'cancelled']);

        foreach ($project->proposals as $proposal) {
            $proposal->update(['status' => 'rejected']);         
        }
    
        return redirect()->route('client.project_assignment.index')->with('success', 'Project cancelled successfully.');
    }

    public function destroy(Project $project) {
        $project->delete();

        return redirect()->route('client.dashboard')->with('success', 'Project deleted successfully.');
    }
}
