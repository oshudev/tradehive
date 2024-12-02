<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectAssignment;
use App\Models\Proposal;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProposalController extends Controller
{
    public function index() 
    {
        $proposals = Project::with('proposals.freelancer')
            ->where('client_id', Auth::id())
            ->get()
            ->reduce(function ($acc, $project) {
                return $acc->concat($project->proposals);
            }, collect());
        
        
        return Inertia::render('Client/Proposals', [
            'proposals' => $proposals,
        ]);
    }

    public function create($id): Response 
    {
        $project = Project::findOrFail($id);

        return Inertia::render('Client/ProposalSubmission', [
            'project' => $project,
        ]);
    }

    public function updateStatus(Proposal $proposal, string $action)
    {
        if (!in_array($action, ['accept', 'reject'])) {
            return response()->json([
                'message' => 'Invalid action.',
            ], 400);
        }

        if ($action === 'accept') {
            $proposal->project->update(['status' => 'in_progress']);

            Proposal::where('project_id', $proposal->project_id)
                ->where('id', '!=', $proposal->id)
                ->update(['status' => 'rejected']);
        }

        ProjectAssignment::create([
            'project_id' => $proposal->project_id,
            'proposal_id' => $proposal->id,
            'assigned_at' => now(),
        ]);

        $proposal->update(['status' => $action === 'accept' ? 'accepted' : 'rejected']);

        return redirect()->back()->with('message', 'Proposal has been ' . $action . 'ed successfully.');
    }

    public function store(Request $request) {
        $request->validate([
            'project_id' => 'required|uuid|exists:projects,id',
            'bid_amount' => 'required|numeric|min:0|max_digits:6',
        ]);

        $freelancerID = Auth::id();

        Proposal::create([
            'project_id' => $request->project_id,
            'freelancer_id' => $freelancerID,
            'bid_amount' => $request->bid_amount,
        ]);

        // TODO: Change redirect to somewhere?
        return redirect()->route('freelancer.dashboard');
    }
}
