const mongoose = require('mongoose');
const cli = require("nodemon/lib/cli");
const url = 'mongodb+srv://Enzo:UDRDRiI6l0NMmj0G@arthur-workshop.bwnuexp.mongodb.net/database-aw?retryWrites=true&w=majority';

mongoose.connect(url)
  .then(()=>console.log("SE HA CONECTADO A MONGODB"))
  .catch(e=>console.error("No se conecto a MONGODB debido a este error:"+e))


const clientSchema = mongoose.Schema({
  nameClient: String,
  products: String,
  telNumber: Number,
  adress: String
}, {timestamps: true,versionKey: false,})

const clientModel = mongoose.model('clients', clientSchema)
module.exports = clientModel