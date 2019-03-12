var express = require('express');
var router = express.Router();
var opcoes = ['*Mini*'];
var pedidos = [];
var encerrado = false;


router.get('/', (req, res, next) => {
  var context = req.cookies["submetido"];
  submetido = null;
  if (context) {
    submetido = context === 'true';
  }
  res.clearCookie("submetido", { httpOnly: true });
  console.log(context);
  res.render('index', { title: 'Easy Gerador Pedidos', opcoes, pedidos, submetido, encerrado });
});


router.get('/admin', (req, res, next) => {
  res.render('admin', { title: 'Easy Gerador Pedidos - Administração', pedidos, opcoes, encerrado });
});

router.post('/enviar', (req, res, next) => {
  if (req.body.nome && req.body.nome.length > 0) {
    if (encerrado) {
      res.cookie("submetido", "false", { httpOnly: true });
    } else {
      pedidos = pedidos.filter(p => p.nome != req.body.nome);
      let ops = []
      if (typeof (req.body.opcoes) == 'string') {
        ops = [req.body.opcoes];
      } else {
        ops = req.body.opcoes;
      }
      let observacao = "";
      if (req.body.observacao && req.body.observacao.length > 0) {
        observacao = req.body.observacao;
      }
      pedidos.push({ nome: req.body.nome, opcoes: ops, observacao: observacao });
      res.cookie("submetido", "true", { httpOnly: true });
    }
  }

  //TODO tratamento quando houver algum problema ao submeter
  res.redirect('/');
});

router.post('/inserirCardapio', (req, res, next) => {
  let cardapio = req.body.cardapio.trim();
  opcoes = ['*Mini*'];
  if (cardapio) {
    opcoes = opcoes.concat(cardapio.split('\r\n'));
  }
  pedidos = [];
  encerrado = false;
  res.redirect('/admin');
});

router.post('/encerrarCardapio', (req, res, next) => {
  encerrado = true;
  res.redirect('/admin');
});

router.get('/remover/:nome', (req, res, next) => {
  pedidos = pedidos.filter(p => p.nome != req.params.nome);
  res.redirect('/admin');
});


router.get('/gerarPedido', (req, res, next) => {
  res.render('gerar', { title: 'Easy Gerador Pedidos - Pedidos', pedidos });
});

router.get('/enviarPedidoWhatsapp', async (req, res, next) => {
  let pedidoStr = '';
  pedidos.forEach(pedido => {
    pedidoStr += `${pedido.nome}:\r\n`;
    pedido.opcoes.forEach(opcao => {
      pedidoStr += `${opcao}\r\n`;
    });
    if (pedido.observacao) {
      pedidoStr += `(Obs.:${pedido.observacao})\r\n`;
    }
    pedidoStr += '\r\n';
  });
  res.status(301).redirect(`https://api.whatsapp.com/send?text=${pedidoStr}`);
});


module.exports = router;
