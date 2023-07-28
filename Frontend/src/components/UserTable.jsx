import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import HeaderTitle from './HeaderTitle';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserTable = ({allUsers,fetchData}) => {

  const handleDelete = async(id) =>{
 
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/delete/${id}`);
      fetchData();
      toast.success(response.data.message);
     
    } catch (error) {
      console.error(error.response.data.error);
      // Handle errors if needed
    }
  }

 
     
  return (
    <>
      <HeaderTitle title="User Information" btnTxt = "+ Add User" route="/addUser"/>
        <Table striped bordered hover  >
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Number</th>
          <th>Deparment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user)=>(        
        <tr>
          <td>{user.id}</td>
          <td><img src={`http://127.0.0.1:8000/storage/images/${user.image}`} width="50px" /></td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.number}</td>
          <td>{user.dept_name}</td>
          <td>
               <Link to={`/editUser/${user.id}`}>
                  <Button variant="warning" className='me-3'>Edit</Button>
               </Link>
                
                  <Button variant="danger" onClick={()=>handleDelete(user.id)}>Delete</Button>
                  <ToastContainer />
          </td>
        </tr>
        ))}

 
 
      </tbody>
    </Table>
    </>
  )
}

export default UserTable;