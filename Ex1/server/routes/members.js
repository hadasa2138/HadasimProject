const express = require('express');
const router = express.Router();
const members = require('../services/members');

 
router.get('/listOfMembers', async function (req, res, next) {
    try {
        let answer = await members.listOfMembers();
        res.json(answer);
    } catch (err) {
        console.log(`Error while getting programming languages `, err.message);
        next('sss');
    }
});

router.get('/getcities', async function (req, res, next) {
  try {
      let answer = await members.getcities();
      res.json(answer);
  } catch (err) {
      console.log(`Error while getting programming languages `, err.message);
      next('sss');
  }
});

router.get('/getMember/:memberId', async function (req, res, next) {
  let memberId=req.params.memberId;
  try {
      let answer = await members.getMember(memberId)
      res.json(answer);
  } catch (err) {
      console.error(`Error while getting programming languages `, err.message);
      next(err);
  }
});

router.post('/addMember', async function (req, res, next) {
  try { 
      let answer = await members.addMember(req.body);
      res.json(answer);
  } catch (err) {
      console.log(`Error while getting programming languages `, err.message);
      next(err);
  }
});

router.put('/updateMemberDetails/:id',async function(req,res,next){
  try{
    let memberId=req.params.id;
    let answer=await members.updateMemberDetails(memberId,req.body)
    res.json(answer)
  }catch (err) {
    console.log(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.delete('/deleteMember', async function (req, res, next) {
  try { 
      let answer = await members.deleteMember(req.body);
      res.json(answer);
  } catch (err) {
      console.log(`Error while getting programming languages `, err.message);
      next(err);
  }
});

module.exports = router;