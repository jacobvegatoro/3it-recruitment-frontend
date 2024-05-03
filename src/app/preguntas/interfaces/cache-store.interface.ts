import { Pregunta } from "./pregunta.interface";


export interface CacheStore {
    listadoPreguntas: TermPreguntas;
}

export interface TermPreguntas {
    term: string;
    preguntas: Pregunta[];
}