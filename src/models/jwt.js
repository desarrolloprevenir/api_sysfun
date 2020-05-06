let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');
let vals = require('./valida');
let user = require('./user');
let ciclo = require('../controler/ciclos')


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
    let sql = 'SELECT usuarios.id_usuarios, roles.* FROM usuarios, roles WHERE usuarios.id_usuarios = ? AND roles.id_roles = usuarios.roles_id;';
    connection.query(sql,[login.usuario],(err,row)=>{
      if(err){throw err}
      else {
        if (JSON.stringify(row)!='[]')
        {
          console.log("no existe el usuario o contraseña incorrecta");
        }
        else
        {
          console.log(row);
          let sqlpr = 'SELECT * FROM permisos WHERE roles_id = ?;';
          connection.query(sqlpr,[row.id_roles],(err,resp)=>{
            if(err){throw err}
            else
                {
                  row.permisos = resp;
                  console.log(row);
                  callback(200,row);
                }
          })

        }
      }
    })
  }
};
//realiza el login de los ususarios retorna un token
jwtmodel.login = (logins,callback) =>{
 console.log('****************************');
 console.log(logins);
//res.send({'mensaje':'usuario enviado por post'});
if(connection)
{
var email = logins.email;
var password = logins.password;
// console.log(password);
var sql = 'SELECT id, email, password, admin, tokenpsh FROM members WHERE email = ? AND password = ?; ';
// console.log('****************************');
connection.query(sql,[email , password ],(err,row)=>{
if(err)
{
throw err;
}
else
{
  // console.log('////***LOGIN*****///');
  console.log(row);
var login = row[0];
if(login!=null)
{
//
// console.log(login);
var av = {avatar:logins.avatar,id:login.id};
// console.log('/////*AV**//////');
// console.log(av);
var member = {email:login.email,password:login.password,admin:login.admin};
// console.log(member);
var tokenres = jwts.sign(member,config.jwt_secreto);
var admins = login.admin;
// console.log('ANTES DEL IFFFFF');
// console.log(admins);
if(admins=='true')
{
  // console.log('provedor');
  var sqlp = 'SELECT provedores.id_provedor as ide FROM provedores WHERE provedores.members_id = ?;';
admins=1;
}
else if (admins=='false')
{
  // console.log('usuario');
  var sqlp = 'SELECT usuarios.id as ide FROM usuarios WHERE usuarios.members_id = ?;';
admins=2;
}
else if (admins=='sucu')
{
  // console.log('sucursal');
    var sqlp = 'SELECT sucursales.id_sucursales as ide from sucursales WHERE sucursales.members_id = ?;';
  admins=4;
}
else
{
  // console.log('medico');
  var sqlp = 'SELECT medicos.medico_id as ide FROM medicos WHERE medicos.members_id =?;';
  admins=3;
}
console.log('QUERY');
console.log(sqlp);
console.log('ID');
console.log(login.id);
connection.query(sqlp,[login.id],(err,respu)=>{
  if(err){throw err}
  else {

    // var idU = login.id;
    console.log(respu);
    respu = respu[0];
    let loges = {token:tokenres, login:true , esAdmin:admins, id_usuario:respu.ide, id_member:login.id};
    // console.log('/////*LOGES**//////');
    // console.log(idU);
    console.log(loges);

    callback(null,loges);

  }
});
}
else {
let error = {menaje:'usuario o contraseña incorrecto', login:false};
callback(null,error);
}
}
});
}
else {
// console.log('error en la conxion a la base de datos');
}
};


//regista la parte memebre a la base de datos para el login de los ususarios
jwtmodel.registroMember = (register, callback) =>{
//  console.log('recibido registro',register);
if(connection)
{
//var nombre = register.nombre;
//var apellidos = register.apellidos;
var memid = register.cedula;
var mememail = register.email;
var password = register.password;
var admin = register.admin;
//  console.log('////////////////////////////');
//  console.log(admin);
var isadmin;
var cod;
if(admin===true){isadmin = 'true';}
else{isadmin='false';}
//console.log(isadmin);
var val = {email:mememail,id:memid};
vals.vRegistro(val,(err,res)=>{
// console.log('/////////////////*************///////');
// console.log(res);

if(res.existe==='false')
{
//console.log('dentro el if'+res);
ciclo.generaSalt((err,gen)=>{
  cod = gen;
});
//confirma que el member no exista en la base de datos
// console.log(cod);
var sql = 'INSERT INTO members (email, admin, password, salt) VALUES ( ?, ?, ?,?)';
//console.log('prueba envio email', mememail);
connection.query(sql,[mememail,isadmin,password,cod],(err,row)=>{
if(err)
{
throw err;
}
else
{
//console.log("1 record inserted, ID: ", row);
var usu = {
  to:mememail,
  pss: cod,
  id:row.insertId
};
console.log('numero de telefono');
console.log(register.tel);
let data = {nums: '57'+register.tel,
            sms:'Gracias por inscribirte a Descuentos Medicos Prevenir Express tu codigo de verificacion para ingresar a nuestra app es '+cod }

sms.sendSms(data,(err,rsms)=>{
console.log(rsms);
email.cuentaBlock (usu,(err,ressp)=>{
  console.log(ressp);
  if(err){throw err}
    else if(ressp==true)
      {
        // console.log(row.insertId);
      let valido = {mensaje:'Usuario registrado con exito',existe:'false',ids:row.insertId};
      // console.log('agregado');
      callback(null,valido);
    }
});
});

}
});
}
else{
let valido = {mensaje:'usuario ya exist',existe:'true'};
callback(null,res);

}
});
}
};

//valida si el usuario esta logeado o no
jwtmodel.valida = (req, res,next) =>
{
var token = req.body.token || req.query.token || req.headers['x-access-token'];
// console.log(token);
if(token)
{
jwts.verify(token,config.jwt_secreto,(err, decoded)=>{
if(err)
{
// console.log(err);
return res.status(403).send({'mensaje':'error al validar usuario, inicie sesion de nuevo'});
}
else
{
req.decoded = decoded;
//console.log(decoded);
next();
}
});
}
else
{
return res.status(403).send({'mensaje':'error al validar ususario'});
}

};

//valida si el ususario esta logeado y si es admin o no
jwtmodel.validaAdmin = (req,res,next) =>
{
var token = req.body.token || req.query.token || req.headers['x-access-token'];

if(token)
{
jwts.verify(token,config.jwt_secreto,(err, decoded)=>{
if(err)
{
// console.log(err);
return res.status(403).send({'mensaje':'error al validar usuario, inicie sesion de nuevo'});
}
req.decoded = decoded;
console.log(decoded);
if(decoded.admin==true || decoded.admin=='true' || decoded.admin=='sucu'|| decoded.admin=='medico')
{
next();
}
else
{
return res.status(403).send({'mensaje':'error al validar usuario, no es admin'});
}


});
}
else
{
// console.log('no ahy token');
return res.status(305).send({'mensaje':'error al validar ususario'});
}
};





module.exports = jwtmodel;
