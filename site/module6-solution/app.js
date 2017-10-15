(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.lunchItems = "";
  $scope.message = "";
  
  $scope.displayMessage = function () {

    if ($scope.lunchItems == "") {
      $scope.message = "Please enter data first";      
    } else {

      // split string by comma
      var arrayOfLunchItems = $scope.lunchItems.split(',');

      // num items including empty content
      var numLunchItems = arrayOfLunchItems.length;      

      // dis-count empty contents
      for (var i=0; i<arrayOfLunchItems.length; i++) {
        var lunchItem = arrayOfLunchItems[i].trim();
        if (!lunchItem || lunchItem.length === 0) {
          numLunchItems--;
        }
      }
      
      // store message in global scope
      if (numLunchItems == 0) {
        $scope.message = "Please enter data first"; 
      } else if (numLunchItems > 0 && numLunchItems <=3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }

  };

});


})();
