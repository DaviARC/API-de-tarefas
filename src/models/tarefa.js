import { v4 as uuidv4 } from 'uuid';

class Tarefa {
    constructor({Usuario, codigoTarefa, descricao, telefone}){
        this.codigoCliente = Usuario.codigoCliente;
        this.codigoTarefa = codigoTarefa ?? uuidv4();
        this.descricao = descricao;
        this.telefone = telefone;
    }
}

export default Tarefa;