const watchedAtValidation = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    // const isDate = /\S+@\S+\.\S+/;
    const isDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

    if (!isDate.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
};

module.exports = watchedAtValidation;