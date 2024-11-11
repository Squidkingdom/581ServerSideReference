//Main file of Express based backend server
import express, {Request, Response} from 'express';
import log4js from 'log4js';
import api from './routes/api';
import bodyParser from 'body-parser';

//Create a logger for the file index.ts
var log = log4js.getLogger('index.ts');

// Configure the logger
log4js.levels.addLevels({
  FINE: { value: 1000, colour: 'blue' },
  CRASH: { value: 5000, colour: 'red' },
});

const config: log4js.Configuration = {
  appenders: {
    fine: { type: 'file', filename: 'logs/fine.log' },
    crash: { type: 'file', filename: 'logs/fatal.log' },
    complete: { type: 'file', filename: 'logs/complete.log' },
    console: { type: 'console' },

    fineFilter: {
      type: 'logLevelFilter',
      appender: 'fine',
      level: 'FINE',
      maxLevel: 'FINE',
    },
    crashFilter: {
      type: 'logLevelFilter',
      appender: 'crash',
      level: 'FATAL',
    },
    completeFilter: {
      type: 'logLevelFilter',
      appender: 'complete',
      level: 'FINE',
    },
    consoleFilter: {
      type: 'logLevelFilter',
      appender: 'console',
      level: 'CRASH',
    },
  },

  categories: {
    default: {
      appenders: ['fineFilter', 'crashFilter', 'completeFilter', 'consoleFilter'],
      level: 'FINE',
    },
    http: {
      appenders: ['completeFilter'],
      level: 'FINE',
    },
  },
};

log4js.configure(config);

//create express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(log4js.connectLogger(log, { level: 'auto' }));
app.use('/api', api);

// for queries to the root URL, send a response of 'Hello World'
app.get('/', (req: Request, res: Response) => {
  log.fatal('Root URL hit');
  res.send('Hello World');
});

app.get('/hello', (req: Request, res: Response) => {
  log.log('FINE', 'Hello URL hit');
  res.send('Hello World');
});

//Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});