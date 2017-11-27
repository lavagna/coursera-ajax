(function () {
'use strict';

angular.module('data')
.component('categoriesList', {
    templateUrl: 'src/templates/categories.template.html',
    bindings: {
        items: '<'
    }
});

})();