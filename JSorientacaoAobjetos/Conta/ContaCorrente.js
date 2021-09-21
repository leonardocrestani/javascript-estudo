import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {
    static numeroDeContasCorrente = 0;

    constructor(saldoInicial, cliente, agencia) {
        super(0, cliente, agencia);
        ContaCorrente.numeroDeContasCorrente += 1;
    }

    // sobreescrevendo o metodo sacar da classe mae
    sacar(valor) {
        let taxa = 1.1;
        super._sacar(valor, taxa);
    }
}