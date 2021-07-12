const BotaoDeleta = () => {
    const botaoDelete = document.createElement('button');

    botaoDelete.innerText = "Deletar";
    botaoDelete.addEventListener('click', (event) => {
        deletarTarefa(event);
    });

    return botaoDelete;
}

const deletarTarefa = (event) => {
    const botaoDeleta = event.target;
    const tarefaDeletada = botaoDeleta.parentElement;
    tarefaDeletada.remove();
}

export { BotaoDeleta };