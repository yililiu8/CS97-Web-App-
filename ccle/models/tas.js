const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/CS97test', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!!")
//         console.log(err)
//     })
const taSchema = new mongoose.Schema({
    name: String,
    oh: [String],
    disc: String,
    email: String,
    zoom_link: {
        disc_link: String,
        oh_link: String
    }
});

//const Tas_model = mongoose.model('tas', taSchema);
module.exports = mongoose.model('tas', taSchema);
// const akshay = new Tas_model({
//     name: "Akshay Singhal", 
//     oh: ["M 9:30 - 11:30 AM"], 
//     disc: "F 12:00 - 1:50 PM",
//     email: "akshaysinghal@cs.ucla.edu", 
//     zoom_link: {
//         disc_link: "https://ucla.zoom.us/j/93402820049",
//         oh_link: "https://ucla.zoom.us/j/98904504885"
//     }
// })

// const howard = new Tas_model({
//     name: "Howard Xie", 
//     oh: ["T 1:00 - 2:00 PM", "R 2:00 - 3:00 PM"], 
//     disc: "F 10:00 - 11:50 AM",
//     email: "howardx@cs.ucla.edu", 
//     zoom_link: {
//         disc_link: "https://ucla.zoom.us/j/93797947839",
//         oh_link: "https://ucla.zoom.us/j/6668456666"
//     }
// })

// akshay.save(() => {
//     console.log('New TA: ' + akshay.name);
//     //authors.push(author)
//     //cb(null, author)
// })
// howard.save(() => {
//     console.log('New TA: ' + howard.name);
// })