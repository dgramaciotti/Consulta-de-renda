const express = require('express')
const app = express()
const request = require('request');
//setando para o node seja capaz de ler json diretamente
app.use(express.json())
//setando o cabeçalho CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//Configurando inicialmente o server
app.get('/api/consulta',(req,res) => {
	res.send('Server side da APP')
})

app.post('/api/consulta', function(req,res){
	let aux = req.body.renda / req.body.numDependentes
	var retorno = {
		nome: req.body.nome,
		rendaperCapita:aux
	}
	//como a api dos correios nao funciona, foi optado fazer o request por outra api
	request('https://api.postmon.com.br/v1/cep/'+req.body.cep,(error, response, body) => {
	    if (!error && response.statusCode == 200) {
	      retorno.endereco = JSON.parse(body)
	    }
	    res.send(retorno)
	})
})

app.listen(3000,() => console.log('server ativo na porta 3000...'))