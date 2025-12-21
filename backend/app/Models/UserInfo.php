<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    protected $fillable = [
        'user_id',
        'avatar',
        'fullname',
        'job_title',
        'birth',
        'address',
        'link_address',
        'email',
        'phone',
        'facebook',
        'link_facebook',
        'github',
        "link_github",
    ];
}
