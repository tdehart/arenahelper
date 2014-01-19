'use strict';

//Setting up route
angular.module('arenahelper').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/cards', {
            templateUrl: 'views/cards/list.html'
        }).
        when('/cards/create', {
            templateUrl: 'views/cards/create.html'
        }).
        when('/cards/:cardId/edit', {
            templateUrl: 'views/cards/edit.html'
        }).
        when('/cards/:cardId', {
            templateUrl: 'views/cards/view.html'
        }).
        when('/drafts', {
            templateUrl: 'views/drafts/list.html'
        }).
        when('/drafts/create', {
            templateUrl: 'views/drafts/create.html'
        }).
        when('/drafts/:draftId/edit', {
            templateUrl: 'views/drafts/edit.html'
        }).
        when('/drafts/:draftId', {
            templateUrl: 'views/drafts/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('arenahelper').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
