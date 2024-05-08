<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::create([
            'name' => 'Project1',
            'description' => 'Project1',
            'client' => 'benguerir',
            'user_id' => '1',
            'admin_id' => '1'
        ]);
    }
}