const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const User = require('../models/user');

const Product = require('../models/product');

//  Pagina Inicial
router.get('/', function(req, res, next) {
  const successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Loja',
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg
    });
  });
});

router.get('/adicionarCarrinho/:id', function(req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
});

router.get('/reduzir/:id', function(req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/loja');
});

router.get('/remover/:id', function(req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/loja');
});

router.get('/loja', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping', {
      products: null
    });
  }
  const cart = new Cart(req.session.cart);
  res.render('shop/shopping', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});


module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/usuario/logar');
}