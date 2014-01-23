'use strict';

angular.module('arenahelper', ['ngCookies', 'ngResource', 'ngRoute',
                               'ui.bootstrap', 'ui.route', 'ngAnimate', 'mgcrea.ngStrap',
                               'arenahelper.system', 'arenahelper.articles', 
                               'arenahelper.cards', 'arenahelper.drafts',
                               'arenahelper.filters']);

angular.module('arenahelper.system', []);
angular.module('arenahelper.articles', []);
angular.module('arenahelper.cards', []);
angular.module('arenahelper.drafts', []);
