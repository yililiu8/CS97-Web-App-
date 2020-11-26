const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    //const { q } = req.query();
    //res.send( {response: `You searched for ${q}`} )
    //console.log(req);
    const {q} = req.query;
    res.send( {response: `You searched for ${q}`})
})

app.get('/', (req, res) => {
    //const {q} = req.query();
    res.send(req);
})

// app.use((req, res) => {
//   res.send('<h1>IS THIS WORKING?<h1>');
// })

app.listen(3001, () => {
  console.log("LISTENING!");
})