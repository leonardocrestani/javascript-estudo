import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente();
cliente1.nome = "Ricardo";
cliente1.cpf = 13123123123;

const contaCorrenteRicardo = new ContaCorrente();
contaCorrenteRicardo.agencia = 1001;
contaCorrenteRicardo.deposita(1000);
contaCorrenteRicardo.sacar(50); // Vai printar no console O valor sacado foi de 50

contaCorrenteRicardo.cliente = cliente1
console.log(contaCorrenteRicardo.cliente); // Retorna cliente: Cliente { nome: 'Ricardo', cpf: 13123123123 }

const cliente2 = new Cliente();
cliente2.nome = "Fabio";
cliente2.cpf = 69586945869;

const contaCorrenteFabio = new ContaCorrente();
contaCorrenteFabio.agencia = 1001;
contaCorrenteFabio.cliente = cliente2;

contaCorrenteRicardo.transferir(200, contaCorrenteFabio);

console.log(contaCorrenteFabio._saldo); // Retorna 200

const contaCorrente3 = new ContaCorrente();
contaCorrente3._cliente = new Cliente();
contaCorrente3._cliente.nome = "Leonardo";
contaCorrente3._cliente.cpf = 123456789;

console.log(contaCorrente3.cliente); // Retorna o objeto cliente da conta
contaCorrente3.deposita(100);
console.log(contaCorrente3.saldo); // Retorna o saldo (100) atraves do get saldo

/* ContaCorrente {
    agencia: undefined,
    cliente: Cliente { nome: 'Leonardo', cpf: 123456789 },
    _saldo: 0
} */