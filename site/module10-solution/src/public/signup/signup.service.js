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
      phone: '' ,
      menuShortName: ''
    };

    service.saveMyInfo = function (firstname, lastname, email, phone, menuShortName) {
        service.myInformation.firstname = firstname;
        service.myInformation.lastname = lastname;
        service.myInformation.email = email;
        service.myInformation.phone = phone;
        service.myInformation.menuShortName = menuShortName;

        // console.log("Inside SERVICE  email = " + service.myInformation.email);
    }
}

})();
