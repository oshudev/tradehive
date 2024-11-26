<?php

namespace App\Http\Controllers;

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
        $proposal = Proposal::findOrFail($proposal->id);

        if (!in_array($action, ['accept', 'reject'])) {
            return response()->json([
                'message' => 'Invalid action.',
            ], 400);
        }

        $proposal->update(['status' => $action === 'accept' ? 'accepted' : 'rejected']);

        return redirect()->back()->with('message', 'Success');
    }
}
