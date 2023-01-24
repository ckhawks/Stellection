const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// https://dev.to/richienabuk/setting-up-express-js-rest-api-postgres-and-sequelize-orm-with-es6-4m08

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


const data = [
    {
        "name": "Kim Doe",
        "age": 23,
        "avatar": "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        "name": "Mary Jane",
        "age": 25,
        "avatar": "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
        "name": "Ken Joe",
        "age": 24,
        "avatar": "https://randomuser.me/api/portraits/women/18.jpg"
    }
];
app.get('/people', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});