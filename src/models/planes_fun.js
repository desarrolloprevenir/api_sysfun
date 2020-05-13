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
        // let sqlrl = 'INSERT INTO reglas (grado_con, max_personas, max_edad, id_plan) VALUES ( ?, ?, ?, ?);'
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

pfunmodel.darplan = (id,callback) => {
  if(connection)
  {
    let sql = 'SELECT * FROM plan_fun WHERE provedores_nit = ?;';
    connection.query(sql,[id],(err,row)=>{
      if(err){
        console.log(err.sqlMessage);
        callback(505,{err:err.sqlMessage})
      }
      else
      {
        callback(200,row);
      }
    });
  }
};

pfunmodel.deletePlan = (id,callback) => {
  if(connection)
  {
    let sql = 'DELETE FROM plan_fun WHERE id_plan= ?;';
    connection.query(sql,[id],(err,row)=>{
      if(err){
        console.log(err.sqlMessage);
        callback(505,{err:err.sqlMessage})
      }
      else
      {
        callback(200,{msj:true,delete:row.affectedRows});
      }
    });
  }
};

module.exports = pfunmodel;
