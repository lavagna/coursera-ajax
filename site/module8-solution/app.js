(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('NarrowItDownFactory', NarrowItDownFactory)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItemsList', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html' //,
    // scope: {
    //   items: '<'//,
    //   // onRemove: '&'
    // },
    // controller: NarrowItDownDirectiveController,
    // controllerAs: 'list',
    // bindToController: true
  };
  
  return ddo;
}

function NarrowItDownDirectiveController() {
  var list = this;

  list.getFoundItemsFromDirective = function(searchText) {

    // Initialize variables
    list.errorMessage = "";
    list.found = [];

    var searchTextLocal = angular.lowercase(searchText);
    console.log("searchTextLoal = " + searchTextLocal);
  
    if (!searchTextLocal) {
      console.log("search text is empty!");
      list.errorMessage = "Nothing found!";
    } else {
    
      var promise = MenuSearchService.getMatchedMenuItems(searchTextLocal);

      promise.then(function (response) {
  
        list.found = response;
  
        if (list.found.length === 0) {
          console.log("found array is 0!");
          list.errorMessage = "Nothing found!";
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    } // end else

  }
  return list;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.found = [];
  
  list.getFoundItems = function(searchText) {

    // Initialize variables
    list.errorMessage = "";

    var searchTextLocal = angular.lowercase(searchText);
    console.log("searchTextLoal = " + searchTextLocal);
  
    if (!searchTextLocal) {
      console.log("search text is empty!");
      list.errorMessage = "Nothing found!";
    } else {
    
      var promise = MenuSearchService.getMatchedMenuItems(searchTextLocal);
      promise.then(function (response) {  
        console.log("Contoller: response = " + response);

        list.found = response;
  
        if (list.found.length === 0) {
          console.log("found array is 0!");
          list.errorMessage = "Nothing found!";
        }

        // return list.found;
      })
      .catch(function (error) {
        console.log(error);
      })
    } // end else

  };

  


}; // end controller

 

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {

      // process result and only keep items that match
      var foundItems = [];
  
      angular.forEach(result.data, function(value, key) {
        angular.forEach(value, function(value, key) {
          
          if ((value.description).indexOf(searchTerm) != -1) {
            foundItems.push(value);
          }
        });
      });
  
      console.log("INSIDE getMatchedMenuItems, foundItems = " + foundItems);
      // return processed items
      return foundItems;
    });

  };

}

function NarrowItDownFactory() {
  var factory = function() {
    return new NarrowItDownController();
  };
  return factory;
}

})();
