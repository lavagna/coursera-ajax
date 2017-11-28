(function () {
'use strict';

angular.module('data')
.component('categoryItems', {
    templateUrl: 'src/templates/item-detail.template.html',
    bindings: {
        items: '<'
    }
});

})();