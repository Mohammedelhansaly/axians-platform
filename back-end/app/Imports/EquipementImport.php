<?php

namespace App\Imports;

use App\Models\Equipement;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithColumnLimit;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class EquipementImport implements ToModel
{
    use Importable;

    protected $projectId;

    public function __construct($projectId)
    {
        $this->projectId = $projectId;
    }
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // $project = Project::findOrFail($this->projectId);
        Log::info('Row data:', $row);
        return new Equipement([
            'reference' => $row[0],
            'licence' => $row[1],
            'startDate' => Carbon::createFromFormat('Y-m-d', $row[2])->toDateString(),
            'endDate' => Carbon::createFromFormat('Y-m-d', $row[3])->toDateString(),
            'serialnumber' => $row[4],
            'project_id' => $this->projectId
        ]);
    }
}