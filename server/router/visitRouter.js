const router = require('express').Router();
const { addLocation, getLocationById, getTopFiveRecords } = require('../controller/visitController')

router.post('/', addLocation, (req,res) => {
    res.send(res.locals.visitId);
})

router.get('/:visitId', getLocationById, (req,res) => {
    console.log(res.locals.visitData);
    res.send(res.locals.visitData);
})

router.get('/', getTopFiveRecords, (req,res) => {
    console.log(res.locals)
    console.log(res.locals.topFive)
    res.send(res.locals.topFive)
})



module.exports = router;