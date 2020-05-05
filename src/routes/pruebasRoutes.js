const pruebas = require('../models/pruebas');

module.exports = function (app)
{

//devuelve listado de categorias
app.get('/pruebasy/:idc',(req,res)=>{
    // console.log(req.params.idc);
    pruebas.promesa(req.params.idc,(err,resp)=>{
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
