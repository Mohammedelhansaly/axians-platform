<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'client',
        'user_id'
    ];
    public function users()
    {
        return $this->belongsTo(User::class);
    }
    public function admins()
    {
        return $this->belongsTo(Admin::class);
    }
    public function equipements()
    {
        return $this->hasMany(Equipement::class);
    }
}