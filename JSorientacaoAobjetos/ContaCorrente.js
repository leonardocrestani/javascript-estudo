import { Cliente } from "./Cliente.js";

export class ContaCorrente {
    agencia;
    _cliente;
    _saldo = 0;

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

    constructor(cliente, agencia) {
        this.agencia = agencia;
        this.cliente = cliente;
    }

    sacar(valor) {
        let valorSacado = valor;
        if(valorSacado <= this._saldo) {
            this._saldo -= valorSacado;
            return console.log(`O valor sacado foi de ${valor}`);
        }
    }

    deposita(valor) {
        if(valor < 0) {
            return;
        }
        else {
            this._saldo += valor;
        }
    }

    transferir(valor, conta) {
        const valorSacado = this.sacar(valor);
        conta.deposita(valor);
    }

}