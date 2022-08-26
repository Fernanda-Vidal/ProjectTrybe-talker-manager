const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    
    for (let i = 0; i < 16; i += 1) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};

module.exports = generateToken;

// crédito: https://www.delftstack.com/pt/howto/javascript/javascript-random-string/