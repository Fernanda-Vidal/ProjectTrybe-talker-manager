const { Router } = require('express');
const readTalkersFile = require('../utils/readAndWriteFiles');

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

module.exports = routesTalker;