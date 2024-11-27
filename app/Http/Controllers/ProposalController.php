<?php

namespace App\Http\Controllers;

use App\Models\ProjectAssignment;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index() 
    {
        $proposals = Proposal::with('freelancer:id,first_name,last_name,email')->get();

        return Inertia::render('Client/Proposals', [
            'proposals' => $proposals,
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
}
