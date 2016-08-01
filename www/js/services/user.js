
angular.module('waitress')
  .service('User', User);

User.$inject = ['$http', '$q', 'slackService',
'$httpParamSerializerJQLike', 'SERVER_LINK'];

/**
* Controller That takes care of the slackservice
@param {service} $http,
@param {service} $q,
@param {service} slackService,
@param {service} $httpParamSerializerJQLike,
@param {constant} SERVER_LINK,
@return {void}
*/
function User($http, $q, slackService,
  $httpParamSerializerJQLike, SERVER_LINK) {
  var User = {};
  /**
  * Takes care of filtering the users
  @param {string} character to be used to filter the users,
  @return {promise} returns promise for the users
  */
  User.filter = function(character) {
    var deffered = $q.defer();
    if (!character) {
      return false;
    }
    var params = {
      filter: character
    };

    $http.get(SERVER_LINK + '/users/', {params: params})
    .then(function(res) {
      deffered.resolve(res.data);
    }, function(res) {
      deffered.reject(res);
    });
    return deffered.promise;
  };
  /**
  * Takes care of the tap with id
  @param {string} userId to be returend,
  @return {promise} returns promise of the users
  */
  User.tap = function(userId) {
    var deffered = $q.defer();

    slackService.getSlackId(userId).then(function(resp) {
      slackService.tap(resp.data.slack_id).then(function(res) {
        deffered.resolve(res.data);
      }, function(err) {
        deffered.reject(err);
      });
    }, function(err) {
      deffered.reject(err);
    });
    return deffered.promise;
  };
/**
* Takes care of the untap id
@param {string} userId to be returend,
@return {promise} returns promise
*/
  User.untap = function(userId) {
    var url = SERVER_LINK + '/users/' + userId + '/untap/';
    var deffered = $q.defer();
    var data = $httpParamSerializerJQLike({
      passphrase: 'andela2016'
    });
    $http({
      method: 'POST',
      url: url,
      data: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(res) {
      deffered.resolve(res.data);
    }, function(res) {
      deffered.reject(res);
    });
    return deffered.promise;
  };

  return User;
}
