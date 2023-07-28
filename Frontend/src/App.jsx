import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'; 
import Table from './components/UserTable';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
const URL = 'http://127.0.0.1:8000/api/showStudent';
 
 
function App() {
  const [allUsers,setAllUsers] = useState([]);

  const fetchData = async () =>{
        const response = await axios.get(URL);
        setAllUsers(response.data);
  }

  useEffect(()=>{
          fetchData();
  },[]);

  
  return (
    <>
      <Container>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={ <Table fetchData={fetchData}  allUsers={allUsers}/>} />
                  <Route path="/addUser" element={<AddUser fetchData={fetchData}/>} />
                  <Route path="/editUser/:id" element={<EditUser fetchData={fetchData}/>} />
                </Routes>
           </BrowserRouter>   
      </Container>
 
    </>
  )
}

export default App
