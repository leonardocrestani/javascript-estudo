import { Cliente } from "../Cliente.js";

export class Conta {

    constructor(saldoInicial, cliente, agencia) {
        if(this.constructor == Conta) {
            throw new Error("Nao e possivel instanciar uma classe do tipo conta, CLASSE ABSTRATA");
        }
        this._saldo = saldoInicial;
        this._cliente = cliente;
        this._agencia = agencia;
    }

    set cliente(novoValor) {
        if(novoValor instanceof Cliente) {
            this._cliente = novoValor;
        }
    }

    get cliente() {
        return this._cliente;
    }

    get saldo() {
        return this._saldo;
    }

    // metodo abstrato
    sacar(valor) {
        throw new Error("O metodo sacar da conta e abstrato");
    }

    // metodo privado de saque (vai servir como uma base para as modificacoes de saque)
    _sacar(valor, taxa) {
        const valorSacado = taxa * valor;
        if(valorSacado <= this._saldo) {
            this._saldo -= valorSacado;
            return console.log(`O valor sacado foi de ${valorSacado}`);
        }
        else {
            return console.log("Nao foi possivel sacar")
        }
    }

    deposita(valor) {
        this._saldo += valor;
    }

    transferir(valor, conta) {
        const valorSacado = this.sacar(valor);
        conta.deposita(valor);
    }
}