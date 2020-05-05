let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let provmodel = {};

provmodel.registraProvedor = (provedor,callback) => {
  if(connection)
  {
    console.log(provedor);
    let sql = 'INSERT INTO provedores (nit, codigo, nombre, direccion, telefono, celular) VALUES (?, ?, ?, ?, ?, ?);';
    connection.query(sql,[provedor.nit,provedor.codigo,provedor.nombre,provedor.direccion,provedor.telefono,provedor.celular],(err,resp)=>{
      if(err){throw err}
      else {
        console.log(resp);
        callback(null,true);
      }
    })
  }
};
