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
    
      // .state('categoriesList.itemDetail', {
      .state('itemDetail', {
        url: '/item-detail/{shortName}',
        templateUrl: 'src/templates/main-items.template.html',
        controller: "ItemDetailController as itemDetail",
        // wait for categoryitems to get resolved before going to this state
        resolve: {
          categoryItems: ['$stateParams', 'MenuDataService', 
            function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.shortName);
          }]
        }
      });
    
    };
    
    })();
    