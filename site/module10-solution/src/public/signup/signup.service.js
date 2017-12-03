(function() {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

function SignUpService() {
    var service = this;

    // My Info
     service.myInformation  = {
      firstname: '',
      lastname: '',
      email: '',
      phone: ''  
    };

    service.saveMyInfo = function (firstname, lastname, email, phone) {
        service.myInformation.firstname = firstname;
        service.myInformation.lastname = lastname;
        service.myInformation.email = email;
        service.myInformation.phone = phone;

        // console.log("Inside SERVICE  email = " + service.myInformation.email);
    }
}

})();
