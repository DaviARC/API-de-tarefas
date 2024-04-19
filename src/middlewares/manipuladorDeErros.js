import RequisicaoIncorreta from "../erros/RequisicaoIncorreta";


function manipuladorDeErros(erro, req, res, next){
    if(erro instanceof RequisicaoIncorreta){

    }
}