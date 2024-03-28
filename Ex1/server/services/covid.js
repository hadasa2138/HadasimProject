const db = require('./db');
const config = require('../config');

async function addCovidInfection(newCovidInfection) {
    await db.query(
        `INSERT INTO covidinfections(memberID,infectionDate,recoveryDate)
        VALUES(${newCovidInfection.memberID},
        "${newCovidInfection.infectionDate}",
        "${newCovidInfection.recoveryDate}");`
    );
    return "Added successfully";
}

async function addCovidVaccination(newVaccinationDetails) {
    await db.query(
        `INSERT INTO covidvaccinations(memberID,vaccinationDate,manufacturerId)
        VALUES(${newVaccinationDetails.memberID},
        "${newVaccinationDetails.vaccinationDate}",
        "${newVaccinationDetails.vaccineManufacturer}");`
    );
    return "successfully updated";
}

    
async function getManufacturers() {
    return await db.query("SELECT * FROM manufacturer")
}

async function updateVaccination(memberID, data) {
    const { vaccinationDate, manufacturerId, vaccineID } = data;
    let updateQuery = `UPDATE covidvaccinations SET`;
    let updateValues = [];
    if (vaccinationDate !== undefined) {
        updateValues.push(`vaccinationDate = "${vaccinationDate}"`);
    }
    if (manufacturerId !== undefined) {
        updateValues.push(`manufacturerId = ${manufacturerId}`);
    }
    if (updateValues.length === 0) {
        return 'No updates provided';
    }
    updateQuery += ' ' + updateValues.join(', ');
    updateQuery += ` WHERE memberId = ${memberID} AND vaccineID = ${vaccineID}`;
    let updatedMember = await db.query(updateQuery);
    return "successfully updated";
}

module.exports={
    addCovidVaccination,
    addCovidInfection,
    getManufacturers,
    updateVaccination
}