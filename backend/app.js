require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const { login, createUser } = require('./controllers/users');
const { createError } = require('./errors/createError');
const { validation } = require('./utils/urlValidate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cors({
  origin: 'https://mesto.app.nomoredomains.sbs'
}));

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).custom(validation),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use(auth, cors(), () => {
  throw new NotFoundError('Неверный адрес');
});

app.use(errorLogger);
app.use(errors());
app.use(createError);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT);
}

main();
