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