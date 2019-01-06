window.onload = () => {
    
};

function exibirMensagemSucesso(texto) {
    Swal({
        title: 'Sucesso',
        text: texto,
        type: 'success',
        confirmButtonText: 'Fechar'
      });
}
function exibirMensagemErro(texto) {
    Swal({
        title: 'Erro',
        text: texto,
        type: 'error',
        confirmButtonText: 'Fechar'
      });
}

function marcarItemSelecionado(element) {
    let idInput = element.attributes.for.value;
    let selecionado = document.querySelector(`#${idInput}`).checked;
    if(selecionado) {
        element.classList.add('selecionado');
    } else {
        element.classList.remove('selecionado');
    }
}