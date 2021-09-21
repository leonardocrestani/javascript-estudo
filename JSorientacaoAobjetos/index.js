import { Cliente } from "./Cliente.js";
import { Diretor } from "./Funcionario/Diretor.js";
import { Gerente } from "./Funcionario/Gerente.js";
import { SistemaAutenticacao } from "./SistemaAutenticacao.js";

const diretor = new Diretor("Fabio", 10000, "3124804239");
diretor.cadastrarSenha("1234567");

const gerente = new Gerente("Paulo", 5000, "4328745823");
gerente.cadastrarSenha("1234");

const cliente = new Cliente("Pedro", "1287489134", "456");

const diretorEstaLogado = SistemaAutenticacao.login(diretor, "1234567");
const gerenteEstaLogado = SistemaAutenticacao.login(gerente, "1234");
const clienteEstaLogado = SistemaAutenticacao.login(cliente, "456");

console.log(diretorEstaLogado);
console.log(gerenteEstaLogado);
console.log(clienteEstaLogado);