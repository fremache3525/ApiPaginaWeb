var boton = document.getElementById('agregarBoton');
var guardar = document.getElementById('guardar');
var lista = document.getElementById('lista');
var data=[];
var cant=0;
boton.addEventListener("click", agregar);
guardar.addEventListener("click", save);
function agregar(){
    var nombre = document.getElementById('nombre').value;
    var imagen = document.getElementById('imagen').value;
    var precio = parseFloat(document.getElementById('precio').value);
    var cantidad = parseInt(document.getElementById('cantidad').value);
    var total = precio * cantidad;
    console.log(total);
}
function save(){
    console.log("guarda");

}