const winston = require('winston');
 
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'info',format: winston.format.combine(
      winston.format.timestamp(),winston.format.prettyPrint()
    )}),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
const logger_log = (route,error)=>{
  logger.log('info',{route:route,error:error});
}
module.exports = {logger,logger_log};