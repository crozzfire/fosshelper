'use strict';

describe('Controller: ScrapeCtrl', function () {

  // load the controller's module
  beforeEach(module('fosshelperApp'));

  var ScrapeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScrapeCtrl = $controller('ScrapeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
