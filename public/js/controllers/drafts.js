'use strict';

angular.module('arenahelper.drafts').controller('DraftsController', ['$scope', '$routeParams', '$location', 'Global', 'Drafts', function ($scope, $routeParams, $location, Global, Drafts) {
    $scope.global = Global;

    $scope.create = function() {
        var draft = new Drafts({
            title: this.title,
            content: this.content
        });
        draft.$save(function(response) {
            $location.path('drafts/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(draft) {
        if (draft) {
            draft.$remove();

            for (var i in $scope.drafts) {
                if ($scope.drafts[i] === draft) {
                    $scope.drafts.splice(i, 1);
                }
            }
        }
        else {
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
        });
    };
}]);
