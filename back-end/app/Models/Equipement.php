<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Equipement extends Model
{
    use HasFactory;


    
    protected $fillable = [
        'reference',
        'licence',
        'startDate',
        'endDate',
        'serialnumber',
        'project_id'
    ];
    public function projects()
    {
        return $this->belongsTo(Project::class);
    }
}