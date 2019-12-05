const router = require('express').Router();
const { addLocation, getLocationById, getTopFive } = require('../controller/visitController')
// const someURL ="http://example.com/index.html?code=string&key=12&id=false";

router.post('/', addLocation, (req,res) => {
    console.log('after adding to db', res.locals.visitId);
    res.send(res.locals.visitId);
})

router.get('/:visitId', getLocationById, (req,res) => {
    console.log(res.locals.visitData);
    res.send(res.locals.visitData);
})

router.get('/', getTopFive, (req,res) => {
    console.log('after trying to search top 5 locations');
    res.send(res.locals.topFive)
})





module.exports = router;