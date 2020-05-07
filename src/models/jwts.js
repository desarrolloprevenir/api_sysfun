let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');



connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let jwtmodel = {};

jwtmodel.login1 = (login,callback)=> {
  if(connection)
  {
    console.log(login);
    let sql = 'SELECT usuarios.id_usuarios, roles.* FROM usuarios, roles WHERE usuarios.id_usuarios = ? AND usuarios.contraseña = ? AND roles.id_roles = usuarios.roles_id;';
    connection.query(sql,[login.usuario,login.contraseña],(err,row)=>{
      if(err){throw err}
      else {
        if (JSON.stringify(row)=='[]')
        {
          // console.log("no existe el usuario o contraseña incorrecta");
          callback(323,false);
        }
        else
        {
          // console.log(row);
          // console.log(row[0].id_roles);
          let sqlpr = 'SELECT * FROM permisos WHERE roles_id = ?;';
          connection.query(sqlpr,[row[0].id_roles],(err,resp)=>{
            if(err){throw err}
            else
                {
                  let usu = row[0];
                  usu.permisos = resp;
                  // console.log(usu);
                  var tokenres = jwts.sign({usuario:usu.id_usaurios,rol:usu.id_roles,permisos:usu.permisos},config.jwt_secreto);
                  // console.log(tokenres);
                  callback(200,tokenres);
                }
          })

        }
      }
    })
  }
};

module.exports = jwtmodel;
