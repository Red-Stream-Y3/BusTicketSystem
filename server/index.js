import 'colors';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import findConfig from 'find-config';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

let dbUri;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: findConfig('.env.dev') });
  dbUri = process.env.MONGO_URI_DEV;
} else dbUri = process.env.MONGO_URI;

connectDB(dbUri);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/braintree', paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/braintree', (req, res) => {
  res.sendFile(path.join(__dirname, 'braintree.html'));
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
  });
}

export default app;
