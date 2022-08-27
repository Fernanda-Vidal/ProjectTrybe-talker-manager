const rateValidation = (req, res, next) => {
    const { rate } = req.body.talk;

    if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
            return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        }       
    next();
};

module.exports = rateValidation;