var myApp = angular.module('myApp',[
    'ngRoute'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/usuarios',{
        templateUrl: 'views/usuario/usuarios.html',
        controller: 'contUsuarios'
      })
      .when('/projetos',{
        templateUrl: 'views/projeto/projetos.html',
        controller: 'contProjetos'
      })
      .otherwise({redirectTo: '/'});
}]);

/* BEGIN: Controller de Usuarios */
myApp.controller('contUsuarios',['$scope','$http','$filter',function ($scope,$http,$filter) {
  $http.get("http://localhost:8080/service/usuario")
      .success(function(response) {$scope.usuarios = response;});

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;
  $scope.showFormUser = false;
  $scope.infoTitulo = '';
  $scope.infoMsg = '';
  $scope.alertaCadastro = false;
  $scope.erroCadastro = false;

  $scope.editUser = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    if (id == 'new') {
      $scope.showFormUser = true;
      $scope.edit = true;
      $scope.incomplete = false;
      $scope.id = '';
      $scope.usuario = '';
      $scope.email = '';
      $scope.senha = '';
      $scope.dataCriacao = '';
    } else if(id == 'cancel') {
      $scope.showFormUser = false;
      $scope.edit = true;
      $scope.incomplete = true;
      $scope.id = '';
      $scope.usuario = '';
      $scope.email = '';
      $scope.senha = '';
      $scope.dataCriacao = '';
    } else {
      $scope.showFormUser = true;
      $scope.edit = false;
      $scope.incomplete = false;
      $scope.id = $scope.usuarios[id].id;
      $scope.usuario = $scope.usuarios[id].usuario;
      $scope.email = $scope.usuarios[id].email;
      $scope.senha = $scope.usuarios[id].senha;
      $scope.dataCriacao = $filter('date')($scope.usuarios[id].dataCriacao, 'dd/MM/yyyy HH:mm:ss')

    }
  };

  $scope.saveUser = function() {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    var dataObj = {
      usuario : $scope.usuario,
      email : $scope.email,
      senha : $scope.senha,
      dataCriacao: new Date()
    };

    if($scope.id != '') {
      dataObj.id = $scope.id;
      $scope.infoMsg = 'Registro alterado com sucesso.';
    } else {
      $scope.infoMsg = 'Registro incluido com sucesso.';
    }

    var res = $http.post('http://localhost:8080/service/usuario', dataObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get("http://localhost:8080/service/usuario")
          .success(function(response) {$scope.usuarios = response;});
      $scope.showFormUser = false;
      $scope.infoTitulo = 'Sucesso!';
      $scope.alertaCadastro = true;
    });
    res.error(function(data, status, headers, config) {
      $scope.infoTitulo = 'Erro Fatal!';
      $scope.infoMsg = 'Essa operação falhou, verifique os problemas e tente novamente.';
      $scope.erroCadastro = true;
      console.log( "failure message: " + JSON.stringify({data: data}));
    });

  }

  $scope.deleteUser = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;
    var dataObj = {
      data: id,
      headers: {'Content-Type': 'application/json'}
    };

    var res = $http.delete('http://localhost:8080/service/usuario', dataObj);


    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get("http://localhost:8080/service/usuario")
          .success(function(response) {$scope.usuarios = response;});
      $scope.showFormUser = false;
      $scope.infoTitulo = 'Sucesso!';
      $scope.infoMsg = 'Registro removido com sucesso.';
      $scope.alertaCadastro = true;
    });
    res.error(function(data, status, headers, config) {
      $scope.infoTitulo = 'Erro Fatal!';
      $scope.infoMsg = 'Essa operação falhou, verifique os problemas e tente novamente.';
      $scope.erroCadastro = true;
      console.log( "failure message: " + JSON.stringify({data: data}));
    });

  }

}])
/* END: Controller de Usuarios */

/* BEGIN: Controller de Projetos */
myApp.controller('contProjetos',['$scope','$http','$filter',function ($scope,$http,$filter) {
  $http.get("http://localhost:8080/service/projeto")
      .success(function(response) {$scope.projetos = response;});

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;
  $scope.showFormUser = false;

  $scope.editUser = function(id) {
    if (id == 'new') {
      $scope.showFormUser = true;
      $scope.edit = true;
      $scope.incomplete = false;
      $scope.id = '';
      $scope.projeto = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else if(id == 'cancel') {
      $scope.showFormUser = false;
      $scope.edit = true;
      $scope.incomplete = true;
      $scope.id = '';
      $scope.projeto = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else {
      $scope.showFormUser = true;
      $scope.edit = false;
      $scope.incomplete = false;
      $scope.id = $scope.projetos[id-1].id;
      $scope.projeto = $scope.projetos[id-1].projeto;
      $scope.idReferenciaExterna = $scope.projetos[id-1].idReferenciaExterna;
      $scope.dataCriacao = $filter('date')($scope.projetos[id-1].dataCriacao, 'dd/MM/yyyy HH:mm:ss')

    }
  };

  $scope.saveUser = function() {

    var dataObj = {
      projeto : $scope.projeto,
      idReferenciaExterna : $scope.idReferenciaExterna,
      dataCriacao: new Date()
    };

    var res = $http.post('http://localhost:8080/service/projeto', dataObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
    });
    res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}));
    });

  }

}])
/* END: Controller de Projetos */
