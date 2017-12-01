(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
      })
    
      .state('categoriesList', {
        url: '/categories',
        templateUrl: 'src/templates/main-categories.template.html',
        controller: 'MainMenuAppController as categoriesList',
        // wait for items to get resolved before going to this state
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
    
      .state('categoriesList.itemDetail', {
        url: '/item-detail/{itemId}',
        templateUrl: 'src/templates/item-detail.template.html',
        controller: "ItemDetailController as itemDetail",

        // Resolve now makes a call to service func
         resolve: {
          categoryItems: ['$stateParams', 'MenuDataService', 
            function ($stateParams, MenuDataService) {
              return MenuDataService.getAllCategories()
                .then(function(categories) {
                  var category = categories.data[$stateParams.itemId];
                  console.log("Inside resolve,shortname = " + category.short_name);
                  return MenuDataService.getItemsForCategory(category.short_name);
                });
            }]
        }
      });
    
    };
    
    })();
    