const mongoose = require('mongoose');
// var mongoDB = 'mongodb+srv://PrathyushS:Prati1991@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority';
// //connect(mongoDB);
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((data) => {
//         console.log("CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!!")
//         console.log(err)
//     })
// mongoose.connect('mongodb://localhost:27017/CS97test', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!!")
//         console.log(err)
//     })
const assignSchema = new mongoose.Schema({
    title: String,
    class: String,
    grade: Number,
    description: String,
    information: String,
    deadline: Date
})

//const Assignments = mongoose.model('assignments',assignSchema);
module.exports = mongoose.model('assignments',assignSchema);
// Assignments.find({
//     grade: 4
// })
// .then(data => console.log(data[0].title))

// const assign1 = new Assignments({
//     title: "Emacs Editing and Shell Scripting",
//     grade: 3.5,
//     deadline: new Date('December 20, 2020 23:55:00 -08:00')
// })

// const assign2 = new Assignments({
//     title: "Python Scripting",
//     grade: 3.5,
//     deadline: new Date('December 21, 2020 23:55:00 -08:00')
// })

// const assign3 = new Assignments({
//     title: "Chorus Lapilli",
//     grade: 5,
//     deadline: new Date('December 25, 2020 23:55:00 -08:00')
// })

// const assign4 = new Assignments({
//     title: "Git Organization",
//     grade: 4,
//     deadline: new Date('December 26, 2020 23:55:00 -08:00')
// })

// const assign5 = new Assignments({
//     title: "Low Level Programming in C",
//     grade: 4,
//     deadline: new Date('December 28, 2020 23:55:00 -08:00')
// })

// assign1.save(() => {
//     console.log(`Saved ${assign1.title}`);
// })

// assign2.save(() => {
//     console.log(`Saved ${assign2.title}`);
// })

// assign3.save(() => {
//     console.log(`Saved ${assign3.title}`);
// })

// assign4.save(() => {
//     console.log(`Saved ${assign4.title}`);
// })

// assign5.save(() => {
//     console.log(`Saved ${assign5.title}`);
// })