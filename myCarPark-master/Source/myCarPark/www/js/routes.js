angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.myCarPark', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myCarPark.html',
        controller: 'myCarParkCtrl'
      }
    }
  })

  .state('menu.reserveBooking', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reserveBooking.html',
        controller: 'reserveBookingCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('myCarPark2', {
    url: '/page4',
    templateUrl: 'templates/myCarPark2.html',
    controller: 'myCarPark2Ctrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.myBooking', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myBooking.html',
        controller: 'myBookingCtrl'
      }
    }
  })
  
    .state('menu.parkingTicket', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/parkingTicket.html',
        controller: 'parkingTicketCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page4')

  

});