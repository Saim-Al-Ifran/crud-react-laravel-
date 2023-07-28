import React, { useEffect, useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const USER_DATA = {
    name: '',
    email: '',
    number: '',
    department: '',
    file: null,
}

const URL = 'http://127.0.0.1:8000/api/showDept';


const AddUser = ({fetchData}) => {
     
    const navigate = useNavigate();
    const [formData, setFormData] = useState({...USER_DATA});
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');
    const [department,setDepartment] = useState('');
    const [file,setFile] = useState(null);
    const [allDepartments,setAllDepartments] = useState([]);
    const [errors,setErrors] = useState({})

    const fetchDepartsment = async() =>{
            const response = await axios.get(URL);
            setAllDepartments(response.data);
    }
    
    useEffect(()=>{
           fetchDepartsment();
    },[])
    // controlled input field 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
  // controlled file input 
    const handleFileChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          file: e.target.files[0],
        }));
      };

    // function for submitting form data
    const handleSubmit = async(e)=>{
          e.preventDefault();

          try{

            const userData = new FormData();
            userData.append('name',formData.name);
            userData.append('email',formData.email);
            userData.append('number',formData.number);
            userData.append('department',formData.department);
            userData.append('img_file',formData.file);
  
            const response = await axios.post('http://127.0.0.1:8000/api/addStudent',userData);
          
            if(response.status === 200){
                 navigate('/');
                 fetchData();
            }     
            console.log(response)
            setFormData({
              name: '',
              email: '',
              number: '',
              department: '',
              file: null,
            });
           // console.log(formData);
           setErrors({});
          }catch(Error){

            const {response} = Error;
            const {data} = response;
            const {errors,message} = data;
             
            if(response.status === 401){
               setErrors(errors);
            
            }
          }
         console.log(errors);

    }

    //console.log(error)

    return (
   <>
        <HeaderTitle title="Add User Information" btnTxt="🚀Back" route="/"/>
       <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label  className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                 />
                 {errors.name && <span style={{color:"red"}}>{errors.name[0]}</span>}
            </div>

            <div className="mb-3">
                <label  className="form-label">Email address</label>
                <input 
                    type="email"
                    className="form-control"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span style={{color:"red"}}>{errors.email[0]}</span>}
            </div>

            <div className="mb-3">
                <label  className="form-label">Number</label>
                <input
                    type="number"
                    className="form-control"
                    name='number'
                    value={formData.number}
                    onChange={handleChange}
                 />
                   {errors.number && <span style={{color:"red"}}>{errors.number[0]}</span>}
            </div>
            <Form.Select  className='mb-2 mt-2' name='department' value={formData.department}  onChange={handleChange}>
                <option>Select Department</option>
                {allDepartments.map((department)=> (
                     <option key={department.id} value={department.id}>{department.dept_name}</option>
                ))}
               
            </Form.Select>
            {errors.department && <span style={{color:"red"}}>{errors.department[0]}</span>}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control 
                  type="file"
                  name='img_file'
                  onChange={handleFileChange}
                />
                {errors.img_file && <span style={{color:"red"}}>{errors.img_file[0]}</span>}
            </Form.Group>
 
            <button type="submit" className="btn btn-primary">Submit</button>
      </form>
   </>
  )
}

export default AddUser