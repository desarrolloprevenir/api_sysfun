const planfun = require('../models/planes_fun');
// const users = require('../models/user');
// const provers = require('../models/provedores');


module.exports = function (app) {

//ejecuta el login de los ususarios y provedores
app.post('/planf',(req, res) => {
var plan = req.body;
console.log(plan);
//console.log(login);
planfun.agregar(plan,(err, data) => {

res.json(data);
});
});


}
