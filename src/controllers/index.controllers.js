const controller = {}
controller.index = (req,res)=>{
    res.render('index')
}
controller.compra = (req,res)=>{
    res.render('compra')
}

const clientModel = require('../model/client')

controller.createUser = async (req, res, next) => {
    try {
      console.log((req.body))
      const newClient = new clientModel(req.body);
      await newClient.save();
      res.redirect('/compra')
    } catch (error) {
      return res.render("error", { errorMessage: error.message });
    }
  };
  
  // mongodb+srv:Enzo:UDRDRiI6l0NMmj0G@arthur-workshop.bwnuexp.mongodb.net/dbapi?retryWrites=true&w=majority

module.exports = controller