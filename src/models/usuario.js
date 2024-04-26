import {v4 as uuidv4} from 'uuid'

export default class Usuario {
    constructor({cd_usuario, nm_usuario, log_usuario, sen_usuario}){
        this.cd_usuario = cd_usuario ?? uuidv4();
        this.nm_usuario = nm_usuario;
        this.log_usuario = log_usuario
        this.sen_usuario = sen_usuario
    }
}

