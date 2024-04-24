import { EntrevistaInfo } from "./entrevista-info.interface";

export interface CacheStore {
    listadoEntrevistas: TermEntrevistas;
}

export interface TermEntrevistas {
    term: string;
    entrevistas: EntrevistaInfo[];
}