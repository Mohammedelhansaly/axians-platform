<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $table = 'notifications';

    protected $fillable = [
        'id',
        'type',
        'data',
        'read_at',
        'user_id',
        'admin_id',
    ];
    protected $casts = [
        'data' => 'array'
    ];
    public function admins()
    {
        return $this->belongsTo(Admin::class);
    }
    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function setDataAttribute($data)
    {
        $this->attributes['data'] = json_encode($data);
    }
}