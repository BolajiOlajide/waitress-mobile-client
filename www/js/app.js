angular.module('waitress', [
  'ionic',
  'ngCordova',
  'ionic-datepicker'
])
  .run(function($ionicPlatform, $rootScope, nfcService, $state) {
    // Handles State change to trigger the nfcService
    // ionic.Platform.fullScreen(); // should be unccommented whenever we need full screen
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParam, from) {
      if (from.name === 'dashboard.tap' || from.name === 'dashboard.nfc') {
        nfcService.remove();
      }
      if (to.name === 'dashboard.tap') {
        nfcService.init();
      }
      if (to.name === 'dashboard.nfc') {
        nfcService.init(true);
      }
      if ((from.name !== 'dashboard.login-usernames' && !from.requireAuth) &&
        to.requireAuth) {
        $state.go('dashboard.login-usernames');
      }
    });
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      // Commented out because this doesn't seems to be working when the apk is rendered
      // on a real divice.
    });
  })
  .config(function($stateProvider, $urlRouterProvider, $logProvider,
    $ionicConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $ionicConfigProvider.tabs.position('bottom');
    $logProvider.debugEnabled(true);
    $stateProvider
      .state('index', {
        url: '/',
        resolve: {
          midday: ['MealSession', function(MealSession) {
            return MealSession.getMidday()
              .then(function(result) {
                navigator.splashscreen && navigator.splashscreen.hide(); // eslint-disable-line no-unused-expressions
                return result;
              });
          }]
        },
        controller: 'sessionController',
        templateUrl: 'partials/session.html'
      })
      .state('dashboard', {
        abstract: true,
        url: '/dashboard',
        templateUrl: 'partials/dashboard.html',
        controller: 'dashboardController',
        controllerAs: 'dashboard'
      })
      .state('dashboard.tap', {
        url: '/dashboard/home',
        views: {
          'home-tab': {
            templateUrl: 'partials/tap.html'
          }
        }
      })
      .state('error', {
        url: '/error',
        templateUrl: 'partials/error.html'
      })
      .state('dashboard.nfc', {
        url: '/nfc',
        views: {
          'nfc-write': {
            templateUrl: 'partials/nfc-write.html'
          }
        }
      })
      .state('dashboard.report', {
        url: '/report',
        views: {
          'report-tab': {
            templateUrl: 'partials/report.html'
          }
        }
      })
      .state('dashboard.history', {
        url: '/history',
        views: {
          'history-tab': {
            templateUrl: 'partials/history.html'
          }
        }
      })
      .state('dashboard.report-custom', {
        url: '/report/weekly',
        views: {
          'report-tab': {
            controller: 'CustomReportController',
            templateUrl: 'partials/custom-report.html'
          }
        }

      })
      .state('dashboard.login-usernames', {
        url: '/login-usernames',
        cache: false,
        views: {
          'list-tab': {
            controller: 'LoginForUserNameController',
            templateUrl: 'partials/login-username.html'
          }
        }
      })
      .state('dashboard.alphabets', {
        url: '/list-names-by-alphabet',
        views: {
          'list-tab': {
            controller: 'ListAlphabetsController',
            templateUrl: 'partials/alphabets.html'
          }
        },
        requireAuth: true
      })
      .state('dashboard.usernames', {
        url: '/list/:character',
        cache: false,
        resolve: {
          names: ['User', '$stateParams', function(User, $stateParams) {
            return User.filter($stateParams.character)
              .then(function(result) {
                return result;
              });
          }]
        },
        views: {
          'list-tab': {
            controller: 'listController',
            templateUrl: 'partials/list-names.html'
          }
        },
        requireAuth: true
      })
      .state('dashboard.report-daily', {
        url: '/report/daily',
        cache: false,
        resolve: {
          dailyReports: ['MealSession', function(MealSession) {
            return MealSession.report()
              .then(function(result) {
                return result;
              });
          }]
        },
        views: {
          'report-tab': {
            templateUrl: 'partials/daily-report.html',
            controller: 'dailyReportController'
          }
        }

      });
  });
