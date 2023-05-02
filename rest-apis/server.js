const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const packageJson = require('./package.json');

const config = require('./config.js');

const PORT = config.port || 8081;
const server = express();
server.use(bodyParser.json());

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const { postgresqlGetAllUsers, postgresqlGetUsersById, postgresqlCreateNewUser, postgresqlUpdateExistingUser, postgresqlDeleteExistingUser } = require('./postgresqlDataService');
const { jsonGetAllUsers, jsonGetUsersById, jsonCreateNewUser, jsonUpdateExistingUser, jsonDeleteExistingUser } = require('./jsonDataService');

let counter = 0;
let dataSource = config.dataSource;
let payload = "";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/****** USERS ******/
// GET: Get all users
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/users
server.get('/rest-api/users', async (req, res) => {
    var users;
    switch (dataSource) {
        case "postgresql":
            users = await postgresqlGetAllUsers();
            break;
        case "json":
            users = await jsonGetAllUsers();
            break;
    }
    res.json(users);
    console.log("get /rest-api/users [GetAllUsers] was called " + ++counter + " times\npayload:" + users);
});

// GET: Get an individual user by ID
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/users/1
server.get('/rest-api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    var user;
    switch (dataSource) {
        case "postgresql":
            user = await postgresqlGetUsersById(id);
            break;
        case "json":
            user = await jsonGetUsersById(id);
            break;
    }
    res.json(user);
    console.log("get /rest-api/users/ [GetUsersById]" + id + " was called " + ++counter + " times\npayload:" + user);
});

// POST: Create new user
// curl example:
// curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"neuerBenutzer\", \"email\": \"neuerbenutzer@example.com\", \"password\": \"meinPasswort\"}" http://localhost:8081/rest-api/users
server.post('/rest-api/users', async (req, res) => {
    const { username, email, password } = req.body;
    var user;
    switch (dataSource) {
        case "postgresql":
            user = await postgresqlCreateNewUser(username, email, password);
            break;
        case "json":
            user = await jsonCreateNewUser(username, email, password);
            break;
    }
    res.json(user);
    console.log("post /rest-api/users [CreateNewUser]" + username + " " + email + " was called " + ++counter);
});

// PUT: Update existing user
// curl example:
// curl -X PUT -H "Content-Type: application/json" -d "{\"username\": \"neuerBenutzername\", \"email\": \"neueEmail@example.com\", \"password\": \"neuesPasswort\"}" http://localhost:8081/rest-api/users/1
server.put('/rest-api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { username, email, password } = req.body;
    var user;
    switch (dataSource) {
        case "postgresql":
            user = await postgresqlUpdateExistingUser(id, username, email, password);
            break;
        case "json":
            user = await jsonUpdateExistingUser(id, username, email, password);
            break;
    }
    res.json(user);
    console.log("put /rest-api/users [UpdateExistingUser]" + id + " " + username + " " + email + " was called " + ++counter + " times\npayload:" + user);
});

// DELETE: Delete existing user
// curl example (Note foreign key: user_group_mappings_user_id_fkey (index)):
// curl -X DELETE http://localhost:8081/rest-api/users/1 
server.delete('/rest-api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingUser(id);
            break;
        case "json":
            await jsonDeleteExistingUser(id);
            break;
    }
    res.json({ message: `User ${id} has been deleted` });
});
/****** USERS ******/

switch (dataSource) {
    case "postgresql":
        server.listen(PORT, () => console.log(`${packageJson.name} version ${packageJson.version} listening on port ${PORT} with postgresql data source`));
        break;
    case "json":
        server.listen(PORT, () => console.log(`${packageJson.name} version ${packageJson.version} listening on port ${PORT} with json data source`));
        break;
}

