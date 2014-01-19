'use strict';

angular.module('arenahelper', ['ngCookies', 'ngResource', 'ngRoute',
                               'ui.bootstrap', 'ui.route', 'arenahelper.system',
                               'arenahelper.articles', 'arenahelper.cards', 'arenahelper.drafts']);

angular.module('arenahelper.system', []);
angular.module('arenahelper.articles', []);
angular.module('arenahelper.cards', []);
angular.module('arenahelper.drafts', []);
