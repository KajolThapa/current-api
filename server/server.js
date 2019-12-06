const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const visitRouter = require('./router/visitRouter');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const port = process.env.PORT || 3000;


// const corsOptions = {
//     origin: "https://peaceful-wave-70447.herokuapp.com/",
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
// app.use(cors(corsOptions));
app.get('/', (req,res) => {
    return res.send({'text': 'hello world'});
})
app.use('/visit', visitRouter);
app.listen(port, () => console.log(`server listening at ${port}`));

// https://peaceful-wave-70447.herokuapp.com/