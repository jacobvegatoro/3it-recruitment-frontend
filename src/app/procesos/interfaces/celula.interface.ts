import { Cliente } from "./cliente.interface";

export interface Celula {
    id:     number;
    nombre: string;
    cliente: Cliente;
}