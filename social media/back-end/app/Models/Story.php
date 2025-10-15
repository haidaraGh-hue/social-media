<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $table = 'stories';

    protected $fillable = ['file_path', 'file_type', 'user_id'];

    protected $hidden = [
        'remember_token',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
