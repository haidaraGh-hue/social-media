<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = ['user_id', 'text', 'to_user_id'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
