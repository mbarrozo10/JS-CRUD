import {Superheroe} from './superheroe.js';
import {armas} from './armas.js';
import {crearTabla} from './tabla.js';
import {actualizarTabla} from './tabla.js';
const URL= "http://localhost:3000/heroes";
const loader= document.getElementById("loader");
loader.classList.add("oculto");

const $seccionTabla= document.getElementById("selTabla");
let listaHeroes=[];
let heroesbkp=[];
let flag=true;
let indice=0;


const armasHeroes= armas;

function GetAnuncios (url) {
  loader.classList.remove("oculto");
    fetch(url)
  .then((rta) => rta.ok?rta.json():Promise.reject(rta))
  .then((data) => {
    listaHeroes= data;
    $seccionTabla.appendChild(crearTabla(listaHeroes));
    $seccionTabla.classList.add('text-center');
    
    heroesbkp= data;
    MapeadoPromedio(heroesbkp);
    MapeadoMaximo(heroesbkp);
    MapeadoMimimo(heroesbkp);
    CargarCheckBox();
    localStorage.setItem("Heroes",JSON.stringify(listaHeroes));
  })
  .catch((err) => {
      console.error(err.message);
  })
  .finally(() => {
    loader.classList.add("oculto");

  });
}

function CargarSeccion(){
  const selectElement = document.getElementById("Filtro");
  
  const etranValues = [
    "Todos",
    "dc",
    "marvel"
  ];
  etranValues.forEach(function(value) {
    var option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

function MapeadoMaximo(Heroes){
  let fuerza = [];
  
  fuerza = Heroes.map(e=> parseInt(e.fuerza));

  var sumaFuerza = fuerza.reduce(function(total, personaje) {
    if(personaje > total){

      return personaje;
      
    }
    return total;
  }, 0);

  const txt= document.getElementById("maxima");
  txt.value= sumaFuerza;
}

function MapeadoMimimo(Heroes){
  let fuerza = [];
  
  fuerza = Heroes.map(e=> parseInt(e.fuerza));

  var sumaFuerza = fuerza.reduce(function(total, personaje) {
    if(personaje < total){

      return personaje;
      
    }
    return total;
  }, fuerza[0]);

  const txt= document.getElementById("minima");
  txt.value= sumaFuerza;
}

function MapeadoPromedio(Heroes){
  let fuerza = [];
  console.log(Heroes);
  fuerza = Heroes.map(e=> parseInt(e.fuerza));
  var sumaFuerza = fuerza.reduce(function(total, fuerza) {
    return parseInt( total + fuerza);
  }, 0)
  const promedio= sumaFuerza/Heroes.length;

  const txt= document.getElementById("promedio");
  txt.value= promedio;
}
const checkboxes = document.querySelectorAll('#mapeado input[type="checkbox"]');
  checkboxes.forEach(e=> {e.addEventListener('change', filtrarAtributos) });

function CargarCheckBox(){
  const check= JSON.parse(localStorage.getItem('check'));
  if(check !==null){
    checkboxes[0].checked = check[0];
    checkboxes[1].checked = check[1];
    checkboxes[2].checked = check[2];
    checkboxes[3].checked = check[3];
    checkboxes[4].checked = check[4];
    filtrarAtributos();
  }else{
    checkboxes[0].checked = true;
    checkboxes[1].checked = true;
    checkboxes[2].checked = true;
    checkboxes[3].checked = true;
    checkboxes[4].checked = true;
    filtrarAtributos();
  }
}

function filtrarAtributos() {
  const checkboxes = document.querySelectorAll('#mapeado input[type="checkbox"]');
  let checks = [];
  let atributosSeleccionados = Array.from(checkboxes)
    .filter(checkbox => {
      checks.push(checkbox.checked);
      return checkbox.checked
    }
    )
    .map(checkbox => checkbox.name);
    if (!atributosSeleccionados.includes('id')) {
      let array=[];
      array.push('id');
      atributosSeleccionados.forEach(e =>{ array.push(e);});
      atributosSeleccionados = array;
    }
  
  const resultado = heroesbkp.map(obj => {
    const nuevoObjeto = {};
    atributosSeleccionados.forEach(atributo => {
      nuevoObjeto[atributo] = obj[atributo];
    });
    return nuevoObjeto;
  });
  listaHeroes = resultado;
  actualizarTabla($seccionTabla, resultado);
  localStorage.setItem("check", JSON.stringify(checks));
}
function FiltrarTransaccion() {
  let filtrados = [];
  const seleccion = document.getElementById("Filtro");

  filtrados=   listaHeroes.filter((rta) => {
    if(seleccion.value == "Todos"){
      return true;
    }else return rta.editorial == seleccion.value;
  });
   //MapeadoPromedio(filtrados);
  actualizarTabla($seccionTabla,filtrados);
}
const seleccion = document.getElementById("Filtro");
seleccion.addEventListener("change",FiltrarTransaccion);

window.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('formularioAlta');

    armasHeroes.forEach((x) => {
      const opcion = document.createElement('option');
      opcion.value = x;
      opcion.text= x;
      formulario.arma.appendChild(opcion);
    });
    GetAnuncios(URL);
    CargarSeccion();
    
    formulario.addEventListener('submit', Manejador);
   
  });



//Decido si voy a guardar o a modificar dependiendo del estado del boton (no es lo mejor)

function Manejador(event) {
  event.preventDefault();
  const formulario = document.getElementById('formularioAlta');
  if(flag) {
    GuardarAnuncio();
  }
  else {
    ModificarAnuncio(formulario);
  }
  }

const personajes = document.getElementById('personajes');
const home= document.getElementById('home');
const homefooter= document.getElementById('homefoot');
const personajeFoot= document.getElementById('personajesfoot');
personajes.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './principal.html';
});

homefooter.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './index.html';
});

personajeFoot.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './principal.html';
});
home.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './index.html';
});



//Event listener para detectar si apreto en la tabla
window.addEventListener("click", (e) => {
  if(e.target.matches("td")){
      
      const id = e.target.parentElement.dataset.id;
      indice= id;
      const anuncioSeleccionado = heroesbkp
    .find((personaje) => personaje.id==id);
      CargarDatosSeleccionado(anuncioSeleccionado);
  }

});

//Genero el objeto anuncio y verifico sus valores
function GuardarAnuncio() {
  const id= generarId();
  const alias= document.getElementById('txtDescripcion').value;
  const nombre = document.getElementById('txtTitulo').value;
  const fuerza= document.getElementById('fuerza').value;
  const indice= document.getElementById('arma').selectedIndex;
  let arma;
  for(const key in armasHeroes){
    if(key== indice){
      arma= armasHeroes[key];
    }

  }
  const transacciones = document.getElementsByName('transaccion');
  let transaccion= false;
  transacciones.forEach(element => {
      if(element.checked) {
          transaccion= element.value;
      }
  });
  if(nombre !="" && fuerza !=undefined && arma !="" && alias !=""){
    const personaje = new Superheroe(parseInt(id),nombre,fuerza,alias,transaccion,arma);
    AgregarAnuncio(personaje);
    LimpiarFormulario(id+1);
   
  }else{
    alert("Algun campo esta vacio");
  }

}

//Agrego el anuncio al listaHeroes y actualizo el localstorage y la tabla
function AgregarAnuncio(Anuncio) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange",()=>{
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status< 300){
         actualizarTabla($seccionTabla,heroesbkp); 
      }else{
        console.error("Error: " + xhr.status + "-" + xhr.statusText);
      }
    }
  });
  xhr.open("POST", URL)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(Anuncio));
}

//Carga los datos de la tabla al formulario
function CargarDatosSeleccionado(anuncioSeleccionado){
    const formulario = document.getElementById('formularioAlta');
    formulario.txtTitulo.value= anuncioSeleccionado.nombre;
    formulario.txtDescripcion.value= anuncioSeleccionado.alias;
    formulario.fuerza.value= anuncioSeleccionado.fuerza;
    flag=false;
    for(const key in armasHeroes){
      
        if(armasHeroes[key]== anuncioSeleccionado.arma){
          formulario.arma.selectedIndex= key;
        }
    }
    
    if(anuncioSeleccionado.editorial == "dc")
        {
            document.getElementById('rTransaccionVenta').checked = true;
          
        }else
        {
          
            document.getElementById('rTransaccionAlquiler').checked = true;
        }
    formulario.btnGuardar.value= "Modificar";
    formulario.btnCancelar.disabled=false;
    formulario.btnCancelar.addEventListener('click',() => {
      LimpiarFormulario(0);
      formulario.btnGuardar.value="Guardar";
      formulario.btnBorrar.disabled=true;
      formulario.btnCancelar.disabled=true;});
    formulario.btnBorrar.disabled= false
    formulario.btnBorrar.addEventListener('click',() => {
      BorrarAnuncio(anuncioSeleccionado, formulario);
    });
    
}

function generarId()
{
    let id;
    for(var i = 0; i < listaHeroes
    .length; i++)
    {
        if(i == (listaHeroes
        .length - 1))
        {
            id = listaHeroes
          [i].id;
        }
    }
    return id + 1;
}

//Limpia el formulario
function LimpiarFormulario(id) {
  flag=true;
  document.getElementById('txtTitulo').value = "";
  document.getElementById('txtDescripcion').value = "";
}

//Modifica el anuncio seleccionado en la tabla
function ModificarAnuncio(formulario) {

  const heroe= heroesbkp
  .find((personaje) => {
      if(personaje.id===parseInt(indice) ){
        personaje.nombre= formulario.txtTitulo.value;
        personaje.alias= formulario.txtDescripcion.value;
        personaje.fuerza= document.getElementById('fuerza').value;
        const indice= document.getElementById('arma').selectedIndex;
        let arma;
        for(const key in armasHeroes){
          if(key== indice){
            arma= armasHeroes[key];
          }

        }
        const transacciones = document.getElementsByName('transaccion');
        let transaccion= false;
        transacciones.forEach(element => {
            if(element.checked) {
                transaccion= element.value;
            }
        });
        personaje.editorial= transaccion;
        personaje.arma= arma;
        flag=true;
        return personaje;
      }
    }
    )

    const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange",()=>{
    if(xhr.readyState == 4){
      loader.classList.add("oculto");
    }
  });
  xhr.open("PUT", URL + "/" + heroe.id)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(JSON.stringify(heroe));

  actualizarTabla($seccionTabla,heroesbkp);
    
    formulario.btnGuardar.value="Guardar";
}

//Borra el anuncio seleccionado en la tabla
function BorrarAnuncio(anuncioBorrar, formulario){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange",()=>{
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status< 300){
         
      }else{
        console.error("Error: " + xhr.status + "-" + xhr.statusText);
      }
      loader.classList.add("oculto");
    }
  });
  xhr.open("DELETE", URL + "/" + anuncioBorrar.id);
  xhr.send();
  
  formulario.btnBorrar.disabled = true;
  formulario.btnGuardar.value="Guardar";
  formulario.btnBorrar.disabled=true;
}
