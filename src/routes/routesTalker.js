const { Router } = require('express');
const ageValidation = require('../middlewares/ageValidation');
const nameValidation = require('../middlewares/nameValidation');
const rateValidation = require('../middlewares/rateValidation');
const talkValidation = require('../middlewares/talkValidation');
const tokenValidation = require('../middlewares/tokenValidation');
const watchedAtValidation = require('../middlewares/watchedAtValidation');
const { readTalkersFile,
    addTalker,
    changeTalkerFile,
    deleteTalkerFile } = require('../utils/readAndWriteFiles');

const routesTalker = Router();

routesTalker.get('/talker', async (req, res) => {
    const talkers = await readTalkersFile();
    return res.status(200).json(talkers);
});

routesTalker.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readTalkersFile(); 
    const talkerId = talkers.find((talk) => talk.id === Number(id));
    if (!talkerId) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 
    return res.status(200).json(talkerId);
});

routesTalker.post('/talker',
    tokenValidation,
    ageValidation,
    nameValidation,
    talkValidation,
    rateValidation,
    watchedAtValidation, async (req, res) => {
        const { age, name, talk } = req.body;

        const file = await readTalkersFile();
        const id = file.length + 1;

        await addTalker(JSON.stringify({ name, age, id, talk }));

    return res.status(201).json({ name, age, id, talk });
});

routesTalker.put('/talker/:id',
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedAtValidation,
    rateValidation, async (req, res) => {
    // const file = await readTalkersFile();

    const change = req.body;
    const { id } = req.params;
    await changeTalkerFile(change, id);
    return res.status(200).json(change);
});

routesTalker.delete('/talker/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    await deleteTalkerFile(id);

    return res.status(204).json();
});

module.exports = routesTalker;