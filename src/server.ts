/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './App';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;
async function Connect() {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log('Database connection established');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
Connect();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
