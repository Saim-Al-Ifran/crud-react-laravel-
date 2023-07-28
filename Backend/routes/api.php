<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\DepartmentController;


Route::post('/addDept',[DepartmentController::class,'insert']);
Route::get('/showDept',[DepartmentController::class,'show']);
Route::post('/addStudent',[StudentController::class,'insert']);
Route::get('/showStudent',[StudentController::class,'show']);
Route::put('/updateStudent/{id}',[StudentController::class,'update']);
Route::get('/editUser/{id}',[StudentController::class,'singleData']);
Route::get('/search',[StudentController::class,'search']);
Route::post('/filter',[StudentController::class,'filter']);
Route::post('/delete/{id}',[StudentController::class,'delete']);



