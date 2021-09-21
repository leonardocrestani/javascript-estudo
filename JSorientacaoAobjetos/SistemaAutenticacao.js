/*
INTERFACE
Ser autenticavel significa ter a propriedade senha
Toda classe que tiver o metodo autenticar implementado vai poder utilizar
esta inferface de autenticacao
*/

export class SistemaAutenticacao {
    static login(autenticavel, senha) {
        if(SistemaAutenticacao.ehAutenticavel(autenticavel)) {
            return autenticavel.autenticar(senha);
        }
        return false;
    }

    static ehAutenticavel(autenticavel) {
        if("autenticar" in autenticavel && autenticavel.autenticar instanceof Function) {
            return true;
        }
        else {
            return false;
        }
    }
}