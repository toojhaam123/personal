<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class FormContact extends Model
{
    use HasFactory;

    protected $table = 'formcontacts';

    protected $fillable = ['name', 'email', 'message'];
}
