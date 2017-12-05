(function() {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

SignUpService.$inject = ['$http', 'ApiPath'];
function SignUpService($http, ApiPath) {
    var service = this;

    service.signedUp = false;

    // My Info
    service.myInformation  = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '' ,
      menuShortName: '',
      faveMenuTitle: '',
      faveMenuDescription: '',
    };

    // Save registration data
    service.saveMyInfo = function (firstname, lastname, email, phone) {
        service.myInformation.firstname = firstname;
        service.myInformation.lastname = lastname;
        service.myInformation.email = email;
        service.myInformation.phone = phone;
    }

    // Save short name
    service.saveShortName = function (shortName) {
        service.myInformation.menuShortName = shortName;
        service.signedUp = true;
    }

    // Get menu item for a given short name. Save this in the service as the favorite
    service.getMenuItem = function (shortName) {
        return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response) {
            service.myInformation.menuShortName = shortName;
            service.myInformation.faveMenuTitle = response.data.name;
            service.myInformation.faveMenuDescription = response.data.description;

            service.signedUp = true;
            return response.data;
          });
    }

    // Return whether or not user is already registered
    service.isSignedUp = function() {
        return service.signedUp;
    }

    // Return registered data
    service.getMyInfo = function() {
        return service.myInformation;
    }

    service.saveFavoriteMenuItem = function(response) {
        service.myInformation.faveMenuTitle = response.name;
        service.myInformation.faveMenuDescription = response.description;
        // service.myInformation.faveMenuImage = response.
    }
    // // Get detail information about an item based on short name
    // service.getItemInfo = function(shortName) {

    // }
}


})();
