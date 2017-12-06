(function() {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

SignUpService.$inject = ['$http', 'ApiPath', '$q', '$timeout'];
function SignUpService($http, ApiPath, $q, $timeout) {
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

    // Returns whether or not the short name passed is valid
    service.isValidShortName = function(shortName) {

        var deferred = $q.defer();

        var result = {
            message: ""
        };

        // $timeout(function () {
            // Check if short name is valid
            $http.get(ApiPath + '/menu_items/' + shortName + '.json')
                .then(function() {
                    deferred.resolve(result);
                })
                .catch( function(errorResponse) {
                    console.log("error message in Service::isValidShortName =" + errorResponse.message);
                    //Stay away from cookies, Yaakov!";
                    deferred.reject(result);
                })
        //   }, 1000);

        return deferred.promise;
    
        // service.isValid = false;
        // $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function() {
        //     service.isValid = true;
        // })
        // .catch(function (result) {
        //     service.isValid = false;
        //     service.error = "No such menu number exists";
        //     service.completed = false;
        //     return service.isValid;
            
        // })
        
        // return service.isValid;
    };
    service.checkUniqueValue = function (shortName) {
        // if (!id) id = 0;
        return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(
            function (results) {
                return results.data.status;
            });
    };

    // Return registered data
    service.getMyInfo = function() {
        return service.myInformation;
    }
    
    
}


})();
