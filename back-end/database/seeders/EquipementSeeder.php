<?php

namespace Database\Seeders;

use App\Models\Equipement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipement::create([
            'reference' => 'abc',
            'licence' => 'abc',
            'serialnumber' => 'abcd',
            'startDate' => '2015-12-10',
            'endDate' => '2015-12-23',
            'project_id' => '1'
        ]);
    }
}
