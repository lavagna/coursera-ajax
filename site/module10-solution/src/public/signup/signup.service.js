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

    service.saveMyInfo = function (firstname, lastname, email, phone) {
        service.myInformation.firstname = firstname;
        service.myInformation.lastname = lastname;
        service.myInformation.email = email;
        service.myInformation.phone = phone;
    }

    service.saveShortName = function (shortName) {
        service.myInformation.menuShortName = shortName;
        service.signedUp = true;
    }

    service.testShortName = function (shortName) {
        return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response) {
            return response.data;
          });
    }

    service.isSignedUp = function() {
        return service.signedUp;
    }

}


})();
