// Instanciamos las dependencias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes'
import config from './config';

//Conexion a la base de datos
mongoose.Promise = global.Promise;
const dbUrl = config.db;
mongoose.connect(dbUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(mongoose => console.log('DB Conected'))
.catch(err => console.log(err));

// Indicamos que nuestra app es una aplicacion express
const app = express();

// Morgan sirve para ver por consola las peticiones al servidor (GET, POST, etc)
app.use(morgan('dev'));

// Habilitar nuestra app para recibir peticiones json
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Redireccionar a nuestra carpeta 'public' al iniciar la app
app.use(express.static(path.join(__dirname, 'public')))

// asignar router a la url '/api'
app.use('/api', router);

// El servidor asigna un puerto automaticamente, de lo contrario se asigna el puerto 3000
app.set('port', config.port);

// Ejecutar app en el puerto establecido
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});