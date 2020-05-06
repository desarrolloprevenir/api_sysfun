const jwts = require('../models/jwts');
// const users = require('../models/user');
// const provers = require('../models/provedores');


module.exports = function (app) {

//ejecuta el login de los ususarios y provedores
app.post('/login',(req, res) => {
var login = req.body;
console.log(login);
//console.log(login);
jwts.login1(login,(err, data) => {
//res.json(data);
//console.log(data);
//
res.json(data);
});
});


}
