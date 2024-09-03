

import React, { useState, useEffect } from 'react';
import FileSaver from 'file-saver';


function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Tanish",
      role: "developer",
      email: "kapoortanish01@gmail.com"
    },
    {
      id: 2,
      name: "Karan",
      role: "tester",
      email: "karan01@gmail.com"
    },
    {
      id: 3, // Changed from 1 to 3 to ensure unique IDs
      name: "Tushar",
      role: "developer",
      email: "tushar@gmail.com"
    }
  ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [role,setrole]=useState('');



    const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

      const handlerolechange = (event) => {
    setrole(event.target.value);
  };

   const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) && user.role.toLowerCase().includes(role.toLowerCase())

);

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType })
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

const exportToCsv = e => {
  e.preventDefault()
  // Headers for each column
  let headers = ['id,name,role,email']
  // Convert users data to a csv
  let usersCsv = filteredUsers.reduce((acc, user) => {
    const { id, name, role, email } = user
    acc.push([id, name, role, email].join(','))
    return acc
  }, [])
  downloadFile({
    data: [...headers, ...usersCsv].join('\n'),
    fileName: 'Admin.csv',
    fileType: 'text/csv',
  })
}



  return (
    <div>
      <h1>User List</h1>

      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchTerm} 
        onChange={handleSearchChange}
      />

            <input 
        type="text" 
        placeholder="Search by role..." 
        value={role} 
        onChange={handlerolechange}
      />

        <button type='button' onClick={exportToCsv}>
          Export to CSV
        </button> 


        {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <RenderUser 
            key={user.id} 
            id={user.id} 
            name={user.name} 
            role={user.role} 
            email={user.email} 
          />
        ))
      ) : (
        <p>No users found</p>
      )}
{/* 
      {users.map((user) => (
        <RenderUser key={user.id} id={user.id} name={user.name} role={user.role} email={user.email} />
      ))} */}
    </div>
  );
}



function RenderUser(props) {
  return (
    <div>
      <p>ID: {props.id}</p>
      <p>Name: {props.name}</p>
      <p>Role: {props.role}</p>
      <p>Email: {props.email}</p>
      <hr />
   </div>
  );
}

export default App;
