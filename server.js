const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const { mongodb } = require('./keys');
const authRouter = require('./src/routes/auth');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);

app.listen(app.get('port'), () => {
    console.log('Servidor arrancado en el puerto', app.get('port'))
});

mongoose.connect(mongodb.URI, mongodb.CONF)
    .then(res => console.log('Base de datos conectada correctamente'))
    .catch(err => console.error(err));
