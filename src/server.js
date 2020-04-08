// Módulos y archivos requeridos
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./database');

// Instanciación de la app
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configuracion de rutas
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);
const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);

// Arranque del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor arrancado en el puerto', app.get('port'))
});
