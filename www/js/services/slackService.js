angular.module('waitress')
  .factory('slackService', slackService);

slackService.$inject = ['$http', '$q', '$httpParamSerializerJQLike',
 'SERVER_LINK'];

/**
* Controller That takes care of the slackservice
@param {service} $http, $http service
@param {service} $q,
@param {service} $httpParamSerializerJQLike,
@param {service} SERVER_LINK,
@return {void}
*/
function slackService($http, $q, $httpParamSerializerJQLike, SERVER_LINK) {
/**
* Utility method to retrive data from url
@param {string} url, The input url to get data from
@param {object} data, The parameteer passed in from the calling function
@param {service} midday resolved service from ui-router
@return {promise} deffered.promise a promise funciton for the aysnchronous task
*/
  function getData(url, data) {
    var deffered = $q.defer();
    $http({
      method: 'POST',
      url: url,
      data: $httpParamSerializerJQLike(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(result) {
      deffered.resolve(result);
    }, function(resp) {
      deffered.reject(resp);
    });

    return deffered.promise;
  }
  var getSlackId = function(id) {
    return getData(SERVER_LINK + '/users/' + id + '/retrieve-secure/', {
      passphrase: 'andela2016'});
  };
  var tap = function(slackUserId) {
    console.log(slackUserId);
    console.log(SERVER_LINK, 'server link');
    return getData(SERVER_LINK + '/users/nfctap/', {
      slackUserId: slackUserId
    });
  };

  return {
    getSlackId: getSlackId,
    tap: tap
  };
}
