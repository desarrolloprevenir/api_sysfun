let mysql =require('mysql');
let config = require('../config');
let jwt = require('jsonwebtoken');



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
                  console.log(usu);
                  console.log(usu.id_roles);
                  console.log(usu.id_usuarios);
                  // console.log({usuario:usu.id_usaurios,rol:usu.id_roles,permisos:usu.permisos});
                  let member = {usu:usu.id_usuarios,rol:usu.id_roles,permisos:usu.permisos};
                  console.log(member);
                  var tokenres = jwt.sign(member,config.jwt_secreto);
                  console.log(tokenres);
                  callback(200,tokenres);
                }
          })

        }
      }
    })
  }
};

//valida si el usuario esta logeado o no
jwtmodel.valida = (req, res,next) =>
{
var token = req.body.token || req.query.token || req.headers['x-access-token'];
// console.log(token);
if(token)
{
  console.log('TOKEN');
  console.log(token);
  console.log('CLAVE SECRETA');
  console.log(config.jwt_secreto);
  console.log('DENTRO DE EL TOKEN SI LLEGO');
jwt.verify(token,config.jwt_secreto,(err, decoded)=>{
if(err)
{
console.log(err);
return res.status(403).send({'mensaje':'error al validar usuario, inicie sesion de nuevo'});
}
else
{
req.decoded = decoded;
console.log(decoded);
next();
}
});
}
else
{
return res.status(403).send({'mensaje':'error al validar ususario'});
}

};

module.exports = jwtmodel;
