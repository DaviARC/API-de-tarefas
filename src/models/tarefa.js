import {v4 as uuidv4} from 'uuid'

class Tarefa {
    constructor(cd_usuario, des_tarefa, tit_tarefa, cd_tarefa){
        this.cd_usuario = cd_usuario;
        this.cd_tarefa = cd_tarefa ?? uuidv4();
        this.des_tarefa = des_tarefa;
        this.tit_tarefa = tit_tarefa;
    }
}

export default Tarefa;