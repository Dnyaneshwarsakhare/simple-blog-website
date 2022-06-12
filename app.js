const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb+srv://username:password@cluster_name.sl8dr.mongodb.net/cluster_name?retryWrites=true&w=majority';

mongoose.connect(dbURI,{ useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine','ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
  res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{ title : 'About'});
});
// Blog routes moved to the routes/blogRoutes.js
app.use('/blogs',blogRoutes);



app.use((req,res)=>{
    res.status(404).render('404',{ title : '404'});
});