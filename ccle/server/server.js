const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const mongoose = require('mongoose');
const Users = require('../models/users');
const Assignments = require('../models/assignments');
const ClassInformation = require('../models/classinformation');
var mongoDB = 'mongodb+srv://jlam7:Jlam2001@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority';

/////////DATES AND TIMES FOR DEADLINE COMPARISONS///////////
//our current date
//we turn the dates into string to make them easier to compare
//" '0'+... .slice(-2) " accounts for leading 0s.
var currentdate = new Date();
var date = ('0' + currentdate.getDate()).slice(-2);
var month = ('0'+(currentdate.getMonth()+1)).slice(-2);
var year = currentdate.getFullYear();
var hour = ('0' + currentdate.getHours()).slice(-2);
var minutes = ('0' + currentdate.getMinutes()).slice(-2);
var seconds = ('0' + currentdate.getSeconds()).slice(-2);
var date_string=year+"-"+month+"-"+date+"T"+hour+":"+minutes+":"+seconds+".000+00:00";
console.log("The current time is: "+ date_string)

//function to compare deadlines
function compareDate(deadline) {
  var dldate = ('0' + deadline.getDate()).slice(-2);
  var dlmonth = ('0'+(deadline.getMonth()+1)).slice(-2);
  var dlyear = deadline.getFullYear();
  var dlhour = ('0' + deadline.getHours()).slice(-2);
  var dlminutes = ('0' + deadline.getMinutes()).slice(-2);
  var dlseconds = ('0' + deadline.getSeconds()).slice(-2);
  var dl_date_string=dlyear+"-"+dlmonth+"-"+dldate+"T"+dlhour+":"+dlminutes+":"+dlseconds+".000+00:00";
  console.log("Comparing deadline time is: "+ dl_date_string)

  //we use localeCompare for string comparison of the dates
  if (dl_date_string.localeCompare(date_string) == 1)
    return false;
  return true;
}
/////////DATES AND TIMES FOR DEADLINE COMPARISONS///////////


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection to database established.")
    })
    .catch(err => {
        console.log("Error connecting to database.")
        console.log(err)
    })




function parseMatches(a_matches, sort) {
  console.log("PARSEMATCHES received: ", sort);
  var matches =[]
  var ids = []
  if(sort === "Sort by:") {
    for (let i of a_matches) {
      matches.push(i.title);
      ids.push(i._id);
    }
  }
  else if (sort === "Grade Weightage") {
    a_matches.sort(function(a,b) {
      if (a.grade > b.grade) {
        return -1;
      }
      else if (a.grade < b.grade) {
        return 1;
      }
      else {
        return 0;
      }
    });
    for(let i of a_matches) {
      matches.push(i.title);
    }
  }
  return matches;
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
  if(a_matches) {
    bcrypt.compare(password, a_matches.hash)
    .then((result) => res.send({response: result}))
    .catch((failure) => res.send({response: failure}));
  }
  else
    res.send({response: false});
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
    const sort = req.query.sort;
    console.log("/SEARCH sort value: ", sort);
    console.log("Search string backend: ",q);
    const a_matches = await Assignments.find({
      title: {"$regex": q, "$options": "i"}
    });
    //console.log(a_matches);
    const matches = parseMatches(a_matches, sort);
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
  const {q} = req.query;
  console.log("called app.get for assignment description : " + q);
  const d_matches = await Assignments.find({
    title: q
  });
  console.log(d_matches);
  console.log("outputted description object");
  res.send( {response: d_matches} );
})

app.get('/summary', async function(req, res){
  console.log("called app.get for assignment summary");
  const d_matches = await Assignments.find({});
  const matches = parseMatchesSummary(d_matches);
  console.log("outputted summary object");
  res.send( {response: matches} );
})

//This creates arrays of upcoming asssignments
function parseMatchesSummary(a_matches) {
  var classes = []
  var titles = []
  var dueDates = []
  var summaries = []
  for (let i of a_matches) {
    if (compareDate(i.deadline))
      continue;
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

// used for accessing database for the calendar discussion / lectures / OHs
app.get('/calendar', async function(req, res){
  console.log("called app.get for assignment calendar");
  const d_matches = await ClassInformation.find({});
  console.log("a");
  console.log(Object.getOwnPropertyNames(d_matches));
  console.log("b");
  const matches = parseMatchesCalendar(d_matches);
  console.log("outputted calendar object");
  res.send( {response: matches} );
})

//This creates array of upcoming discussions, lectures, OHs
function parseMatchesCalendar(a_matches) {
  var classes = []
  var discussions = []
  var lectures = []
  var officeHours = []
  for (let i of a_matches) {
    console.log(i);
    classes.push(i.class_name);
    discussions.push(i.discussion);
    lectures.push(i.lecture_date);
    officeHours.push(i.office_hours);
  }
  // console.log(1);
  // console.log(discussions);
  // console.log(lectures);
  // console.log(officeHours);
  return [
    classes,
    discussions,
    lectures,
    officeHours
  ];
}

//get asssignments for the calendar
app.get('/cal', async function(req, res){
  const d_matches = await Assignments.find({});
  const matches = parseMatchesAssign(d_matches);
  res.send( {response: matches} );
})

//This creates arrays of upcoming asssignments
function parseMatchesAssign(a_matches) {
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
