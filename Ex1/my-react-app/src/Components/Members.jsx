import { Outlet } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../App.css'

function Members() {
    
    const [membersList,setMembersList]=useState([]);

    useEffect(() => {
        getListOfMembers();
    }, []);

    const getListOfMembers=async()=>{
        let ListOfMembers = await fetch(`http://localhost:3030/members/listOfMembers`);
        console.log("here")
        let ListOfMembersArray = await ListOfMembers.json();
        setMembersList([...ListOfMembersArray])
    }
   
    return (
        <div>
            <h1>Members of the Health Fund</h1>
            <Link  to="/memberDetails/new">
                <button className='sideButtons'>new member</button>
            </Link>
            {membersList.map((member) =>  
            <Link className='linkcss' to={`/memberDetails/${member.memberID}`} key={member.memberID}>
            <div className="grid-container">
            <div>{member.memberID}    </div>
            <div>{member.firstName}</div>
            <div>{member.lastName}</div>
            </div>
            </Link>)};   
        </div>
    );
}

export default Members;





   

