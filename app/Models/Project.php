<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;

class Project extends Model
{
    use HasFactory, HasUuids, Searchable;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'status',
        'type',
        'client_id'
    ];

    public function toSearchableArray(): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
        ];
    }

    public function client(): BelongsTo {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function proposals(): HasMany {
        return $this->hasMany(Proposal::class, 'project_id');
    }

    public function assignment(): HasOne
    {
        return $this->hasOne(ProjectAssignment::class); 
    }
}
