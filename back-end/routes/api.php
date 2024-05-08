<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EquipementController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin'], function () {
    Route::post('login', [AdminController::class, 'login']);
    Route::post('/createUser', [AdminController::class, 'createUser']);

    // Protected routes for authenticated admin
    Route::group(['middleware' => 'auth:admin'], function () {
        Route::post('logout', [AdminController::class, 'logout']);
        Route::post('refresh', [AdminController::class, 'refresh']);
        Route::post('me', [AdminController::class, 'me']);
        Route::get('/getUsers', [AdminController::class, 'getUsers']);
        Route::post('/updateProfile', [AdminController::class, 'UpdateProfile']);
        Route::post('/updatePassword', [AdminController::class, 'updatePassword']);


        Route::get('/mesprojet', [ProjectController::class, 'index']);
        Route::post('/mesprojet/create', [ProjectController::class, 'store']);
        Route::get('/mesprojet/show/{id}', [ProjectController::class, 'show']);
        Route::get('/mesprojet/edit/{id}', [ProjectController::class, 'edit']);
        Route::post('/mesprojet/update/{id}', [ProjectController::class, 'update']);
        Route::get('/mesprojet/destroy/{id}', [ProjectController::class, 'destroy']);
        Route::get('/mesprojet/all', [ProjectController::class, 'getProject']);

        Route::post('/mesprojet/{id}/equipemets/create', [EquipementController::class, 'store']);
        Route::get('/mesprojet/{id}/equipemets/edit/{id2}', [EquipementController::class, 'edit']);
        Route::post('/mesprojet/{id}/equipemets/update/{id2}', [EquipementController::class, 'update']);
        Route::get('/mesprojet/{id}/equipemets/destroy/{id2}', [EquipementController::class, 'destroy']);
        Route::get('/allusers', [EquipementController::class, 'getAllUserByAdmin']);
        Route::get('/notify', [EquipementController::class, 'notification']);
        Route::get('/notification', [EquipementController::class, 'getNotification']);
        Route::post('/mesprojet/{id}/equipemets/import', [EquipementController::class, 'import']);
    });
});





Route::group(['prefix' => 'user'], function () {
    Route::post('login', [UserController::class, 'login']);

    // Protected routes for authenticated users
    Route::group(['middleware' => 'auth:user'], function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('refresh', [UserController::class, 'refresh']);
        Route::post('me', [UserController::class, 'me']);
        Route::post('/updateProfile', [UserController::class, 'UpdateProfile']);
        Route::post('/updatePassword', [UserController::class, 'updatePassword']);


        Route::get('/mesprojet', [ProjectController::class, 'index']);
        Route::post('/mesprojet/create', [ProjectController::class, 'store']);
        Route::get('/mesprojet/show/{id}', [ProjectController::class, 'show']);
        Route::get('/mesprojet/edit/{id}', [ProjectController::class, 'edit']);
        Route::post('/mesprojet/update/{id}', [ProjectController::class, 'update']);
        Route::get('/mesprojet/destroy/{id}', [ProjectController::class, 'destroy']);


        Route::post('/mesprojet/{id}/equipemets/create', [EquipementController::class, 'store']);
        Route::get('/mesprojet/{id}/equipemets/edit/{id2}', [EquipementController::class, 'edit']);
        Route::post('/mesprojet/{id}/equipemets/update/{id2}', [EquipementController::class, 'update']);
        Route::get('/mesprojet/{id}/equipemets/destroy/{id2}', [EquipementController::class, 'destroy']);
        Route::get('/notify', [EquipementController::class, 'notification']);
        Route::get('/notification', [EquipementController::class, 'getNotification']);
        Route::post('/mesprojet/{id}/equipemets/import', [EquipementController::class, 'import']);
    });
});

Route::get('/mesprojet/{id}/equipemets/export', [EquipementController::class, 'export']);
