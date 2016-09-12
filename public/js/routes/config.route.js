angular.module('agenda').config(function($routeProvider){
	$routeProvider.when('/contatos', {
		templateUrl: 'partials/contatos.html',
		controller: 'contatosCtrl'
	});

	$routeProvider.when('/contato', {
		templateUrl: 'partials/contato.html',
		controller: 'contatoCtrl'
	});

	$routeProvider.when('/contato/:id', {
		templateUrl: 'partials/contato.html',
		controller: 'contatoCtrl'
	});

	$routeProvider.otherwise({redirectTo: '/contatos'});
});