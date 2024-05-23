
export interface EtapaProceso {
    comentario: string;
    estado:     string;
    idProceso:  number;
    idEtapa:    number;
    idUsuario?:  number;
}