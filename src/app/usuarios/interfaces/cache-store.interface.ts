import { Usuario } from "./usuario.interface";



export interface CacheStore {
    listadoUsuarios: TermUsuarios;
}

export interface TermUsuarios {
    term: string;
    usuarios: Usuario[];
}