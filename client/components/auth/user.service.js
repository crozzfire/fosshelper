'use strict';

angular.module('fosshelperApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      addExperience: {
        method: 'PUT',
        params: {
          controller:'experience'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
