// Generated by https://quicktype.io

import { Respuesta } from "./respuesta.interface";

export interface Entrevista {
    id:                   number;
    fecha_entrevista:     string;
    perfilBuscado:        string;
    comentariosPrueba:    string;
    comentariosGenerales: string;
    recomendaciones:      string;
    descripcionPersonal:  string;
    preguntasCandidato:   string;
    respuestas:           Respuesta[];
}
