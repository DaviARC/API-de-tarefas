import ErroBase from "../erros/ErroBase.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";


export default function manipuladorDeErros(erro, req, res, next){
    if(erro instanceof RequisicaoIncorreta){
        new RequisicaoIncorreta().enviarResposta()
    }
    else if(erro instanceof NaoEncontrado){
        erro.enviarResposta(res)
    }
    else if (erro instanceof ErroBase){
        erro.enviarResposta(res);
    }
    else
    {
        new ErroBase().enviarResposta(res);    
    }
    
}