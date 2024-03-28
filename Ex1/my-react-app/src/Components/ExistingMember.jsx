import { Outlet, useParams } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import MemberForm from './MemberForm';
import CovidForm from './CovidForm';


function ExistingMember() {

    const [memberDetails, setMemberDetails] = useState([]);
    const { memberId } = useParams();
    useEffect(() => {
        getMemberDetails();
    }, []);

    async function getMemberDetails() {
        console.log("get member id in react")
        let allMemberDetails = await fetch(`http://localhost:3030/members/getMember/${memberId}`);
        let memberDetails1 = await allMemberDetails.json();
        setMemberDetails(memberDetails1)
        console.log(memberDetails)
    }
    
    if (memberDetails?.details?.[0] !==undefined) {
        return (
            <div>
              <h1> Hello {memberDetails.details[0]?.firstName}</h1>
              <MemberForm memberDetails={memberDetails?.details} />
              <CovidForm memberDetails={memberDetails}></CovidForm>
            </div>
        );
    }
    else {
        return (
            <div>
              <h1>Loading member details..</h1>
            </div>
        );
    }
}
export default ExistingMember