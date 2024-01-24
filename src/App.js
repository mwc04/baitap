import { useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import BuyPage from './page/buy';

function App() {

  const [sumit, setSumit] = useState({
    username: null,
    password: null
  })
  const [users,setUsers] = useState([])
  function onSumit() {
    console.log(sumit)

    axios.post(`http://localhost:3000/users`, sumit)

  }
  useEffect(() => {
    axios.get(`http://localhost:3000/users`).then(function(a){
      console.log(a)
      setUsers([...a.data])
    })
  }, []);


  function handerInput(e) {
    console.log(e.target.value, e.target.name)
    let data = ({ ...sumit })
    data[e.target.name] = e.target.value
    setSumit({ ...data })
  }


  return (
    <>
      <div>
        <label for="username"></label>
        <input name='username' onChange={handerInput} type='text' placeholder="username" value={sumit.username}></input>
        <label htmlFor="password"></label>
        <input name='password' onChange={handerInput} type="password" placeholder="password" value={sumit.password}></input>
        <button onClick={onSumit}>Create</button>

      </div>
      <div>
        <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.username}</td>
            <td>{user.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='buy' element = {< BuyPage/>}/> 
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;
