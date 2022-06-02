import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import glob from 'glob';
import mongoose from 'mongoose';
import logger from 'morgan';
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});

await glob.sync('./routes/*.js').forEach(async (file) => {
  const routeModule = await import(file);
  app.use('/', routeModule.default);
});

app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});

mongoose.connect('mongodb://127.0.0.1:27017/quanlynguoihoc', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
  });
