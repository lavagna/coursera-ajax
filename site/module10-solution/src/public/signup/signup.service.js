(function() {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

function SignUpService() {
    var service = this;

    // My Info
     service.myInformation  = {
      username: '',
      email: '',
      phone: ''  
    };

    service.saveMyInfo = function (username, email, phone) {
        service.myInformation.username = username;
        service.myInformation.email = email;
        service.myInformation.phone = phone;

        console.log("Inside SERVICE  email = " + service.myInformation.email);
    }
}

})();
