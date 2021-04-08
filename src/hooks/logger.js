const winston = require('winston');
 
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'info',format: winston.format.combine(
      winston.format.timestamp(),winston.format.prettyPrint()
    )}),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
module.exports = logger;