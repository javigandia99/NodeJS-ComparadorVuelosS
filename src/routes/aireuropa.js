import express from 'express'
import Sequelize from 'sequelize'
import auth from '../middlewares'
const sequelize = new Sequelize('aireuropa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const Vuelos = sequelize.define(
  'vuelos',
  {
    idVuelo: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      field: 'idVuelo',
      primaryKey: true
    },
    origen: {
      type: Sequelize.STRING,
      field: 'origen'
    },
    destino: {
      type: Sequelize.STRING,
      field: 'destino'
    },
    fecha: {
      type: Sequelize.DATE,
      field: 'fecha'
    },
    hora: {
      type: Sequelize.TIME,
      field: 'hora'
    },
    precio: {
      type: Sequelize.INTEGER,
      field: 'precio'
    },
    disponibles: {
      type: Sequelize.INTEGER,
      field: 'disponibles'
    },
    totales: {
      type: Sequelize.INTEGER,
      field: 'totales'
    },
    image: {
      type: Sequelize.STRING,
      field: 'image'
    },
    compania: {
      type: Sequelize.STRING,
      field: 'compania'
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

const router = express.Router()
//Get all
router.get('/vuelos/fecha/origen/', (req, res, next) => {
  Vuelos.findAll().then((Vuelos) => {
    res.send(Vuelos);
  }).error(function (err) {
    console.log("Error:" + err);
  });
})

//Get by origen & destino
router.get('/vuelos/fecha/:origen/:destino', (req, res, next) => {
  const destino = req.params.destino;
  const origen = req.params.origen;
  Vuelos.findAll({
    where: { Destino: destino, Origen: origen }
  }).then((Vuelos) => {
    res.send(Vuelos);
  }).error(function (err) {
    console.log("Error:" + err);
  });
})

//Get by origen
router.get('/vuelos/fecha/:origen', (req, res, next) => {
  const origen = req.params.origen;
  Vuelos.findAll({
    where: { origen: origen }
  }).then((Vuelos) => {
    res.send(Vuelos);
  }).error(function (err) {
    console.log("Error:" + err);
  });
})

//Get by destino
router.get('/vuelos/fecha/origen/:destino', (req, res, next) => {
  const destino = req.params.destino;
  Vuelos.findAll({
    where: { destino: destino }
  }).then((Vuelos) => {
    res.send(Vuelos);
  }).error(function (err) {
    console.log("Error:" + err);
  });
})

//Put & -1 disponible
router.put('/vuelos/:idVuelo', auth,(req, res, next) => {
  Vuelos.update(
    { disponibles: sequelize.literal('disponibles - 1') },
    { where: { idVuelo: req.params.idVuelo } }
  ).then((Vuelos) => {
    res.send(Vuelos);
  }).error(function (err) {
    console.log("Error:" + err);
  });
})
export default router
