const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');

const csrfProtection = csrf();

router.post('/removerUsuario', function(req, res, next) {
  User.findOneAndRemove({email: req.user.email}, function(err, success) {
    if(err) {
      console.log(err.message);
      req.flash('error', 'Falha ao remover usuário!');
    }
    if(success) {
      req.flash('success', 'Usuário removido com sucesso!');
      res.redirect('/');
    }
  });
});

router.use(csrfProtection);

router.get('/perfil', isLoggedIn, function(req, res, next) {
  Order.find({
    user: req.user
  }, function(err, orders) {
    if (err) {
      return res.write('Error!');
    }
    let cart;
    orders.forEach(function(order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('user/profile', {
      csrfToken: req.csrfToken(),
      orders: orders,
      user: req.user
    });
  });
});

router.post('/perfil', function(req, res, next) {

  if (req.body.email) {
    User.findOne({
      email: req.body.email
    }, function(err, doc) {

      if (err) {
        req.flash('error', 'falhou')
        console.log(err);
      }

      doc.email = req.body.email;
      doc.name = req.body.name;
      doc.state = req.body.state;
      doc.city = req.body.city;
      
      doc.save();

    });
  } else {
    console.log("email inválido");
  }

  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/usuario/perfil');
  }

  res.end();

});

router.get('/sair', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/inscrever', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/inscrever', passport.authenticate('local.signup', {
  failureRedirect: '/usuario/inscrever',
  failureFlash: true
}), function(req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/usuario/perfil');
  }
});

router.get('/logar', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/logar', passport.authenticate('local.signin', {
  failureRedirect: '/usuario/logar',
  failureFlash: true
}), function(req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/usuario/perfil');
  }
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}