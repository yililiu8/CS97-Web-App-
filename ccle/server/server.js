const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Assignments = require('../models/assignments')
var mongoDB = 'mongodb+srv://jlam7:Jlam2001@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority';
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

app.get('/search/sort', async function(req, res) {
  const {q} = req.query;
  console.log("Called /search/sort get")
  const a_matches = await Assignments.find({
    title: {"$regex": q, "$options": "i"}
  });
  const matches = parseMatches(a_matches);
  
})

app.get('/search', async function(req, res){
    const {q} = req.query;
    console.log("Called app.get")
    // if (q === '') {
    //   res.send({ responses: null });
    // }
    const a_matches = await Assignments.find({
      title: {"$regex": q, "$options": "i"}
    });
    //console.log(a_matches);
    const matches = parseMatches(a_matches);
    console.log(matches);
    res.send( {response: matches});
})

app.get('/', (req, res) => {
    res.send(req);
})
app.listen(3000, () => {
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

app.get('/summary', async function(req, res){
  console.log("called app.get for assignment summary");
  const d_matches = await Assignments.find({});
  const matches = parseMatchesSummary(d_matches);
  console.log("outputted matching object");
  res.send( {response: matches} );
})

function parseMatchesSummary(a_matches) {
  var classes = []
  var titles = []
  var dueDates = []
  var summaries = []
  for (let i of a_matches) {
    classes.push(i.class);
    titles.push(i.title);
    dueDates.push(i.deadline);
    summaries.push(i.description);
  }
  return [
    classes,
    titles,
    dueDates,
    summaries
  ];
}
