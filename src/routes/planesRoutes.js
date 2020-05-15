const planfun = require('../models/planes_fun');
const cont = require('../models/contratos');
const jwt = require('../models/jwts');


// const users = require('../models/user');
// const provers = require('../models/provedores');


module.exports = function (app) {

//ejecuta el login de los ususarios y provedores
app.post('/planf',jwt.validaContratos,(req, res) => {
var plan = req.body;
console.log(plan);
//console.log(login);
planfun.agregar(plan,(err, data) => {

res.json(data);
});
});

app.get('/planf/:id',jwt.validaContratos,(req,resp)=>{
  console.log('DENTRO DEL PLAN F GET');
  let id = req.params.id;
  console.log(req.params);
  planfun.darplan(id,(err,res)=>{
    resp.json(res);
  });
});

app.delete('/planf/:id_plan',jwt.validaContratos,(req,resp)=>{
  let id = req.params.id_plan;
  planfun.deletePlan(id,(err,res)=>{
    resp.json(res);
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
