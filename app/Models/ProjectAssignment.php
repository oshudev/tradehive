<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class ProjectAssignment extends Model
{
    use HasUuids;

    protected $fillable = ['project_id', 'proposal_id', 'assigned_at'];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function freelancer(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Proposal::class, 'id', 'id', 'proposal_id', 'freelancer_id');
    }
}
