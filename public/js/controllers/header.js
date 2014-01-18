'use strict';

angular.module('arenahelper.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Articles',
        'link': 'articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create'
    },
    {
        'title': 'Create new card',
        'link': 'cards/create'
    }];
    
    $scope.isCollapsed = false;
}]);
