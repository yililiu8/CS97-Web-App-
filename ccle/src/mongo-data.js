// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// const {MongoClient} = require('mongodb');
// const assert = require('assert');

// async function main(){
//     //uri will need to be changed with your own authetnication information unless I figure out how to make access more universal
//     const uri = "mongodb+srv://FranklinChoi:kePsBlWMtg2T7Am5@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority";
//     const dbName = 'total_class_information'
//     const collectionName = "classinformation"

//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
//     client.connect(err => { 
//         if (err) throw err;

//         const db = client.db("total_class_information");
    
//         db.collection('classinformation').find({}).toArray().then((docs) => {
//             console.log(docs[0]);
            
//         }).catch((err) => {
    
//             console.log(err);
//         }).finally(() => {
    
//             client.close();
//         });
//     });
// }

// main().catch(console.error);

// const mongoose = require('mongoose');
// var mongoDB = 'mongodb+srv://PrathyushS:Prati1991@cluster0.ldqdm.mongodb.net/total_class_information?retryWrites=true&w=majority';
// //connect(mongoDB);
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((data) => {
//         console.log("Connection to database established.")
//     })
//     .catch(err => {
//         console.log("Error connecting to database.")
//         console.log(err)
//     })
//     const classInfo = new mongoose.Schema({ class_name: String, professor: String}, 
//         { collection : 'classinformation' });   // collection name
//     console.log(classInfo.class_name);
// var connection = mongoose.connection;

// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function () {

//     connection.db.collection("classinformation", function(err, collection){
//         collection.find({}).toArray(function(err, data){
//             console.log(data); // it will print your collection data
//         })
//     });

// });


//const dataSchema = new Schema({}, { collection: 'data' });
// find('classinformation', {class_name : "CS97"}, function (err, docs) {
//     console.dir(docs);
// });

