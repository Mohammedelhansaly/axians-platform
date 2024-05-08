<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->with('equipements')->get();
        return $project;
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
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        // Create a new project instance with attributes from the request
        $request->validate([
            'name' => 'required',
            'client' => 'required',
            'description' => 'required'
        ]);

        $user->projects()->create($request->only(['name', 'client', 'description']));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->with('equipements')->findOrFail($id);
        return $project;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->with('equipements')->findOrFail($id);
        return $project;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $project = $user->projects()->with('equipements')->findOrFail($id);

        $request->validate([
            'name' => 'required',
            'client' => 'required',
            'description' => 'required'
        ]);

        $project->update($request->only(['name', 'client', 'description']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $project = $user->projects()->with('equipements')->findOrFail($id);
            $project->delete();
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Project not found.'], 404);
        }
    }

    public function getProject()
    {
        return Project::with('equipements')->get();
    }
    
    
}