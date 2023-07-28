<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{


    public function insert(Request $request)
    {

        $student = new Student();
        // validating  data
        $validator = Validator::make($request->all(), [
               "name"=> "required|string|min:3|max:50",
               "email"=> "required|email|unique:students,email",
               "number"=> "required|string|size:11",
               "department"=> "required|string|max:50",
               "img_file" => "required|file|mimes:jpeg,png|max:2048"
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }else{

            $student->name       = $request->input('name');
            $student->email      = $request->input('email');
            $student->number     = $request->input('number');
            $student->department = $request->input('department');
          //  $student->image = $request->input('image');
            if ($request->hasFile('img_file')) {

                $file_image = time().'-'.$request->file('img_file')->getClientOriginalName();
                // Store the file in a specific location
                $request->file('img_file')->storeAs('public/images',$file_image);
               // Get the file's original name
                $student->image = $file_image;

            }

            $student->save();

           return ["message"=>"Student Added Successfully!!"];


        }
    }
    public function show(){
               $student = DB::table('departments')
                         ->join('students','departments.id','=','students.department')
                         ->get();
               return $student;
    }
    public function singleData($id){

            $singleStudent = DB::table('departments')
                                ->join('students','departments.id','=','students.department')
                                ->where('students.id','=',$id)
                                ->get();
            return $singleStudent;
    }
    public function search(Request $request){
            $searchTerm = $request->input('searchTerm');
            $results = DB::table('departments')
                           ->join('students','departments.id','=','students.department')
                           ->where('dept_name', 'LIKE', '%' . $searchTerm. '%')
                           ->get();

          return $results;
    }

    public function update(Request $request,$id){
             $student = Student::find($id);

             $validator = Validator::make($request->all(), [
                "name"=> "required|string|max:50",
                "email"=> "required|email",
                "number"=> "required|string|max:11",
                "department"=> "required|string|max:50",
                "new_img" => "nullable",
            ]);

        if (!is_null($request->file('new_img'))) {
            $validator->sometimes('new_img', 'mimes:jpeg,jpg,png|max:2048', function ($input) {
                return !is_null($input->file('new_img'));
            });
        }

            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validator->errors()
                ], 401);
            }
             $student->name = $request->name;
             $student->email = $request->email;
             $student->number = $request->number;
             $student->department = $request->department;

                if(!$request->hasFile('new_img') == "" or !$request->hasFile('new_img') == null){

                    $image = time().'-'.$request->file('new_img')->getClientOriginalName();
                    $request->file('new_img')->storeAs('public/images', $image);
                    $updateImg =  $image;

                }else{
                    $updateImg = $request->old_img;
                }
              $student->image = $updateImg;
              $student->update();
              return  ["message" => "Record Updated Successfully"];
             // return $request->all();

    }


    //Function to filter
    public function filter(Request $request){
                $filter = $request->filterTerm;
                $student = DB::table('departments')
                             ->join('students','departments.id','=','students.department')
                             ->where('dept_name', '=', $filter)
                             ->orWhere('department','=',$filter)
                             ->get();

                return $student;

    }

    public function delete($id){
            $delete_std= Student::find($id);
            $delete_std->delete();
            return ["message" => "Record Deleted Successfuly"];
    }
}
