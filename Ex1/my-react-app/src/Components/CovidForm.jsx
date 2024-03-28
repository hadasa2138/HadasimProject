import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'
import moment from 'moment';

function CovidForm(props) {
    const nav = new useNavigate();
    const today = new Date().toISOString().split('T')[0]; 
    const propsCovidVaccination= props.memberDetails.covidVaccinationsDetails;
    const propsCovidInfection=props.memberDetails.covidinfections;
    const { memberId } = useParams();
    const [newVaccinationDate, setNewVaccinationDate] = useState();
    const [newVaccineManufacturer, setNewVaccineManufacturer] = useState();
    const [manufacturersList, setManufacturersList] = useState([]);
    const [infectionDate, setInfectionDate] = useState();
    const [recoveryDate, setRecoveryDate] = useState();
    const [vaccinationDateUpdated, setVaccinationDateUpdate] = useState();
    const [manufacturersUpdated, setManufacturersUpdated] = useState();
    const [currentVaccineId, setCurrentVaccineId] = useState();


    useEffect(() => {
        getManufacturersList()
    }, [getManufacturersList]);

    function newVaccinationDateChange (e){
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setNewVaccinationDate(formattedDate)
    }
    function newVaccineManufacturerChange(e){
        setNewVaccineManufacturer(e.target.value)
    }
    function infectionDateChange (e){
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setInfectionDate(formattedDate)
    }
    function recoveryDateChange(e){
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setRecoveryDate(formattedDate)
    }
    function vaccinationDateUpdate(event, vaccineID){
        const formattedDate = moment(event.target.value).format('YYYY-MM-DD');
        setVaccinationDateUpdate(formattedDate)
        setCurrentVaccineId(vaccineID)
    }
    function manufacturersUpdate(event,vaccineID){
        setManufacturersUpdated(event.target.value)
        setCurrentVaccineId(vaccineID)
    }

    async function getManufacturersList(){
        let allManufacturers = await fetch(`http://localhost:3030/covid/getManufacturers`);
        let allManufacturers1 = await allManufacturers.json();
        setManufacturersList(allManufacturers1)
        console.log(manufacturersList)
    }

    async function deleteMember(){
        const confirmResult = window.confirm("Are you sure you want to delete the member?");
        if(confirmResult){
            let response = await fetch('http://localhost:3030/members/deleteMember', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id:memberId})
        });
        const answer = await response.json();
        if(answer==="delete success"){
        alert('Member deleted');
            nav(`/`)}
        else alert("Error")
        }
    }

    async function addInfection(){
        if(recoveryDate>infectionDate){
            let response = await fetch('http://localhost:3030/covid/addCovidInfection', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberID:memberId,infectionDate:infectionDate,recoveryDate:recoveryDate})
            });
            const answer = await response.json();
            if(answer==="Added successfully"){
                alert("Infection and recovery dates successfully added")
                window.location.reload();
            }
            else alert("Error")
        }
        else{
        alert("The dates you entered are incorrect")
        }
    }

    async function updateVaccination(){
            let response = await fetch(`http://localhost:3030/covid/updateVaccination/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({vaccineID:currentVaccineId, vaccinationDate:vaccinationDateUpdated,manufacturerId:manufacturersUpdated})
            });
        const answer = await response.json();
        if(answer==="successfully updated"){
            alert('The details have been successfully updated');
            window.location.reload();
        }
        else alert("Error")  
    }
    
    async function addVaccineDetails(){
        if(newVaccinationDate){
            let response = await fetch('http://localhost:3030/covid/addCovidVaccination', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberID:memberId,vaccinationDate:newVaccinationDate,vaccineManufacturer:newVaccineManufacturer})
            });
            const answer = await response.json();
            if(answer==="successfully updated"){
                alert('Vaccination date have been successfully added');
                window.location.reload();
            }
            else alert("error")  
        }
        else{
            alert("please enter vaccination date")
        }
    }

    return(
        <div>
            <h1 id="covidTitle">Corona vaccination dates</h1>
            <div className='covid'>
                {(propsCovidVaccination)?.map((vaccination)=>{return(
                <div key={vaccination.vaccineID} className='vaccination'>
                    <h1>Vaccination date</h1>
                    <input type='date'
                         value={(vaccinationDateUpdated&&currentVaccineId===vaccination.vaccineID)
                         ?vaccinationDateUpdated: vaccination.vaccinationDate} 
                         onChange={(event) => vaccinationDateUpdate(event, vaccination.vaccineID)}>
                    </input>
                    <h1>Manufacturer</h1>
                    <select value={(manufacturersUpdated&&currentVaccineId===vaccination.vaccineID)?
                        manufacturersUpdated:vaccination.manufacturerId}
                        onChange={(event) => manufacturersUpdate(event, vaccination.vaccineID)}>
                        {(manufacturersList)?.map((manufacturer) =>{ return(
                        <option key={manufacturer.manufacturerId} value={manufacturer.manufacturerId} >
                             {manufacturer.manufacturerName}
                        </option>) ;})}
                    </select>
                    <button onClick={updateVaccination}>Update</button>
                </div>
                );})}
                {propsCovidVaccination.length<4 && (
                <div className='vaccination'>
                    <h1>Add vaccination date</h1>
                    <input  type='date' max={today} onChange={newVaccinationDateChange}></input><br />
                    <h1>vaccine manufacturer</h1>
                    <select onChange={newVaccineManufacturerChange}>
                        {(manufacturersList)?.map((manufacturer) =>{ return(<option key={manufacturer.manufacturerId} value={manufacturer.manufacturerId} > {manufacturer.manufacturerName}</option>) ;})}
                    </select>
                    <button onClick={addVaccineDetails}>add</button><br/>
                </div>
                )}
                <div className='vaccination'>
                    <h1>infection Date</h1>
                    <input type='date'  
                        max={today} value={propsCovidInfection[0]?.infectionDate} 
                        onChange={infectionDateChange}
                        readOnly={propsCovidInfection[0]?.infectionDate ? true : false}>
                    </input><br/>
                    <h1>Recovery Date</h1>
                    <input type='date'
                        max={today} value={propsCovidInfection[0]?.recoveryDate}  
                        onChange={recoveryDateChange} 
                        readOnly={propsCovidInfection[0]?.recoveryDate ? true : false}>
                    </input><br/>
                    {!propsCovidInfection[0] &&<button  onClick={addInfection} >Submit</button>}
                </div>
            </div>
            <button className='sideButtons' onClick={deleteMember} >Delete member</button>
        </div>
    );
}

export default CovidForm