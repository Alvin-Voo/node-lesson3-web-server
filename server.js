const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req, res, next)=>{
  //middleware mounted without a path will be executed for every request to the app.
  let now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`);

  fs.appendFile('server.log', `${now}: ${req.method} ${req.url} \n`, (err)=>{
    if(err) console.log('unable to append server log')
  })
  next();
})

// app.use((req, res, next)=>{//handy code to redirect all url to maintenance page, and not having to forward the next handler
//   res.render('maintenance');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{//hbs will look for helper first before looking to the arguments passed in
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (input)=>{
  return input.toUpperCase();
})

app.get('/', (req, res)=>{
  res.render('home',{
    pageTitle: 'Home',
    name: 'Alvin'
  })
});

app.get('/about', (req,res)=>{
  res.render('about',{
    pageTitle: 'About'
  });
});

app.get('/projects', (req,res)=>{
  res.render('projects',{
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req,res)=>{
  res.send('bad request');
});

app.listen(port, ()=>console.log('listening at '+port));
