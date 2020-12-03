const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const mongoose = require('mongoose');
const Assignments = require('../models/assignments');
const Users = require('../models/users');
var mongoDB = 'mongodb+srv://Emily_Vainberg:nreLh64ev12@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to database established.")
    })
    .catch(err => {
        console.log("Error connecting to database.")
        console.log(err)
    })

function parseMatches(a_matches) {
  var matches =[]
  var ids = []
  for (let i of a_matches) {
    matches.push(i.title);
    ids.push(i._id);
  }
  return matches;
}

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
      console.log("LOGGED YOU IN! SUCCESSFUL MATCH!", result)
  } else {
      console.log("INCORRECT!")
  }
  return result;
}

app.get('/login', async function(req, res) {
  //const {email, password} = req.query;
  const email = req.query.email;
  const password = req.query.password;
  //console.log(q);
  console.log("Server side received: ", email, password);
  var a_matches = await Users.findOne({
    email: email
  })
  if(!a_matches) {
    a_matches = null;
  }
  // const login = async (pw, hashedPw) => {
  //   const result = await bcrypt.compare(pw, hashedPw);
  //   if (result) {
  //       console.log("LOGGED YOU IN! SUCCESSFUL MATCH!")
  //   } else {
  //       console.log("INCORRECT!")
  //   }
  // }
  if(a_matches) {
    bcrypt.compare(password, a_matches.hash)
    .then((result) => res.send({response: result}))
    .catch((failure) => res.send({response: failure}));
  }
  else 
    res.send({response: false});
  // if(a_matches) {
  //   const result = login(password, a_matches.hash);
  //   res.send({response: result});
  // }
  //res.send({response: req.query});
})

app.get('/search/sort', async function(req, res) {
  const {q} = req.query;
  console.log("Called /search/sort get")
  const a_matches = await Assignments.find({
    title: {$regex: /(q)+{1}/, "$options": "i"}
  });
  const matches = parseMatches(a_matches);
  
})

app.get('/search', async function(req, res){
    const q = req.query.q;
    //console.log("Called app.get")
    console.log("Search string backend: ",q);
    // if (q === '') {
    //   res.send({ responses: null });
    // }
    const a_matches = await Assignments.find({
      title: {"$regex": q, "$options": "i"}
    });
    //console.log(a_matches);
    const matches = await parseMatches(a_matches);
    console.log(matches);
    await res.send( {response: matches});
})

app.get('/', (req, res) => {
    res.send(req);
})
app.listen(3001, () => {
  console.log("LISTENING!");
})

app.get('/description', async function(req, res){
  // const {q} = req.query;
  console.log("called app.get for assignment description");
  const d_matches = await Assignments.find({
    title: "Python Scripting"
  });
  console.log(d_matches);
  console.log("outputted matching object");
  res.send( {response: d_matches} );
})