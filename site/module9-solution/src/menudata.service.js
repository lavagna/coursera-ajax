
(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// Service function
MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {

    // Wipe out array
    // var categories = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    })
    
    // .then(function (result) {

    //     // categories = result.data;
    //     return categories;
    // });

  }; // end getAllCategories
}

// MenuDataService.$inject = ['$http', 'ApiBasePath'];
// function MenuDataService($http, ApiBasePath) {

//     var service = this;

//     // list of categories
//     var categories = [];

//     // list of items
//     var items = [];

//     // Return all categories using the $http service
//     service.getAllCategories = function () {

//         categories = $http({
//             method: "GET",
//             url: (ApiBasePath + "/categories.json")    
//         });
//         console.log("categories returned =" + categories);
//         return categories;
//     }

//     // Append category shortname to url
//     service.getItemsForCategory = function (categoryShortName) {

//         items = $http({
//             method: "GET",
//             url: (ApiBasePath + "/menu_items.json"),
//             params: {
//                 category: categoryShortName
//             }
//         });

//         return items;
//     }
// }

})();





