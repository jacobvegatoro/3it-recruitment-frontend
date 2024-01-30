import { Postulante } from "./postulante";

export interface CacheStore {
    listadoPostulantes: TermPostulantes;
}

export interface TermPostulantes {
    term: string;
    postulantes: Postulante[];
}