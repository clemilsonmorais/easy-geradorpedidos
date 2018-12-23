var express = require('express');
var router = express.Router();
var opcoes = ['*Mini*'];
var pedidos = [];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' , opcoes, pedidos});
});


router.get('/admin', (req, res, next) => {
  res.render('admin', {pedidos, opcoes});
});

router.post('/enviar', (req, res, next) => {
  if(req.body.nome && req.body.nome.length > 0) {
    pedidos = pedidos.filter(p => p.nome != req.body.nome);
    let ops = []
    if (typeof(req.body.opcoes) == 'string') {
      ops = [req.body.opcoes];
    } else {
      ops = req.body.opcoes;
    }
    let observacao = "";
    if (req.body.observacao && req.body.observacao.length > 0) {
      observacao = req.body.observacao;
    }    
    pedidos.push({nome: req.body.nome, opcoes: ops, observacao: observacao});
  }
  res.redirect('/');
});

router.post('/inserirCardapio', (req, res, next) => {
  let cardapio = req.body.cardapio.trim();
  opcoes = ['*Mini*'];
  if(cardapio) {
    opcoes = opcoes.concat(cardapio.split('\r\n'));
  }
  pedidos = [];
  res.redirect('/admin');
});

router.get('/remover/:nome', (req, res, next) => {
  pedidos = pedidos.filter(p => p.nome != req.params.nome);
  res.redirect('/admin');
});


router.get('/gerarPedido', (req, res, next) => {
  res.render('gerar', {pedidos});
});


module.exports = router;
