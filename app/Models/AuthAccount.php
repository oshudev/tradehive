<?php

namespace App\Models;

use App\Enums\AuthProviders;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class AuthAccount extends Authenticatable
{
    use HasFactory, Notifiable, HasUuids;

    /**
     * The primary key type
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The "type" of the primary key ID
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'provider',
        'provider_account_id',
        'secret',
        'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'provider' => AuthProviders::class,
        'email_verified_at' => 'datetime',
    ];
}
