const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const routes = require('./routes/index.js');

const app = express();

// const allowedCors = [
//   'https://api.front.maxmatyugin.nomoredomains.club',
//   'https://front.maxmatyugin.nomoredomains.club',
//   'http://front.maxmatyugin.nomoredomains.club',
//   'http://localhost:3001',
//   'http://localhost:3000',
// ];

// const corsOptions = {
//   origin: allowedCors,
//   optionsSuccessStatus: 204,
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// };

// app.use('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(routes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
