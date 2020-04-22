// Módulos y archivos requeridos
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require("path");
require('dotenv').config();
require('./database');

// Instanciación de la app
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(fileUpload());
// Ruta pública para acceder a las imágenes
app.use("/public", express.static("./public"));

// Configuracion de rutas
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);
const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);
const postRouter = require('./routes/postRouter');
app.use('/post', postRouter);

// Arranque del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor arrancado en el puerto', app.get('port'))
});

exports.app = app;
