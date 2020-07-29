const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyparser= require('body-parser');
const exphbs=require('express-handlebars');
const path= require('path');

// settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname+'/views/',
    partialsDir: __dirname+'/views/partials/'
}));
app.set('view engine','hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Endpoints for external data
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/no_key', async (req, res) => {
    const response = await fetch('https://jeanlnrs-eval-test.apigee.net/firstproxy');
    const data = await response.json();
    res.json(data);
});

app.get('/yes_key', async (req, res) => {
    const response = await fetch('https://jeanlnrs-eval-test.apigee.net/firstproxy?apikey=Qc0bA6Pu3jLeSaoQLTXw1nnqnXZ0LElC');
    const data = await response.json();
    res.json(data);
});

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});