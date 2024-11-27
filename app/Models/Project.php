<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'status',
        'type',
        'client_id'
    ];

    public function client(): BelongsTo {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function proposals(): HasMany {
        return $this->hasMany(Proposal::class);
    }

    public function assignment(): HasOne
    {
        return $this->hasOne(ProjectAssignment::class); 
    }
}
