const db = require('./db');
const config = require('../config');

async function listOfMembers() {
    return await db.query("SELECT * FROM members")
}

async function getcities() {
    return await db.query("SELECT * FROM cities")
}

async function getMember(memberId) {
    let details=  await db.query(
    `SELECT me.* ,ci.cityName FROM members AS me JOIN cities AS ci
    on me.cityId=ci.cityID
    WHERE me.memberID="${memberId}"`)
    let covidinfections=await db.query(`SELECT 
    DATE_FORMAT(ci.infectionDate, '%Y-%m-%d') AS infectionDate,
    DATE_FORMAT(ci.recoveryDate, '%Y-%m-%d') AS recoveryDate
    FROM members AS am
    JOIN covidinfections AS ci ON am.memberID = ci.memberID
    WHERE am.memberID="${memberId}"`)
    let covidVaccinationsDetails=await db.query(
    `SELECT cv.vaccineID, DATE_FORMAT(cv.vaccinationDate, '%Y-%m-%d') AS vaccinationDate
    ,ma.manufacturerName,cv.manufacturerId FROM members AS me
    JOIN covidvaccinations AS cv JOIN manufacturer AS ma ON me.memberID = cv.memberID
    and cv.manufacturerId=ma.manufacturerId
    WHERE me.memberID="${memberId}" `
    )
    let result={details,covidVaccinationsDetails,covidinfections}
    return result
}

async function addMember(newMemberDetails) {
    let status,data;
    let NewMember=await db.query(
    `select * from members where memberID="${newMemberDetails.memberID}"`
    )
    if(NewMember[0]!=undefined){
        status=0
        data={NewMember,status}
        return data;  
    }
    else{
        status=1;
        let NewMember=await db.query(
        `INSERT INTO members(memberID,firstName,lastName,address,cityId,birthDate,phone,cellPhone)
        VALUES(${newMemberDetails.memberID},
        "${newMemberDetails.firstName}",
        "${newMemberDetails.lastName}",
        "${newMemberDetails.address}",
        ${newMemberDetails.city},
        "${newMemberDetails.birthDate}",
        "${newMemberDetails.phone}",
        "${newMemberDetails.cellPhone}");`
        );
    data={NewMember,status}
    return data;
    }
    
}

async function deleteMember(data){
    await db.query(`DELETE FROM covidvaccinations WHERE memberID = ${data.id}`);
    await db.query(`DELETE FROM covidinfections WHERE memberID = ${data.id}`);
    await db.query(`DELETE FROM members WHERE memberID=${data.id}`);
    return "delete success"
}

async function updateMemberDetails(memberID,data){
    await db.query
    (`UPDATE members
        SET firstName = "${data.firstName}",
            lastName = "${data.lastName}",
            address = "${data.address}",
            cityId = "${data.city}",
            birthDate = "${data.birthDate}",
            phone = "${data.phone}",
            cellPhone = "${data.cellPhone}"
        WHERE memberID = ${memberID}`)
    return "successfully updated"
}

module.exports={
    listOfMembers,
    getcities,
    getMember,
    addMember,
    deleteMember,
    updateMemberDetails
}