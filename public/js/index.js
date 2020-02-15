document.addEventListener("DOMContentLoaded", function() { 
    const form = document.getElementById('pedido-form');
    const nomeInput = document.querySelector('input[name="nome"]');

    form.addEventListener('submit', function(event) {
        window.localStorage.setItem('@easy-geradorpedidos/nome', nomeInput.value);
    });

    const nome = window.localStorage.getItem('@easy-geradorpedidos/nome');
    if (nome) {
        nomeInput.value = nome;
    }
});