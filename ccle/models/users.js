const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//mongoose.set('bufferCommands', false);
// var mongoDB = 'mongodb+srv://PrathyushS:Prati1991@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority';
// //connect(mongoDB);
// //mongoose.set('bufferCommands', false);
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
const userSchema = new mongoose.Schema({
    email: String,
    hash: String,
})

//const Users = mongoose.model('users', userSchema);
module.exports = mongoose.model('users', userSchema);
// const Prathyush = new Users({
//     email: "prathyush1999@ucla.edu",
//     hash: Prathyush_hash
// })

// const hashPassword = async (pw, email) => {
//     const hash = await bcrypt.hash(pw, 12);
//     console.log(`${email} hash: ${hash}`);
//     const User = new Users({
//         email: email,
//         hash: hash
//     })
//     User.save(() => console.log(`Saved user: ${User.email})`));
//     //return hash;
// }

// hashPassword('Psivakumar123', 'prathyush1999@ucla.edu');
// hashPassword('Jlam123', 'jlam7@g.ucla.edu');
// hashPassword('Evainberg123', 'emily.vainberg@gmail.com');
// hashPassword('Fcho123', 'fracho123@g.ucla.edu');
// hashPassword('Yliu123', 'yililiu@g.ucla.edu');

//Users.find()

//mongoose.connection.close();
