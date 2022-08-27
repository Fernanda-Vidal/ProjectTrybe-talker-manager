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

const changeTalkerFile = async (change, id) => {
    try {
        const fileTalkers = await readTalkersFile();
        let changeTalker = '';
        for (let i = 0; i < fileTalkers.length; i += 1) {
            if (fileTalkers[i].id === Number(id)) {
                fileTalkers[i].name = change.name;
                fileTalkers[i].age = change.age;
                fileTalkers[i].talk.watchedAt = change.talk.watchedAt;
                fileTalkers[i].talk.rate = change.talk.rate;
                changeTalker = fileTalkers[i];
            }
        }
        console.log(fileTalkers, 'alterado', change.age);
        await fs.writeFile(file, JSON.stringify(fileTalkers));
        return changeTalker;
    } catch (error) {
        return null;
    }
};

const deleteTalkerFile = async (id) => {
    try {
        const fileTalkers = await readTalkersFile();
        const removeTalker = fileTalkers.filter((talker) => Number(talker.id) !== Number(id));
        // console.log(removeTalker);
        await fs.writeFile(file, JSON.stringify(removeTalker));
        return removeTalker;
    } catch (error) {
        return null;
    }
};

module.exports = {
    readTalkersFile,
    addTalker,
    changeTalkerFile,
    deleteTalkerFile,
};