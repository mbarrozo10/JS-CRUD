
//Metodo generar tabla exportado para poder usarse en anuncios
export const crearTabla = (data) => {
    if(!Array.isArray(data)) return null;
    
    const tabla = document.createElement('tabla');
    tabla.appendChild(CrearCabecera(data[0]));
    tabla.appendChild(CrearCuerpo(data));

    tabla.classList.add('table');
    tabla.classList.add('table-striped');
    tabla.classList.add('table-hover');
    tabla.classList.add('table-dark');
    tabla.classList.add('table-responsive');
    tabla.classList.add('table-bordered');


    return tabla;
}


//Crea la cabecera, puede hacerse dinamicamente pero no quiero <3
const CrearCabecera = (elemento) => {
    const thead = document.createElement("thead"),
    
    headrow= document.createElement("tr");

    for(const key in elemento ){
        if(key != "id")
       { const th = document.createElement("th");
        th.textContent = key;
        th.classList.add('col-md-4');
        headrow.appendChild(th);}
    }

    thead.appendChild(headrow);

    thead.classList.add('text-center');
    thead.classList.add('text-capitalize');
    thead.classList.add('thead-dark');
    return thead;
};

//Crea el cuerpo de la tabla con los datos pasados
const CrearCuerpo= (data) => {
    const tbody = document.createElement("tbody");

    data.forEach(element => {
        const tr= document.createElement("tr");
        for(const key in element) {
            if(key ==="id"){
                tr.dataset.id=element[key];
            }else{
            const td= document.createElement("td");
            td.textContent = element[key];
            td.classList.add('text-center');
            td.classList.add('col-md-4');

            tr.appendChild(td);
            tr.classList.add('text-center');
            }
        }
        tbody.appendChild(tr);

    });
    return tbody;
}

//Actualiza la tabla, exporto para poder usarla cuando la necesito
export const actualizarTabla= (contenedor, data) => {
    while(contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.lastChild);
    }
    contenedor.appendChild(crearTabla(data));
  }


