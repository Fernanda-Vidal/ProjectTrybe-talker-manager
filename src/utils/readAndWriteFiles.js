const fs = require('fs/promises');

const file = 'src/talker.json';

const readTalkersFile = async () => {
    try {
        const arrayTalkers = await fs.readFile(file, 'utf-8');
        return JSON.parse(arrayTalkers);
    } catch (error) {
        return [];
    }
};

const addTalker = async (talker) => {
    try {
        const fileTalkers = await readTalkersFile();
        
        fileTalkers.push(JSON.parse(talker));
        console.log(fileTalkers.length);
        const talkerAdded = await fs.writeFile(file, JSON.stringify(fileTalkers));
        console.log(talker);
        return talkerAdded;
    } catch (error) {
        return null;
    }
};

module.exports = {
    readTalkersFile,
    addTalker,
};