<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class DepartmentController extends Controller
{
    // this will create department in database
    public function insert(Request $request)
    {
        // validating  data
        $validator = Validator::make($request->all(), [
            'dept_name' => 'required|string|max:25|unique:departments,dept_name',
        ]);
        // throw an error if Validation failed
        if($validator->fails()){
             return   response()->json(['errors' => $validator->errors()], 422);
        }

        $department = new Department();
        $department->dept_name = $request->input('dept_name');
        $department->save();

        return response()->json(['message' => 'Department created successfully'], 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function show()
    {
         $department = Department::all();
         return $department;
    }


}
