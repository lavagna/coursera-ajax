(function () {
'use strict';

// angular.module('MenuApp')
angular.module('data')
.component('categoriesList', {
    templateUrl: 'src/templates/categories.template.html',
    bindings: {
        items: '<'
    }
    // controller: 'MainMenuAppController'
});

})();