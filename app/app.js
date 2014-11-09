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
      .when('/centroscusto',{
        templateUrl: 'views/centrocusto/centroscusto.html',
        controller: 'contCentrosCusto'
      })
      .when('/atividades',{
        templateUrl: 'views/atividade/atividades.html',
        controller: 'contAtividades'
      })
      .otherwise({redirectTo: '/'});
}]);

/* BEGIN: Controller de Usuarios */
myApp.controller('contUsuarios',['$scope','$http','$filter',function ($scope,$http,$filter) {
  $http.get("http://localhost:8080/service/usuario")
      .success(function(response) {$scope.usuarios = response;});

  $scope.edit = true;
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
      $scope.id = '';
      $scope.usuario = '';
      $scope.email = '';
      $scope.senha = '';
      $scope.dataCriacao = '';
    } else if(id == 'cancel') {
      $scope.showFormUser = false;
      $scope.edit = true;
      $scope.id = '';
      $scope.usuario = '';
      $scope.email = '';
      $scope.senha = '';
      $scope.dataCriacao = '';
    } else {
      $scope.showFormUser = true;
      $scope.edit = false;
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
  $scope.showFormCadastro = false;
  $scope.infoTitulo = '';
  $scope.infoMsg = '';
  $scope.alertaCadastro = false;
  $scope.erroCadastro = false;

  $scope.abrirForm = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    if (id == 'new') {
      $scope.showFormCadastro = true;
      $scope.edit = true;
      $scope.id = '';
      $scope.projeto = '';
      $scope.situacao = '';
      $scope.percentualAdicionalDesvioHora = '';
      $scope.usarDesvioHoraPadrao = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else if(id == 'cancel') {
      $scope.showFormCadastro = false;
      $scope.edit = true;
      $scope.id = '';
      $scope.projeto = '';
      $scope.situacao = '';
      $scope.idReferenciaExterna = '';
      $scope.percentualAdicionalDesvioHora = '';
      $scope.usarDesvioHoraPadrao = '';
      $scope.dataCriacao = '';
    } else {
      $scope.showFormCadastro = true;
      $scope.edit = false;
      $scope.id = $scope.projetos[id].id;
      $scope.projeto = $scope.projetos[id].projeto;
      $scope.situacao = $scope.projetos[id].situacao;
      $scope.idReferenciaExterna = $scope.projetos[id].idReferenciaExterna;
      $scope.percentualAdicionalDesvioHora = $scope.projetos[id].percentualAdicionalDesvioHora;
      $scope.usarDesvioHoraPadrao = $scope.projetos[id].usarDesvioHoraPadrao.toString();
      $scope.dataCriacao = $filter('date')($scope.projetos[id].dataCriacao, 'dd/MM/yyyy HH:mm:ss')

    }
  };

  $scope.salvarForm = function() {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    var dataObj = {
      projeto : $scope.projeto,
      situacao : $scope.situacao,
      idReferenciaExterna : $scope.idReferenciaExterna,
      dataCriacao: new Date(),
      percentualAdicionalDesvioHora: $scope.percentualAdicionalDesvioHora,
      usarDesvioHoraPadrao: $scope.usarDesvioHoraPadrao
    };

    if($scope.id != '') {
      dataObj.id = $scope.id;
      $scope.infoMsg = 'Registro alterado com sucesso.';
    } else {
      $scope.infoMsg = 'Registro incluido com sucesso.';
    }

    var res = $http.post('http://localhost:8080/service/projeto', dataObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get("http://localhost:8080/service/projeto")
          .success(function(response) {$scope.projetos = response;});
      $scope.showFormCadastro = false;
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

  $scope.removerRegistro = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;
    var dataObj = {
      data: id,
      headers: {'Content-Type': 'application/json'}
    };

    var res = $http.delete('http://localhost:8080/service/projeto', dataObj);


    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get("http://localhost:8080/service/projeto")
          .success(function(response) {$scope.projetos = response;});
      $scope.showFormCadastro = false;
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
/* END: Controller de Projetos */

/* BEGIN: Controller de Centros de Custo */
myApp.controller('contCentrosCusto',['$scope','$http','$filter',function ($scope,$http,$filter) {

  var url_servico = 'http://localhost:8080/service/centrocusto';

  $http.get(url_servico)
      .success(function(response) {$scope.centrosCusto = response;});

  $scope.edit = true;
  $scope.showFormCadastro = false;
  $scope.infoTitulo = '';
  $scope.infoMsg = '';
  $scope.alertaCadastro = false;
  $scope.erroCadastro = false;

  $scope.abrirForm = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    if (id == 'new') {
      $scope.showFormCadastro = true;
      $scope.edit = true;
      $scope.id = '';
      $scope.atividade = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else if(id == 'cancel') {
      $scope.showFormCadastro = false;
      $scope.edit = true;
      $scope.id = '';
      $scope.atividade = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else {
      $scope.showFormCadastro = true;
      $scope.edit = false;
      $scope.id = $scope.centrosCusto[id].id;
      $scope.atividade = $scope.centrosCusto[id].atividade;
      $scope.idReferenciaExterna = $scope.centrosCusto[id].idReferenciaExterna;
      $scope.dataCriacao = $filter('date')($scope.centrosCusto[id].dataCriacao, 'dd/MM/yyyy HH:mm:ss')

    }
  };

  $scope.salvarForm = function() {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    var dataObj = {
      atividade : $scope.atividade,
      situacao : $scope.situacao,
      idReferenciaExterna : $scope.idReferenciaExterna,
      dataCriacao: new Date()
    };

    if($scope.id != '') {
      dataObj.id = $scope.id;
      $scope.infoMsg = 'Registro alterado com sucesso.';
    } else {
      $scope.infoMsg = 'Registro incluido com sucesso.';
    }

    var res = $http.post(url_servico, dataObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get(url_servico)
          .success(function(response) {$scope.centrosCusto = response;});
      $scope.showFormCadastro = false;
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

  $scope.removerRegistro = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;
    var dataObj = {
      data: id,
      headers: {'Content-Type': 'application/json'}
    };

    var res = $http.delete(url_servico, dataObj);


    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get(url_servico)
          .success(function(response) {$scope.centrosCusto = response;});
      $scope.showFormCadastro = false;
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
/* END: Controller de Centros de Custo */

/* BEGIN: Controller de Atividades */
myApp.controller('contAtividades',['$scope','$http','$filter',function ($scope,$http,$filter) {

  var url_servico = 'http://localhost:8080/service/atividade';

  $http.get(url_servico)
      .success(function(response) {$scope.atividades = response;});

  $scope.edit = true;
  $scope.showFormCadastro = false;
  $scope.infoTitulo = '';
  $scope.infoMsg = '';
  $scope.alertaCadastro = false;
  $scope.erroCadastro = false;
  $scope.infoCadastro = false;

  $scope.exibirRegistro = function(id) {

    $scope.infoCadastro = true;
    $scope.showFormCadastro = false;

    $scope.atividade = $scope.atividades[id].atividade;
    $scope.projeto = $scope.atividades[id].projeto.projeto;
    $scope.situacaoAtividade = $scope.atividades[id].situacaoAtividade.situacaoAtividade;
    $scope.tipoAtividade = $scope.atividades[id].tipoAtividade.tipoAtividade;
    $scope.dataPrevista = $scope.atividades[id].dataPrevista;
    $scope.esforcoPrevisto = $scope.atividades[id].esforcoPrevisto;
    $scope.solicitante = $scope.atividades[id].solicitante;
    $scope.descricao = $scope.atividades[id].descricao;

  }

  $scope.abrirForm = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;
    $scope.infoCadastro = false;

    if (id == 'new') {
      $scope.showFormCadastro = true;
      $scope.edit = true;
      $scope.id = '';
      $scope.atividade = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else if(id == 'cancel') {
      $scope.showFormCadastro = false;
      $scope.edit = true;
      $scope.id = '';
      $scope.atividade = '';
      $scope.idReferenciaExterna = '';
      $scope.dataCriacao = '';
    } else {
      $scope.showFormCadastro = true;
      $scope.edit = false;
      $scope.id = $scope.atividades[id].id;
      $scope.atividade = $scope.atividades[id].atividade;
      $scope.idReferenciaExterna = $scope.atividades[id].idReferenciaExterna;
      $scope.dataCriacao = $filter('date')($scope.atividades[id].dataCriacao, 'dd/MM/yyyy HH:mm:ss')

    }
  };

  $scope.salvarForm = function() {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;

    var dataObj = {
      atividade : $scope.atividade,
      situacao : $scope.situacao,
      idReferenciaExterna : $scope.idReferenciaExterna,
      dataCriacao: new Date()
    };

    if($scope.id != '') {
      dataObj.id = $scope.id;
      $scope.infoMsg = 'Registro alterado com sucesso.';
    } else {
      $scope.infoMsg = 'Registro incluido com sucesso.';
    }

    var res = $http.post(url_servico, dataObj);
    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get(url_servico)
          .success(function(response) {$scope.atividades = response;});
      $scope.showFormCadastro = false;
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

  $scope.removerRegistro = function(id) {

    $scope.erroCadastro = false;
    $scope.alertaCadastro = false;
    var dataObj = {
      data: id,
      headers: {'Content-Type': 'application/json'}
    };

    var res = $http.delete(url_servico, dataObj);


    res.success(function(data, status, headers, config) {
      $scope.message = data;
      $http.get(url_servico)
          .success(function(response) {$scope.atividades = response;});
      $scope.showFormCadastro = false;
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
/* END: Controller de Atividades */
