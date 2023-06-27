import {Personaje} from './personaje.js';

export function Superheroe(id, nombre, fuerza, alias, editorial, arma){
    Personaje.call(this, id,nombre,fuerza);
    this.alias = alias;
    this.editorial= editorial;
    this.arma = arma;
}