const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const visitRouter = require('./router/visitRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const port = process.env.PORT || 3000;

app.use('/visit', visitRouter);
app.listen(port, () => console.log(`server listening at ${port}`));

