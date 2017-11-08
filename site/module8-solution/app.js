(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItemsList', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',

    // Isolate scope with directive property called items,
    // bound to items (items attribute in index.html)
    scope: {
      items: '<',
      title: '@title',  // can be interpolated inside double curly braces in directive template
      onRemove: '&'
    },

    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };
  
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.getFoundItems = function() {

    // Initialize variables
    list.errorMessage = "";
    list.items = [];  
    list.title = "List of Found Items (" + list.items.length + ") items";

    // Local variable for lowercased search text
    var searchTextLocal = angular.lowercase(list.searchText);
  
    if (!searchTextLocal) {
      list.errorMessage = "Nothing found!";
    } else {
   
      // Call the service function for list of matched items
      var promise = MenuSearchService.getMatchedMenuItems(searchTextLocal);
      promise.then(function (response) {  

        list.items = response;
        
        if (list.items.length === 0) {
          console.log("found array is 0!");
          list.errorMessage = "Nothing found!";
        }
        list.title = "List of Found Items (" + list.items.length + ") items";        
      })
      .catch(function (error) {
        console.log(error);
      })
    } // end else
  }; // end getFoundItems()

  list.removeItem = function (itemIndex) {
    list.items.splice(itemIndex, 1);
    list.title = "List of Found Items (" + list.items.length + ") items";
  };
}; // end controller

// Service function
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    // Wipe out array
    var foundItems = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {

      // process result and only keep items that match
      angular.forEach(result.data, function(value, key) {
        angular.forEach(value, function(value, key) {
          
          if ((value.description).indexOf(searchTerm) != -1) {
            foundItems.push(value);
          }
        });
      });
  
      // return processed items
      return foundItems;
    });
  }; // end getMatchedMenuItems
}
})();
