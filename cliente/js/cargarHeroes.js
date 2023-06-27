

const heroes = JSON.parse(localStorage.getItem('Heroes')) || [];

const personajes = document.getElementById('personajes');
const home= document.getElementById('home');
const homefooter= document.getElementById('homefoot');
const personajeFoot= document.getElementById('personajesfoot');

personajes.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './principal.html';
});

home.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './index.html';
});

homefooter.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './index.html';
});

personajeFoot.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './principal.html';
});


window.addEventListener('DOMContentLoaded', () => {
    Generar();
});

function Generar() {
    const formulario= document.getElementById('tarjeta');

    heroes.forEach((hero) => {
        const ficha= document.createElement('fieldset');

        const labelNombre= document.createElement('label');
        const labelAlias= document.createElement('label');
        const labelEditorial= document.createElement('label');
        const labelFuerza= document.createElement('label');
        const labelArma= document.createElement('label');
        

        labelNombre.textContent = "Nombre: " + hero.nombre;
        labelAlias.textContent = "Alias: " + hero.alias;
        labelEditorial.textContent ="Editorial: " + hero.editorial;
        labelFuerza.textContent= "Fuerza:  " + hero.fuerza;
        labelArma.textContent = "Arma: " + hero.arma;

        labelFuerza.classList.add("iconoFuerza");
        labelArma.classList.add("iconoArma");
        labelAlias.classList.add("iconoAlias");
        labelEditorial.classList.add("iconoEditorial");

        labelNombre.style.display="flex";
        labelAlias.style.display="flex";
        labelArma.style.display="flex";
        labelEditorial.style.display= "flex";
        labelFuerza.style.display= "flex";

        ficha.appendChild(labelNombre);
        ficha.appendChild(labelAlias);
        ficha.appendChild(labelFuerza);
        ficha.appendChild(labelArma);
        ficha.appendChild(labelEditorial);

        ficha.classList.add("Fichas");
        formulario.appendChild(ficha);
        
    })
}
