import { v4 as uuidv4 } from 'uuid';

class Usuario {
    constructor({codigoCliente, nome, dataNascimento, telefone}){
        this.codigoCliente = codigoCliente ?? uuidv4();
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone
    }
}

export default Usuario;