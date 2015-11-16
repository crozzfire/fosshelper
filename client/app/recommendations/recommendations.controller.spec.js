'use strict';

describe('Controller: RecommendationsCtrl', function () {

  // load the controller's module
  beforeEach(module('fosshelperApp'));

  var RecommendationsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecommendationsCtrl = $controller('RecommendationsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
