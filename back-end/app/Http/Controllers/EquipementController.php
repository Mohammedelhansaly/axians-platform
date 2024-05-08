<?php

namespace App\Http\Controllers;

use App\Exports\EquipementExport;
use App\Imports\EquipementImport;
use App\Models\Equipement;
use App\Models\Notification as ModelsNotification;
use App\Models\Project;
use App\Models\User;
use App\Notifications\EquipementNotification;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Notification as FacadesNotification;
use Maatwebsite\Excel\Excel as ExcelExcel;
use Maatwebsite\Excel\Facades\Excel;
use Tymon\JWTAuth\Facades\JWTAuth;

class EquipementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $projectId)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->findOrFail($projectId);
        $request->validate([
            'reference' => 'required',
            'licence' => 'required',
            'serialnumber' => 'required',
            'startDate' => 'required',
            'endDate' => 'required',
        ]);
        $project->equipements()->create($request->only(['reference', 'licence', 'serialnumber', 'startDate', 'endDate',]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($projectId, string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->findOrFail($projectId);
        return $project->equipements()->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $projectId, string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->findOrFail($projectId);
        $request->validate([
            'reference' => 'required',
            'licence' => 'required',
            'serialnumber' => 'required',
            'startDate' => 'required',
            'endDate' => 'required',
        ]);
        $project->equipements()->findOrFail($id)->update($request->only(['reference', 'licence', 'serialnumber', 'startDate', 'endDate',]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($projectId, string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->findOrFail($projectId);
        $project->equipements()->findOrFail($id)->delete();
    }

    public function getAllUserByAdmin()
    {
        $users = User::with('projects.equipements')->get();
        return $users;
    }

    // public function import($projectId, Request $request)
    // {
    //     $user = JWTAuth::parseToken()->authenticate();
    //     $project = $user->projects()->findOrFail($projectId);
    //     $path = $request->file('file')->getRealPath();


    //     Excel::import(new EquipementImport($project->id),$path, 'xlsx');
    // }

    public function import($projectId, Request $request)
    {

        try {
            $user = JWTAuth::parseToken()->authenticate();
            $project = $user->projects()->findOrFail($projectId);

            $data = $request->all();

            foreach ($data as $item) {
                $project->equipements()->create([
                    'reference' => $item['reference'],
                    'licence' => $item['licence'],
                    'startDate' =>  Carbon::create(1900, 1, 1)->addDays($item['startDate'] - 2)->toDateString(),
                    'endDate' =>  Carbon::create(1900, 1, 1)->addDays($item['endDate'] - 2)->toDateString(), // Assuming this is already in a valid date format
                    'serialnumber' => $item['serialnumber'],
                ]);
            }
            return response('succes');
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function export($projectId)
    {
        $project = Project::findOrFail($projectId);
        return Excel::download(new EquipementExport($projectId), $project->name . '.xlsx');
    }

    public function notification()
    {
        $today = Carbon::now();
        $user = JWTAuth::parseToken()->authenticate();
        $projects = $user->projects()->get();
        foreach ($projects as $project) {
            $expiredEquipments = $project->equipements()->where('endDate', '<', $today)->get();
            foreach ($expiredEquipments as $equipment) {
                $notificationExists = $user->notifications()
                    ->where('type', EquipementNotification::class)
                    ->where('data->project_id', $project->id)
                    ->where('data->equipement_id', $equipment->id)
                    ->exists();
                if (!$notificationExists) {
                    $user->notify(new EquipementNotification($project, count($expiredEquipments), $equipment));
                }
            }
        }
        // $user->notify(new EquipementNotification());
        // return $user;

        // $notificationData = (new EquipementNotification())->toArray($user);
        // return $notificationData;

        // foreach ($projects as $project) {
        //     $expiredEquipments = $project->equipements()->where('endDate', '<', $today)->get();
        //     foreach ($expiredEquipments as $equipment) {
        //         // Send notification for each expired equipment
        //         // FacadesNotification::send($user, new EquipementNotification($equipment));
        //         $user->notify(new EquipementNotification($equipment));
        //     }
        // }

        // $expiredEquipments = Equipement::where('endDate', '<', $today)->get();
        // $user = JWTAuth::parseToken()->authenticate();

        // foreach ($expiredEquipments as $expired) {
        //     FacadesNotification::send($user, new EquipementNotification($expired));
        // }
    }

    public function getNotification()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $notifications = $user->notifications()->orderBy('created_at', 'desc')->get();
        return $notifications;
    }
}
