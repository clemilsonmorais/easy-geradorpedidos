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

function exibirMensagemConfirmacao(titulo, texto, href, okTexto = 'OK') {    
    Swal.fire({
        title: titulo,
        text: texto,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: okTexto
    }).then((result) => {        
        if (result.value) {            
            if (href) {                
                location.href = href;                
            }            
            return true;  
        }        
        return false; 
    });    
    return false;    
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