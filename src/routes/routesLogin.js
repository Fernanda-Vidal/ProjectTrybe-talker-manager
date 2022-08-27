const { Router } = require('express');
const loginValidation = require('../middlewares/loginValidation');
const generateToken = require('../utils/generateToken');

const routesLogin = Router();

routesLogin.post('/login', loginValidation, async (req, res) => {
    const token = generateToken();

    return res.status(200).json({ token });
});

module.exports = routesLogin;