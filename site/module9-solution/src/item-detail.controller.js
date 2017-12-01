(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['categoryItems'];
function ItemDetailController(categoryItems) {

    var itemDetail = this;
    itemDetail.items = categoryItems.data.menu_items;

    // Test print items in the category
    for ( var i=0; i< itemDetail.items.length; i++) {
        console.log("NAME: " + itemDetail.items[i].name);
    }
}


})();
    