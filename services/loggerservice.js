const pino = require('pino');

// const levels = {
//     http: 10,
//     debug: 20,
//     warn: 40,
//     error: 50,
//     fatal: 60,
   
// };

module.exports = pino({
    transport: {
        target: "pino-pretty",        
        options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:yyyy-dd-mm, h:MM:ss TT',
        }
    },
});