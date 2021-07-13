export class Cliente {
    static numeroClientes = 0;
    nome;
    _cpf;

    get cpf() {
        return this._cpf;
    }

    constructor(nome, cpf) {
        this.nome = nome;
        this._cpf = cpf;
        Cliente.numeroClientes += 1;
    }

}