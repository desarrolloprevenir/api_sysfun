let mysql = require('mysql');
let config = require('../config');

connection = mysql.createConnection({
host: config.domain,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let pfunmodel = {};

pfunmodel.agregar = (plan,callback) => {
  if(connection)
  {

    let sql = 'INSERT INTO plan_fun (nombre, valor, max_personas, max_cuotas, provedores_nit) VALUES (?, ?, ?, ?, ?);';
    connection.query(sql,[plan.nombre,plan.valor,plan.max_personas,plan.cuotas,plan.nit],(err,rowpr)=> {
      if(err){throw err}
      else {
          console.log(rowpr);
        // let sqlrl = 'INSERT INTO usuarios (id_usuarios, cedula, nombres, apellidos, correo, cargo, contraseña, telefono, provedores_nit, roles_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
        // connection.query(sqlus,[usu.usuario,usu.cedula,usu.nombres,usu.apellidos,usu.correo,usu.cargo,usu.contraseña,usu.telefono,provedor.nit,1],(err,rowus)=>{
        //   if(err){throw err}
        //   else
        //   {
        //     callback(200,true)
        //   }
        // })
      }
    })
  }
};


module.exports = pfunmodel;
