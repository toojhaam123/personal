<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    protected $fillable = [
        'avatar',
        'fullname',
        'birth',
        'address',
        'link_address',
        'email',
        'facebook',
        'link_facebook',
        'github',
        "link_github",
    ];
}
