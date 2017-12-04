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
      menuShortName: ''
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

    // Test short name
    service.testShortName = function (shortName) {
        return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response) {
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
}


})();
