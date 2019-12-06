const Visit  = require('../models/visitModel');
const mongoose = require('mongoose');

const myURI = 'mongodb+srv://current:currentAPI@cluster0-ljtai.mongodb.net/test?retryWrites=true&w=majority'
const URI = process.env.URI || myURI;


mongoose.connect(URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to Database');
})

const visitController = {
        addLocation(req,res,next) {
            const {userId, name} = req.body;
            let userIdFormat = userId.toLowerCase();
            let nameFormat = name.toLowerCase();

        const newVisit = new Visit({userId: userIdFormat,name: nameFormat});
        newVisit.save()
        .then(data => {
            res.locals.visitId = data.visitId;
            return next();
        })
        .catch(err => res.send(err));
            
        },

        getLocationById(req,res,next) {
            const { visitId } = req.params;
            Visit.find({visitId: visitId})
             .then(data => {
                 res.locals.visitData = data;
                 return next();
             })
             .catch(err => {
                 res.status(501).send('unable to find');
             })

        },

        getTopFiveRecords(req,res,next) {
            const { userId, searchString} = req.query;
            const searchQueries = searchString.replace(/['"]+/g, '').split(' ');
            const regexString = `(${searchQueries.join('|')})`.toLowerCase();
            Visit.find({userId: userId, name: new RegExp(regexString)})
                .then(data => {
                    res.locals.topFive = data
                    return next();
                })
                .catch(err => res.send(err))
        }
    
}

module.exports = visitController;

