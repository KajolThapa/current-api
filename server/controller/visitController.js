const Visit  = require('../models/visitModel');
const mongoose = require('mongoose');
// const queryString = require('querystring');
// const url = require('url');

// const someURL ="http://example.com/index.html?code=string&key=12&id=false";

const myURI = 'mongodb+srv://current:currentAPI@cluster0-ljtai.mongodb.net/test?retryWrites=true&w=majority'
// const URI = process.env.MONGODB_URL;
const URI = process.env.URI || myURI;


mongoose.connect(URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to Database');
})

const visitController = {
        addLocation(req,res,next) {
            console.log(req.body)
            const {userId, name} = req.body;
            let userIdFormat = userId.toLowerCase();
            let nameFormat = name.toLowerCase();

        const newVisit = new Visit({userId: userIdFormat,name: nameFormat});
        newVisit.save()
        .then(visitInfo => {
            // console.log(visitInfo)
            res.locals.visitId = visitInfo.visitId;
            return next();
        })
        .catch(err => console.log(err))
            // res.status(501).send('unable to add to db'))
            
        },
        //visit?userId=666&searchString=Poland

        getLocationById(req,res,next) {
            const { visitId } = req.params;
            Visit.find({visitId: visitId})
             .then(data => {
                 res.locals.visitData = data;
                 return next();
             })
             .catch(err => {
                 console.log(err);
                 res.status(501).send('unable to find');
             })

        },
        getTopFive(req,res,next) {
            const { userId, searchString} = req.query;
            const searchQueries = searchString.replace(/['"]+/g, '').split(' ');
            const regexString = `(${searchQueries.join('|')})`.toLowerCase();
            console.log(regexString)
            Visit.find({userId: userId, name: new RegExp(regexString)})
                .then(data => {
                    console.log(data)
                    res.locals.topFive = data
                    return next();
                })
                .catch(err => console.error(err))
        }
    
}

module.exports = visitController;

