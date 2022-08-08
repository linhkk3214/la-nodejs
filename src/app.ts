import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { registerRootRoute } from './base/route-util';
import MainJob from './schedule/main';

export default async function init() {
    const app = express();
    const port = 3000;
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/', (req, res) => {
        res.json('Server live');
    });

    const options = {
        autoIndex: true,
        useNewUrlParser: true, useUnifiedTopology: true,
    };
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/quanlynguoihoc', options,
    ).then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.log('Error connecting to database');
    });

    // region Register route
    await registerRootRoute(app);

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });

    const job = new MainJob();
    job.run();
}
