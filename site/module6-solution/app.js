(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController); 

  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope, $filter) {

    // initialize vars
    $scope.lunchItems = "";
    $scope.message = "";
    
    $scope.displayMessage = function () {

      // split string by comma
      var arrayOfLunchItems = $scope.lunchItems.split(',');

      // num items including empty content
      var numLunchItems = arrayOfLunchItems.length;      
  
      // dis-count empty contents : does NOT count empty item as an item
      for (var i=0; i<arrayOfLunchItems.length; i++) {
        var lunchItem = arrayOfLunchItems[i].trim();
        if (!lunchItem || lunchItem.length === 0) {
          numLunchItems--;
        }
      }
      
      // store message in global scope
      if (numLunchItems == 0) {
        $scope.message = "Please enter data first"; 
        $scope.messageStyle = {
          "color" : "red",
          "border" : "solid 1px red"
        }
      } else if (numLunchItems > 0 && numLunchItems <=3) {
        $scope.message = "Enjoy!";
        $scope.messageStyle = {
          "color" : "green",
          "border" : "solid 1px green"
        }
      } else {
        $scope.message = "Too much!";
        $scope.messageStyle = {
          "color" : "green",
          "border" : "solid 1px green"
        }
      }

    };
  }
})();
