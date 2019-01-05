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