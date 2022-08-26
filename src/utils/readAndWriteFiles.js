const fs = require('fs/promises');

const fileName = 'src/talker.json';

const readTalkersFile = async () => {
    try {
        const arrayTalkers = await fs.readFile(fileName, 'utf-8');
        return JSON.parse(arrayTalkers);
    } catch (error) {
        return [];
    }
};

module.exports = readTalkersFile;