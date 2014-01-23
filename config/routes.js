'use strict';

module.exports = function(app, passport, auth) {
    
    // User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);

    // Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    // Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    // Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);


    // Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);

    // Drafts Routes
    var drafts = require('../app/controllers/drafts');
    app.get('/drafts', drafts.all);
    app.post('/drafts', auth.requiresLogin, drafts.create);
    app.get('/drafts/:draftId', drafts.show);
    app.put('/drafts/:draftId', auth.requiresLogin, auth.article.hasAuthorization, drafts.update);
    app.del('/drafts/:draftId', auth.requiresLogin, auth.article.hasAuthorization, drafts.destroy);

    // Finish with setting up the draftId param
    app.param('draftId', drafts.draft);

    // Cards Routes
    var cards = require('../app/controllers/cards');
    app.get('/cards', cards.all);
    app.post('/cards', auth.requiresLogin, cards.create);
    app.get('/cards/:cardId', cards.show);
    app.put('/cards/:cardId', auth.requiresLogin, cards.update);
    app.del('/cards/:cardId', auth.requiresLogin, cards.destroy);

    // Finish with setting up the cardId param
    app.param('cardId', cards.card);


    // Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
