/* eslint strict:0, func-names:0, no-use-before-define:0,
no-param-reassign:0, no-var:0 */
angular.module('waitress')
  .factory('MealSession', mealSessionService);

mealSessionService.$inject = ['$q', '$http', '$httpParamSerializerJQLike',
'$state', 'SERVER_LINK'];
/**
* Dialog Directive controller
@param {service} $q, handles the differed promise
@param {serivice} $http, handles the call to http server
@param {service} $httpParamSerializerJQLike, changes Params to serliazable objects
@param {service} $state, controls
@param {constant} SERVER_LINK, constant that contains the server link
@return {void}
*/
function mealSessionService($q, $http, $httpParamSerializerJQLike,
  $state, SERVER_LINK) {
  /**
  * Dialog Directive controller
  @param {string} url, designated server url
  @param {object} data, handles the call to http server
  @return {promise} promise object
  */
  function startService(url, data) {
    var deffered = $q.defer();
    $http({
      method: 'POST',
      url: SERVER_LINK + url,
      data: $httpParamSerializerJQLike(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(result) {
      if (result.data.status) {
        deffered.resolve(result);
      }
    })
    .catch(function(resp) {
      deffered.reject(resp);
    });
    return deffered.promise;
  }
  /**
  * Dialog Directive controller
  @param {string} url, designated server url
  @param {object} report, handles the call to http server
  @return {promise} promise object
  */
  function getData(url, report) {
    var deffered = $q.defer();
    $http({
      url: url,
      method: 'GET',
      params: report
    })
    .then(function(resp) {
      deffered.resolve(resp);
    }, function(err) {
      if (err.status === 0) {
        $state.go('error');
      }
    });

    return deffered.promise;
  }

  var report = function(report) {
    return getData(SERVER_LINK + '/reports/', report);
  };
  var getMidday = function() {
    // offlineDetectorService();
    return getData(SERVER_LINK + '/meal-sessions/');
  };
  return {
    start: startService,
    report: report,
    getMidday: getMidday
  };
}
