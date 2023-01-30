const express = require('express');
const router = express.Router();
const app = express()
const fs = require('fs')

// const PATH_ROUTES = __dirname;
// const removeExtension = (fileName) =>{
//     return fileName.split('.').shift()
// }
// fs.readdirSync(PATH_ROUTES).filter((file) => {
//     const name = removeExtension(file)
//     if( name !== 'index'){
//         router.use(`/${name}`,require(`./${file}`))
//     }
// }) 

router.post('/compra', (req, res) => {
    res.send("aa");
    console.log(req.body)
})

module.exports = router
