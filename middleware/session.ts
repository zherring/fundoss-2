import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import dbConnect from '../lib/dbConnect';

const MongoStore = connectMongo(session);

export default async function sessionMiddleware(req, res, next) {
  await dbConnect();
  const mongoStore = new MongoStore({
    mongooseConnection: mongoose.connection,
  });
  const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoStore,
    cookie: { secure: false },
  };
  if (process.env.HOSTING_URL.indexOf('https') === 0) {
    sessionConfig.cookie.secure = true;
  }
  console.log('sessionConfig.cookie.secure', sessionConfig.cookie.secure);
  return session(sessionConfig)(req, res, next);
}
