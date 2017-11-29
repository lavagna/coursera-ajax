(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);

// categoryItems is defined inside the resolve of router
ItemDetailController.$inject = ['categoryItems'];
function ItemDetailController(categoryItems) {
    var itemDetail = this;
    itemDetail.allItems = categoryItems.data;
    console.log("itemDetail.allItems = " + itemDetail.allItems);
    
    // Get the current item
    // var item = items.data[$stateParams.itemId];

    // // Get its shortname
    // var shortName = item.short_name;

    // // Get list of items
    // var listOfItems = [];
    // listOfItems = MenuDataService.getItemsForCategory(shortName);

    // console.log("list of items = " + listOfItems.data);
    // itemDetail.allItems = listOfItems.data;

    // itemDetail.name = item.name;
    // itemDetail.description = item.description;

    // console.log("itemDetail.name = " + itemDetail.name);

}


})();
    