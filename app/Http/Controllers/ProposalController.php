<?php

namespace App\Http\Controllers;

use App\Models\ProjectAssignment;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function index() 
    {
        $proposals = Proposal::with(['project:id,client_id', 'freelancer:id,first_name,last_name,email'])
            ->get()
            ->where('project.client_id', Auth::id());


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
