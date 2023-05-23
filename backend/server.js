import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

// middleware
app.use(express.json()); //parse raw json data (placed before routing middleware)
app.use(express.urlencoded({ extended: true })); //send form data (placed before routing middleware)
app.use(cookieParser()); //protect routes
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV == 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  // any route that is not 'api/users' load frontend/dist/index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')),
  );
} else {
  //no need to load frontend/dist/index.html
  app.get('/', (req, res) => {
    res.send('Server is ready');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
