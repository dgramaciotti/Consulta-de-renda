var app = angular.module("renda",[]);
angular.module("renda").controller("rendaCtrl",function ($scope,$http,$window){
	$scope.app = "renda"
	$scope.enviaReq = function (usuario){
		$http.post('http://localhost:3000/api/consulta',usuario).then((data) =>{
			localStorage.setItem("retorno",JSON.stringify(data))
			$window.location.href = "view/resultado.html"
		})
	}
});