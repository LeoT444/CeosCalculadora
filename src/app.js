const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    res.render('home')
});
app.get('/login', (req,res)=>{
    res.render('login')
});

app.get('/calculo', (req,res)=>{
    res.render('calculos')
});

app.use('/css', express.static('public/css'))


const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Rodando");
});
