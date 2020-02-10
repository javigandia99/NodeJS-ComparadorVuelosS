import express from 'express'
import mongoose from 'mongoose'
import auth from '../middlewares'
const host = 'mongodb://127.0.0.1:27017/comparadorvuelos'

mongoose.set('debug', true)
mongoose.Promise = global.Promise

const connection = mongoose.createConnection(
  host,
  { poolSize: 200 }
)

connection.on('error', err => {
  console.log(' ⚑ Mongo Error'.bold.red, err)
  return process.exit()
})

connection.on('connected', () => {
  console.log(' ▣ Connected to Database')
})

const flySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    idVuelo: {
      type: String,
      trim: true, required: true
    },
    origen: {
      type: String,
      trim: true, required: true
    },
    destino: {
      type: String,
      trim: true, required: true
    },
    fecha: {
      type: Date,
      trim: true, required: true
    },
    hora: {
      type: String,
      trim: true, required: true
    },
    precio: {
      type: Number,
      trim: true, required: true
    },
    disponibles: {
      type: Number,
      trim: true, required: true
    },
    totales: {
      type: Number,
      trim: true, required: true
    },
    images: {
      type: String,
      trim: true, required: true
    }
  },
  {
    strict: false
  }
)

const iberia = connection.model('vuelos', flySchema)
const router = express.Router()

//Get all
router.get('/vuelos/fecha/origen/', (req, res, next) => {
  iberia.find({}, (err, vuelos) =>
    res.send(vuelos));
})

//Get by origen & destino
router.get('/vuelos/fecha/:origen/:destino', (req, res, next) => {
  const destino = req.params.destino;
  const origen = req.params.origen;
  iberia.find({ origen: origen, destino: destino }, (err, vuelos) => {
    res.send(vuelos);
  });
})

//Put by idVeulo
router.put('/vuelos/:idVuelo', auth, (req, res, next) => {
  iberia.updateOne(
    { idVuelo: req.params.idVuelo },
    { $inc: { disponibles: -1 } }, (err, vuelos) => {
      res.send(vuelos);
    });
})
/*
//Put temporal
router.put('/vuelos/:id', (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  iberia.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(vuelo => {
      if (!vuelo) {
        res.status(404).send({
          message: `Cannot update with  this id: ${id}!`
        });
      } else res.send({ message: "The flight booking was accepted successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating iberia vuelos with id=" + id
      });
    });
})
*/
export default router
