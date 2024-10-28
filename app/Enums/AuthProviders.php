<?php

namespace App\Enums;

enum AuthProviders: string
{
    case Password = 'password';
    case Google = 'google';
}
