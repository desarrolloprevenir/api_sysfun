const planfun = require('../models/planes_fun');
const cont = require('../models/contratos');

// const users = require('../models/user');
// const provers = require('../models/provedores');


module.exports = function (app) {

app.post('/contratos',(req,res)=>{
  let afiliado = req.body;
  console.log(afiliado);
  cont.agregarContrato(afiliado,(err,resp)=>{
    res.json(resp);
  });
});

app.post('/benef',(req,res)=>{
  let ben = req.body;
  console.log(ben);
  cont.pruebam(ben ,(err,resp)=>{
    res.json(resp);
  })
});


}
