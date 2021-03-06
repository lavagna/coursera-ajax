
(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// Service functions
MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

    var items = [];

    // Returns all categories
    service.getAllCategories = function() {
       
        items = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        });

        return items;

    } // end getAllCategories
        
    // Returns items for a category. Appends category shortname to url
    service.getItemsForCategory = function (categoryShortName) {    

        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: categoryShortName
            }
        });
        
    } // end getAllCategories
}

})();





