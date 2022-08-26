const { Router } = require('express');
const readTalkersFile = require('../utils/readAndWriteFiles');

const routesTalker = Router();

routesTalker.get('/talker', async (req, res) => {
    const talkers = await readTalkersFile();
    return res.status(200).json(talkers);
});

module.exports = routesTalker;