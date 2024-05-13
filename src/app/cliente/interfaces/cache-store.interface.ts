import { Cliente } from "./cliente.interface";



export interface CacheStore {
    listadoClientes: TermClientes;
}

export interface TermClientes {
    term: string;
    clientes: Cliente[];
}