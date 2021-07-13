import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente("Ricardo", 13131313131);
console.log(cliente1.cpf); // Retorna 131313131

const contaCorrenteRicardo = new ContaCorrente(1001, cliente1);
contaCorrenteRicardo.deposita(1000);
contaCorrenteRicardo.sacar(50); // Vai printar no console O valor sacado foi de 50

const cliente2 = new Cliente("Fabio", 123123123123);

const contaCorrenteFabio = new ContaCorrente();
contaCorrenteFabio.agencia = 1001;
contaCorrenteFabio.cliente = cliente2;

contaCorrenteRicardo.transferir(200, contaCorrenteFabio);

console.log(contaCorrenteFabio._saldo); // Retorna 200

const contaCorrente3 = new ContaCorrente();
contaCorrente3._cliente = new Cliente("Leonardo", 65464564565);

console.log(contaCorrente3.cliente); // Retorna o objeto cliente da conta
contaCorrente3.deposita(100);
console.log(contaCorrente3.saldo); // Retorna o saldo (100) atraves do get saldo

/* ContaCorrente {
    agencia: undefined,
    cliente: Cliente { nome: 'Leonardo', cpf: 123456789 },
    _saldo: 0
} */

console.log(Cliente.numeroClientes); // Retorna 3 pois foram criados 3 clientes