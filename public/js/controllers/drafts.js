'use strict';

angular.module('arenahelper.drafts').controller('DraftsController', ['$scope', '$routeParams', '$location', 'Global', 'Cards', 'Drafts',
  function($scope, $routeParams, $location, Global, Cards, Drafts) {
    $scope.global = Global;
    $scope.currentTurn = 1;
    $scope.turns = {};
    $scope.heroClasses = ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"]
    resetCards();

    $scope.create = function() {
      var draft = new Drafts({
        turns: this.turns
      });
      draft.$save(function(response) {
        $location.path('drafts/' + response._id);
      });
    };

    $scope.remove = function(draft) {
      if (draft) {
        draft.$remove();

        for (var i in $scope.drafts) {
          if ($scope.drafts[i] === draft) {
            $scope.drafts.splice(i, 1);
          }
        }
      } else {
        $scope.draft.$remove();
        $location.path('drafts');
      }
    };

    $scope.update = function() {
      var draft = $scope.draft;
      if (!draft.updated) {
        draft.updated = [];
      }
      draft.updated.push(new Date().getTime());

      draft.$update(function() {
        $location.path('drafts/' + draft._id);
      });
    };

    $scope.find = function() {
      Drafts.query(function(drafts) {
        $scope.drafts = drafts;
      });
    };

    $scope.findOne = function() {
      Drafts.get({
        draftId: $routeParams.draftId
      }, function(draft) {
        $scope.draft = draft;
        var turnsList = [];

        for (var i = 1; i <= 30; i++) {
          turnsList.push($scope.draft.turns[i]);
        }
        $scope.turnsList = turnsList;
      });
    };

    $scope.findCards = function() {
      Cards.query(function(cards) {
        $scope.cards = cards;
      });
    };

    $scope.selectCard = function(card) {
      $scope.selectedCard = card;
    }

    $scope.nextStep = function() {
      updateTurnsDict();

      if ($scope.currentTurn < 30) {
        $scope.currentTurn += 1;
        
        setCurrentTurn();
      }
    };

    $scope.prevStep = function() {
      updateTurnsDict();

      if ($scope.currentTurn > 1) {
        $scope.currentTurn -= 1;
        setCurrentTurn();
      }
    };

    $scope.isFirstTurn = function() {
      return $scope.currentTurn === 1;
    }

    $scope.isLastTurn = function() {
      return $scope.currentTurn === 30;
    }

    $scope.chooseHeroClass = function(heroClass) {
      $scope.chosenHeroClass = heroClass;
    }

    function updateTurnsDict() {
      $scope.turns[$scope.currentTurn] = {
        card1: $scope.card1,
        card2: $scope.card2,
        card3: $scope.card3,
        selectedCard: $scope.selectedCard
      };
    };

    function setCurrentTurn() {
      if ($scope.turns[$scope.currentTurn]) {
        var cards = $scope.turns[$scope.currentTurn];
        $scope.card1 = cards.card1;
        $scope.card2 = cards.card2;
        $scope.card3 = cards.card3;
        $scope.selectedCard = cards.selectedCard;
      } else {
        resetCards();
      }
    }

    function resetCards() {
      $scope.card1 = "";
      $scope.card2 = "";
      $scope.card3 = "";
      $scope.selectedCard = null;
    };
  }
]);
