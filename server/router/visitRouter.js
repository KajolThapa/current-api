const router = require('express').Router();
const { addLocation, getLocationById, getTopFiveRecords } = require('../controller/visitController')

router.post('/', addLocation, (req,res) => {
    res.send(res.locals.visitId);
})

router.get('/', (req,res) => {
    res.send(`Hello World!`);

})
router.get('/:visitId', getLocationById, (req,res) => {
    res.send(res.locals.visitData);
})

router.get('/', getTopFiveRecords, (req,res) => {
    res.send(res.locals.topFive)
})



module.exports = router;