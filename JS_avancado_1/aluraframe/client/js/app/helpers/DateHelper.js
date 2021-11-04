class DateHelper {

    // Classe helper
    // Esta classe serve apenas de apoio para nossa aplicacao ela contem funcoes que ficam a disposicao para serem utilizadas
    // Esta classe nao pode ser instanciada e os metodos devem ser estaticos para poderem ser utilizados como metodos da classe e nao da instancia
    constructor() {
        throw new Error('Date helper nao pode ser instanciada');
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
            throw new Error('Deve estar no formato YYYY-MM-DD');
        }
        else {
            return texto.split("-").map(function(item, indice) {
                if(indice == 1) {
                    return item-1;   
                }
                else {
                    return item;
                }
            });
        }
    }

    static dataParaTexto(data) {
        if(data.getDate() < 10) {
            return `0${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
        }
        else {
            return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
        }
        
    }

}