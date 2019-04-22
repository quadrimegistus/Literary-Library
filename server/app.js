/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');
const credentials = require('./config/credentials');

const user = credentials.username;
const pass = credentials.password;
const lib = credentials.library;
const db = mongoose.connection;
const hostedDB = `mongodb+srv://${user}:${pass}@${lib}-pnpys.mongodb.net/test?retryWrites=true`;
const options = { useNewUrlParser: true };
const PORT = 4000;
const app = express();

// Allow Cross-Origin Requests:
app.use(cors());

mongoose.connect(hostedDB, options, (error) => {
    if (error) {
      console.log(error);
    }
});

db.on('error', console.error.bind(console, 'Connection Error:\n'));

db.once('open', () => {
    console.log(`Connected to the MongoDB: ${lib}`);
});

// Bind Express with GraphQL:
app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    }));

app.listen(PORT, () => {
    console.log(`Now listening for requests on Port: ${PORT}.`);
});
