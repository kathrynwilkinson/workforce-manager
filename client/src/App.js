import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import MenuToolbar from './components/MenuToolbar';
import Dashboard from './pages/Dashboard';
import EmpDash from './pages/EmpDash';
import CreateJob from './pages/CreateJob';
// import EditJob from './pages/EditJob';
import Form from './pages/Form'
import JobDetail from './pages/JobDetail';
import Crews from './pages/Crews';
import axios from 'axios';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { useRadioGroup } from '@material-ui/core';

function App() {
    const [user, setUser] = useState(null);
    // const [job, setJob] = useState([]);
    useEffect(() => { getUser() }, [])


    const getUser = async () => {
        await axios({
            method: "GET",

            url: '/auth/user'
        }).then(res => {
            setUser(res.data)
        })

            .catch(err => console.log(err));

    };

    console.log(user);

    return (
        <Router>
            {!user &&
                <Routes>
                    <Route index element={<Login setUser={setUser} />} />
                    <Route path='*' element={<Login setUser={setUser} />} />
                </Routes>}
            {user &&
                <>
                <MenuToolbar linkHidden={user.type === "Administrator" ? false : true} setUser={setUser} />
                    <Routes>
                        <Route index element={user.type === "Administrator" ? <Dashboard user={user} /> : <EmpDash user={user} />} />
                        <Route path={'/dashboard'} element={user.type === "Administrator" ? <Dashboard user={user} /> : <EmpDash user={user} />} />
                        <Route path='/createjob' element={user.type === "Administrator" ? <CreateJob user={user} /> : ""} />
                        <Route path='/crews' element={user.type === "Administrator" ? <Crews /> : ""} />
                        <Route path='/jobdetail/:id' element={<JobDetail inputDisabled={user.type === "Employee" ? true : false} />} />

                        <Route path='/form' element={<Form />} />
                        <Route path='/jobdetail' element={<JobDetail user={user} />} />
                        <Route path='*' element={<JobDetail user={user} />} />
                    </Routes>
                </>
            }

        </Router>
    );
};


export default App;

//TODO: switch statement - if not logged in, redirect to login page
