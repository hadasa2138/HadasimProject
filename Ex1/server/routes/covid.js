const express = require('express');
const router = express.Router();
const members = require('../services/covid');

router.get('/getManufacturers', async function (req, res, next) {
  try {
      let answer = await members.getManufacturers();
      res.json(answer);
  } catch (err) {
      console.log(`Error while getting programming languages `, err.message);
      next('sss');
  }
});

router.post('/addCovidVaccination', async function (req, res, next) {
    try {
      let answer = await members.addCovidVaccination(req.body);
      res.json(answer);
    } catch (err) {
        console.log(`Error while getting programming languages `, err.message);
        next(err);
    }
});
  
router.post('/addCovidInfection', async function (req, res, next) {
    try { 
        let answer = await members.addCovidInfection(req.body);
        res.json(answer);
    } catch (err) {
        console.log(`Error while getting programming languages `, err.message);
        next(err);
    }
});
  
router.put('/updateVaccination/:id',async function(req,res,next){
  try{
    let memberId=req.params.id;
    let answer=await members.updateVaccination(memberId,req.body)
    res.json(answer)
  }catch (err) {
    console.log(`Error while getting programming languages `, err.message);
    next(err);
  }
});
  
module.exports = router;
