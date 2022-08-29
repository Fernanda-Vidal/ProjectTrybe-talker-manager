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

routesTalker.get('/talker', async (_req, res) => {
    const talkers = await readTalkersFile();
    return res.status(200).json(talkers);
});

routesTalker.get('/talker/search/', tokenValidation, async (req, res) => {
    const { q } = req.query;
    const file = await readTalkersFile();
    let searchTalkers;
    if (q) {
        searchTalkers = file.filter(({ name }) => name.includes(q));
        return res.status(200).json(searchTalkers);
    }
    if (!q || q === '') {
        return res.status(200).json(file);
    }
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
    const change = req.body;
    const { id } = req.params;
    const result = await changeTalkerFile(change, Number(id));
    return res.status(200).json(result);
});

routesTalker.delete('/talker/:id', tokenValidation, async (req, res) => {
    const { id } = req.params;
    await deleteTalkerFile(id);

    return res.status(204).json();
});

module.exports = routesTalker;