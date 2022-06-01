import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import userRoutes from './routes/user';
import loaiNguoiDungRoutes from './routes/dm-loainguoidung';
import chucVuRoutes from './routes/dm-chucvu';
import fileRoutes from './routes/file';
import gioiTinhRoutes from './routes/dm-gioitinh';
import cors from 'cors';
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});
app.use('/', userRoutes);
app.use('/', loaiNguoiDungRoutes);
app.use('/', chucVuRoutes);
app.use('/', fileRoutes);
app.use('/', gioiTinhRoutes);
app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});

mongoose.connect('mongodb://localhost:27017/helloword', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
  });
