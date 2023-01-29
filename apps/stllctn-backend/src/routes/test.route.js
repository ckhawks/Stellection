const express = require('express');
// const { GetCompanyCategoriesRoute } = require('av-common');

// const controller = require('../../controllers/companyCategory.controller');

// const { checkAuth0Token } = require('../../middlewares/auth');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
});

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

router.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

router.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

router.delete('/', (req, res) => {
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
router.get('/people', (req, res) => {
    res.json(data);
});

module.exports = router;