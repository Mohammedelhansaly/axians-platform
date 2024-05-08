<?php

namespace App\Exports;

use App\Models\Project;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnLimit;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EquipementExport implements
    FromArray,
    ShouldAutoSize,
    WithHeadings,
    WithEvents,
    WithColumnWidths
{
    protected $projectId;

    public function __construct($projectId)
    {
        $this->projectId = $projectId;
    }
    public function headings(): array
    {
        return [
            'Reference',
            'Licence',
            'Date de debut',
            'Date de fin',
            'numéro de série',
        ];
    }

    // public function styles(Worksheet $sheet)
    // {
    //     // Apply styling to the Excel sheet
    //     return [
    //         1    => ['font' => ['bold' => true]], // Apply bold font to the first row (headings)
    //         'A:Z' => ['alignment' => ['horizontal' => 'center']],
    //         // Center align all columns

    //     ];
    // }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Apply Excel formatting
                $event->sheet->getStyle('A1:E1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['rgb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => 'solid',
                        'startColor' => ['rgb' => '007bff'],
                    ],
                ]);
            },
        ];
    }
    public function array(): array
    {
        $list = [];

        $project = Project::findOrFail($this->projectId);
        $equipements = $project->equipements;
        foreach ($equipements as $equipement) {
            $list[] = [$equipement->reference,
             $equipement->licence,
              $equipement->startDate,
               $equipement->endDate, 
               $equipement->serialnumber];
        }
        return $list;
    }

    public function columnWidths(): array
    {
        return [
            'B' => '55'
        ];
    }
}