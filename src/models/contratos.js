let mysql =require('mysql');
let config = require('../config');
let jwts = require('jsonwebtoken');



connection = mysql.createConnection({
host: config.host,
user: config.userbd,
password: config.passwordbd,
database: config.nombredb
});

let contmodel = {};

contmodel.agregarContrato = (afili,callback) =>
{
  if(connection)
  {
    //agrega un afiliado
    // let sqlbn = "INSERT INTO beneficiarios (nombres, apellidos, edad, año_nas, afiliado_cedula) VALUES (?);";
     let sqlaf = 'INSERT INTO afiliado (cedula, de_cedula, nombres, apellidos, direccion, telefono, celular, fecha_nas, estado_civil, ocupacion, correo, edad_afiliacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
     connection.query(sqlaf,[afili.cedula,afili.de,afili.nombres,afili.apellidos,afili.direccion,afili.tel,afili.celu,afili.fecha_nas,afili.estado_c,afili.ocupacion,afili.correo,afili.edad_af],(err,rowaf)=>{
        if(err){
              console.log('error en el afiliado');
              console.log(err.sqlMessage)
              callback(null,{resp:false,inserts:0,err:err.sqlMessage});
        }
        else
        {
          //agrega los beneficiarios
          let ben = afili.benef;
          let sqlaf = "INSERT INTO beneficiarios (nombres, apellidos, edad, año_nas, afiliado_cedula) VALUES ?;";
          connection.query(sqlaf,[ben],(err,rowaf)=>{
            if(err){
              console.log('error en los beneficiarios');
            console.log(err.sqlMessage)
            callback(null,{resp:false,inserts:0,err:err.sqlMessage});
            }
            else
            {
              console.log(rowaf.affectedRows);
              // callback(null,{resp:true,inserts:rowaf.affectedRows});
                //inicia el contrato
                    console.log(rowaf.affectedRows);
                    // callback(null,{resp:true,inserts:rowaf.affectedRows
                      //inicia el contrato
                      let contr = afili.contrato;
                      console.log(afili.contrato);
                      let sqlcont = 'INSERT INTO contrato (fecha_inicio, fecha_fin, modalidad_pago, cuotas, valor_tot, estado, afiliado_cedula, nit, id_plan) VALUES (?,?,?,?,?,?,?,?,?);';
                      connection.query(sqlcont,[contr.fecha_inicio,contr.fecha_fin,contr.modalidad_pago,contr.cuotas,contr.valor_tot,contr.estado,afili.cedula,contr.nit,contr.id_plan],(err,rescon)=>{
                        if(err){
                          callback(null,{resp:false,inserts:0,err:err.sqlMessage});
                        }
                        else
                        {
                          console.log(rowaf.affectedRows);
                          callback(null,{resp:true,inserts:rowaf.affectedRows});
                        }
                          });
                            }
                          });
              }
          });
        }
     };

contmodel.pruebam = (ben,callback) =>
{
  console.log('Dentro del campo');
  if(connection)
  {
    console.log(ben);
     let sqlaf = "INSERT INTO beneficiarios (nombres, apellidos, edad, año_nas, afiliado_cedula) VALUES ?;";
     connection.query(sqlaf,[ben],(err,rowaf)=>{
       if(err){console.log(err)}
       else
       {
         console.log(rowaf.affectedRows);
         callback(null,true);
       }
     });

  }
};

contmodel.pruebam1 = (ben,callback) =>
{
  connection.connect(function(err)
  {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO beneficiarios (nombres, apellidos, edad, año_nas, afiliado_cedula) VALUES ?;";
  console.log(ben);
  connection.query(sql, [ben], function (err, result)
  {
    if (err) {
      connection.end();
      callback(null,{resp:true,inserts:0,err:err.sqlMessage})
      console.log(err);
    }
    else
    {
      connection.end();
    console.log("Number of records inserted: " + result.affectedRows);
    callback(null,{resp:true,inserts:result.affectedRows});
    }
  });
});

};


module.exports = contmodel;
