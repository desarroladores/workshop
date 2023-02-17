const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const app = express();
const controller = require('../controllers/index.controllers')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.post('/form/data',controller.createUser)

router.get('/',controller.index)
router.get('/compra',controller.compra)



module.exports = router