
const functions = require('firebase-functions');

// Cloud functions are server-side functions that can be triggered by various events, such as an HTTP request, a database update, or a file upload
// require is a function for importing express module 
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Mx29RSCJzcvegipRjcTt8YsO2KDcXrWWJoizxZ3i9MpuKvcdX62wbVjYc3SjYJ7ggk3HDtAIPFftQr0MLsM6MAu00yCwbmqkW')

// API 

// App config (set the express server)
const app = express();

// middlewares
// cors - Cross-origin resource sharing (CORS) is a browser security feature that restricts cross-origin HTTP requests that are initiated from scripts running in the browser

app.use(cors({ origin: true}));
app.use(express.json()); // this will allow us to send data in json format


// api routes 
// get request to get data 
app.get('/',(request, response) => response.status(200).send('hello world'))

// post request 
app.post('/payments/create', async (request,response) => {
    // total stores amount in subunits eg. like cents
    const total = request.query.total;

    console.log('payment request recived boom!! for this amount ',total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    })
    console.log(`Payment intent: ${paymentIntent.id}`);
    
    // resposnse is send  like ok - created 
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,

    })
})

// listen command 
exports.api = functions.https.onRequest(app)


// example endpoint 
// api endpoint url - http://127.0.0.1:5001/clone-606ca/us-central1/api