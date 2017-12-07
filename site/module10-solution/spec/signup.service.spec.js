describe('signup', function () {
    
      var signup;
      var $httpBackend;
      var ApiBasePath;
      var shortName = 'L13';
    
      beforeEach(function () {

        // Load module
        module('public');
    
        inject(function ($injector) {
          signup = $injector.get('SignUpService');
          $httpBackend = $injector.get('$httpBackend');
          ApiBasePath = $injector.get('ApiPath');
        });
      });
    
      it('should verify menu item exists', function() {
        $httpBackend.whenGET(ApiBasePath + '/menu_items/' + shortName + '.json').respond(true);
        signup.verifyMenuItemExists(shortName).then(function(response) {
          expect(response).toEqual(true);
        });
        $httpBackend.flush();
      });
    
    });
    