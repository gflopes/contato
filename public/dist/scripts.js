angular.module('agenda', ['ngRoute']);
angular.module('agenda').controller("contatoCtrl", function($scope, $routeParams, $http){
	$scope.contato = {};
	$scope.message = {};

	$scope.salvar = function(contato){
		$http.post('/contatos', contato).success(success).error(error);
	};

	var success = function(data){
		$scope.message.text = 'Contato gravador com sucesso';
		$scope.message.class = 'alert alert-success';
		delete $scope.contato;
	};

	var error = function(error){
		$scope.message.text = error;
		$scope.message.class = 'alert alert-danger';
	};

	var init = function(){
		if($routeParams.id){
			var id = $routeParams.id;
			$http.get('/contatos/' + id).success(function(data){
				$scope.contato = data;
			}).error(error);
		}
	};

	init();
});
angular.module('agenda').controller("contatosCtrl", function($scope, $http){
	$scope.title = 'Contatos';

	$scope.contatos = [];
	$scope.message = {};

	$scope.remover = function(contato){
		$http.delete('contatos/' + contato.id).success(function(data){
			$scope.message.text = data;
			carregarContatos();
		}).error(function(error){
			console.error(error);
		});
	};

	var carregarContatos = function(){
		$http.get('/contatos').then(success, error);
	};

	var success = function(success){
		$scope.contatos = success.data;
	};

	var error = function(error){
		console.log(error);
	};

	carregarContatos();
});
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