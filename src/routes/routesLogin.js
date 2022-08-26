const { Router } = require('express');
const loginValidation = require('../middlewares/loginValidation');
const generateToken = require('../utils/generateToken');

const routesLogin = Router();

routesLogin.post('/login', loginValidation, async (req, res) => {
    res.status(200).json({ token: generateToken() });
});

module.exports = routesLogin;