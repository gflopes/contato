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