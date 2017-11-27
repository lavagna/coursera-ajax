(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['$stateParams', 'MenuDataService', 'items'];
function ItemDetailController($stateParams, MenuDataService, items) {
    var itemDetail = this;

    // Get the current item
    var item = items.data[$stateParams.itemId];

    // Get its shortname
    var shortName = item.short_name;

    // Get list of items
    var listOfItems = [];
    listOfItems = MenuDataService.getItemsForCategory(shortName);

    console.log("list of items = " + listOfItems.data);
    itemDetail.allItems = listOfItems.data;

    // itemDetail.name = item.name;
    // itemDetail.description = item.description;

    // console.log("itemDetail.name = " + itemDetail.name);

}


})();
    