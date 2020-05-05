const provedores = require('../models/prevedores' );

module.exports = function (app)
{

//devuelve listado de categorias
app.post('/provedores',(req,res)=>{
    // console.log(req.params.idc);
    let provedor = req.body;
    console.log(provedor);
    provedores.registraProvedor(provedor,(err,resp)=>{
      res.json(resp);
    });



});


app.put('/comentmed',(req,res)=>{
  let coment = req.body;
  // console.log('LOG DE EL BODY RECIBIDO');
  // console.log(coment);
  comentarios.UpdateComentMed(coment,(err,data)=>{
    res.json(data);
  });
});

}
