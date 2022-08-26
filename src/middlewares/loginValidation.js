const loginValidation = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Please provide a valid e-mail' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    next();
};

module.exports = loginValidation;