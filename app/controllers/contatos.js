module.exports = function(app){
	var controller = {};
	var contatos = [
		{id: 1, nome: 'contato1', email: 'contato1@email.com'},
		{id: 2, nome: 'contato2', email: 'contato2@email.com'},
		{id: 3, nome: 'contato3', email: 'contato3@email.com'},
		{id: 4, nome: 'contato4', email: 'contato4@email.com'},
		{id: 5, nome: 'contato5', email: 'contato5@email.com'},
		{id: 6, nome: 'contato6', email: 'contato6@email.com'}
	];

	var	id = 6;

	controller.listarContatos = function(req, res, next){
		res.json(contatos);
	}

	controller.obterContato = function(req, res, next){
		var idContato = req.params.id;

		var contato = contatos.filter(function(contato){
			return idContato == contato.id;
		})[0];

		contato ? res.json(contato) : res.status(404).send('Contato não localizado');
	}

	controller.removerContato = function(req, res, next){
		var idContato = req.params.id;

		contatos = contatos.filter(function(contato){
			return idContato != contato.id;
		});

		res.send('Contato removido com sucesso').end();
	}

	controller.salvarContato = function(req, res, next){
		var contato = req.body;

		contato = contato.id ?
			atualizar(contato) :
			adicionar(contato);

		res.json(contato);
	}

	var atualizar = function(contatoAlterar){
		contatos = contatos.map(function(contato){
			if(contato.id == contatoAlterar.id){
				contato = contatoAlterar;
			}
			return contato;
		});

		return contatoAlterar;
	}

	var adicionar = function(contatoNovo){
		contatoNovo.id = id++;
		contatos.push(contatoNovo);

		return contatoNovo;
	}

	return controller;
}