import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import moment from 'moment';
import '../App.css'

function MemberForm(props) {
    
    useEffect(() => {
        getCitiesList()
       if (firstTime){
       updateFields()
        setFirstTime(false)}
    }, []);

    const nav = new useNavigate();
    const [firstTime, setFirstTime] = useState(true);
    const [id, setId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [birthDate, setBirthDate] = useState();
    const [phone, setPhone] = useState();
    const [cellPhone, setCellPhone] = useState();
    const [cityList, setCityList] = useState([]);

    const { memberId } = useParams();
    const today = new Date().toISOString().split('T')[0]; 
    const propsDetails=props.props!=='new'? props.memberDetails[0]:'new';
      
    async function getCitiesList(){
        let allcities = await fetch(`http://localhost:3030/members/getcities`);
        let allcities1 = await allcities.json();
        setCityList(allcities1)
    }
      
    function updateFields(){
        setId(propsDetails.memberID)
        setFirstName(propsDetails.firstName)
        setLastName(propsDetails.lastName)
        setAddress(propsDetails.address)
        setCity(propsDetails.cityId)
        const formattedDate = moment(propsDetails.birthDate).format('YYYY-MM-DD');
        setBirthDate(formattedDate)
        setPhone(propsDetails.phone)
        setCellPhone(propsDetails.cellphone)
    }

    function idChange(e){
        setId(e.target.value)
    }
    function firstNameChange(e){
        setFirstName(e.target.value)
    }
    function lastNameChange(e){
        setLastName(e.target.value)
    }
    function addressChange(e){
        setAddress(e.target.value)
    }
    function cityChange(e){
        setCity(e.target.value)
    }
    function birthDateChange(e){
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setBirthDate(formattedDate)
    }
    function phoneChange(e){
        setPhone(e.target.value)
    }
    function cellPhoneChange(e){
        setCellPhone(e.target.value)
    }
    
    function isIsraeliIdNumber(id) {
        id = String(id).trim();
        if (id.length > 9 || isNaN(id)) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }

    function integrityCheck(){
        let errors=[]
        if(Object.values([id,firstName,lastName,address,phone,cellPhone])?.some((value) => value === undefined)){
            alert("Please enter all details");
            return false;
        }
        if( !isIsraeliIdNumber(id)){
            errors.push("Wrong id")
        }
        let textCheck = /^(?=.{2,})[A-Za-z ']+$/;
        let numbersCheck = /^(05[0-9]{8}|0(2|3|4|8|9)\d{7})$/;
        let addressCheck=/^(?=.{2,})[A-Za-z0-9 "']+$/
        if( textCheck.test(firstName)===false ||
            textCheck.test(lastName)===false){
            errors.push("Wrong text")
        }
        if( numbersCheck.test(phone?? "")===false ||
            numbersCheck.test(cellPhone?? "")===false){
            errors.push("One or more of the phone numbers you entered are incorrect")
        }
        if( addressCheck.test(address)===false){
            errors.push("Wrong address")
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }
        return true
    }
    
    async function newMemberSubmit(){
        if (integrityCheck()){
            let response = await fetch('http://localhost:3030/members/addMember', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberID:id,firstName:firstName,lastName:lastName,address:address,city:city,birthDate:birthDate,phone:phone,cellPhone:cellPhone})
            });
            const answer = await response.json();
            console.log(answer)
            if(answer.status===0){
                const confirmResult = window.confirm("member already exist. Do you want to update the details?");
                if(confirmResult){
                    updateMemberDetailsSubmit()
                    nav(`/memberDetails/${id}`) 
                }
            }
            else if(answer.status===1){
                    alert('member added successfuly');
                    nav(`/memberDetails/${id}`)
            }
        }
    }
    
    async function updateMemberDetailsSubmit(){
        if(integrityCheck()){
            let response = await fetch(`http://localhost:3030/members/updateMemberDetails/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({memberID:id,firstName:firstName,lastName:lastName,address:address,city:city,birthDate:birthDate,phone:phone,cellPhone:cellPhone})
            });
            const answer = await response.json();
            if(answer==="successfully updated"){
                alert('The details have been successfully updated');
                window.location.reload();
            }
            else alert("Error")  
        }
    }
    
    function backToHomePage(){
        nav('/')
    }

    return(
        <div className='member'>
            <h1>ID number</h1>
            <input maxLength={9} disabled={propsDetails==='new'?false:true} value={id} onChange={idChange}></input>
            <h1>First name</h1>
            <input  type='text' value={firstName} onChange={firstNameChange}></input>
            <h1>Last name</h1>
            <input value={lastName} onChange={lastNameChange}></input><br />
            <h1>Address</h1>
            <input value={address} onChange={addressChange}></input><br />
            <h1>City</h1>
            <select value={city} onChange={cityChange}>
                    {(cityList)?.map((city1) =>{ return(<option key={city1.cityId} value={city1.cityId} > {city1.cityName}</option>) ;})}
            </select>
            <h1>Birth date</h1>
            <input type='date' max={today} value={birthDate} onChange={birthDateChange}></input><br />
            <h1>Phone</h1>
            <input maxLength={9} value={phone} onChange={phoneChange}></input><br />
            <h1>Cell phone</h1>
            <input maxLength={10} value={cellPhone} onChange={cellPhoneChange}></input><br />
            {memberId===undefined && <button onClick={newMemberSubmit} >Submit</button>}
            {memberId!==undefined &&<button onClick={updateMemberDetailsSubmit} >Update</button>}<br/>
            <button className='sideButtons' onClick={backToHomePage}>Back to home page</button>
        </div>
    );
}

export default MemberForm;