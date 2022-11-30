const pino = require('pino')

const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
  };
  
  // create a Pino logger
  const logger = pino({
    level: "http",
    customLevels: levels,
    useOnlyCustomLevels: true,
  });
  
  module.exports =  logger;