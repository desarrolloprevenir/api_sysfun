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
    connection.query(sql,[provedor.nit,provedor.codigo,provedor.nombre,provedor.direccion,provedor.telefono,provedor.celular],(err,rowpr)=>{
      if(err){throw err}
      else {
          console.log(provedor.usuario);
          let usu = provedor.usuario;
        let sqlus = 'INSERT INTO usuarios (id_usuarios, cedula, nombres, apellidos, correo, cargo, contraseña, telefono, provedores_nit, roles_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
        connection.query(sqlus,[usu.usuario,usu.cedula,usu.nombres,usu.apellidos,usu.correo,usu.cargo,usu.contraseña,usu.telefono,provedor.nit,1],(err,rowus)=>{
          if(err){throw err}
          else
          {
            callback(200,true)
          }
        })
      }
    })
  }
};


module.exports = provmodel;
