import React, { useEffect, useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditUser = ({fetchData}) => {
   const navigate = useNavigate();
   const {id} = useParams();
   const [departments,setDepartment] = useState([]);
   const [userData,setUserData] = useState({});
   
   const fetchSingledata = async () =>{
           try{
                const response = await axios.get(`http://127.0.0.1:8000/api/editUser/${id}`);
                
                setUserData({
                       name:response.data[0].name,
                       email:response.data[0].email,
                       number:response.data[0].number,
                       department:response.data[0].department,
                       image:response.data[0].image,
                       dept_name:response.data[0].dept_name,
                       new_img:null
                });
           }catch(error){
                console.log(error);
           }
   }

   const fetchDepartment = async ()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/showDept`);
                setDepartment(response.data);
            }catch(error){
                    console.log(error);
            }
   }
   const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

  // controlled file input 
  const handleFileChange = (e) => {
        setUserData((prevState) => ({
        ...prevState,
        new_img: e.target.files[0],
        }));
    };

    const handleSubmit = async(e)=>{
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('name',userData.name);
                formData.append('email',userData.email);
                formData.append('number',userData.number);
                formData.append('department',userData.department);
                formData.append('old_img',userData.image);
                formData.append('new_img',userData.new_img);
                
                console.log(formData);
                const apiUrl = `http://127.0.0.1:8000/api/updateStudent/${id}?_method=PUT`;
                const response = await axios.post(apiUrl, formData);
                // Handle the response as needed
                if(response.status === 200){
                        navigate('/');
                        fetchData();
                       // response.data.message
                }
             
            }catch (error) {
              // Handle errors if any
                console.log( error);
            }
           console.log(userData)

    }

   useEffect(()=>{
          fetchSingledata();
          fetchDepartment();
   },[id]);

  return (
 
  <>
     <HeaderTitle title="Edit User Information" btnTxt="🚀Back" route="/"/>
       <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label  className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={userData.name || ''}
                    name='name'
                    onChange={handleChange}
                />
                <input type="hidden" value={id}/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    value={userData.email || ''}
                    name='email'
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Number</label>
                <input
                    type="number" 
                    className="form-control"  
                    value={userData.number || ''}
                    name='number'
                    onChange={handleChange}
                 />
            </div>
            <Form.Select   className='mb-2 mt-2' value={ userData.department || ''} name='department' onChange={handleChange}>
                <option  >Select Department</option>
                {departments.map((department)=>(
                       <option key={department.id} value={department.id}  >{department.dept_name}</option>
                ))}
                
        
            </Form.Select>
            <img src={`http://127.0.0.1:8000/storage/images/${userData.image}`} alt="logo" width="130px"/>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control
                    type="file"
                    name='new_img'
                    onChange={handleFileChange}
                 />
                <input type="hidden" value={userData.image || ''} name='old_img'/>
            </Form.Group>
 
            <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  </>
  )
}

export default EditUser