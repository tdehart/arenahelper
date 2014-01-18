'use strict';

angular.module('arenahelper.cards').controller('CardsController', ['$scope', '$routeParams', '$location', 'Global', 'Cards', function ($scope, $routeParams, $location, Global, Cards) {
    $scope.global = Global;

    $scope.create = function() {
        var card = new Cards({
            name: this.name,
            rarity: this.rarity,
            attack: this.attack
        });
        card.$save(function(response) {
            $location.path('cards/' + response._id);
        });

        this.name = '';
        this.rarity = '';
        this.attack = '';
    };

    $scope.remove = function(card) {
        if (card) {
            card.$remove();

            for (var i in $scope.cards) {
                if ($scope.cards[i] === card) {
                    $scope.cards.splice(i, 1);
                }
            }
        }
        else {
            $scope.card.$remove();
            $location.path('cards');
        }
    };

    $scope.update = function() {
        var card = $scope.card;
        if (!card.updated) {
            card.updated = [];
        }
        card.updated.push(new Date().getTime());

        card.$update(function() {
            $location.path('cards/' + card._id);
        });
    };

    $scope.find = function() {
        Cards.query(function(cards) {
            $scope.cards = cards;
        });
    };

    $scope.findOne = function() {
        Cards.get({
            cardId: $routeParams.cardId
        }, function(card) {
            $scope.card = card;
        });
    };
}]);
