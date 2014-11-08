function customersController($scope,$http,$filter) {

    $http.get("http://localhost:8080/service/usuario")
        .success(function(response) {$scope.usuarios = response;});

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.showFormUser = false;

    $scope.editUser = function(id) {
        if (id == 'new') {
            $scope.showFormUser = true;
            $scope.edit = true;
            $scope.incomplete = true;
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
            $scope.id = $scope.usuarios[id-1].id;
            $scope.usuario = $scope.usuarios[id-1].usuario;
            $scope.email = $scope.usuarios[id-1].email;
            $scope.senha = $scope.usuarios[id-1].senha;
            $scope.dataCriacao = $filter('date')($scope.usuarios[id-1].dataCriacao, 'dd/MM/yyyy HH:mm:ss')

        }
    };

    //Não acessando length ao iniciar o programa e dá erro depois que corre campos para ????????
    //$scope.test = function() {
    //    if ($scope.edit && (!$scope.usuario.length ||
    //        !$scope.email.length ||
    //        !$scope.senha.length)) {
    //        $scope.incomplete = true;
    //    } else {
    //        $scope.incomplete = false;
    //    }
    //};
    //
    //$scope.$watch('usuario',function() {$scope.test();});
    //$scope.$watch('email',function() {$scope.test();});
    //$scope.$watch('senha', function() {$scope.test();});

    $scope.saveUser = function() {

        var dataObj = {
            usuario : $scope.usuario,
            email : $scope.email,
            senha : $scope.senha,
            dataCriacao: new Date()
        };

        var res = $http.post('http://localhost:8080/service/usuario', dataObj);
        res.success(function(data, status, headers, config) {
            $scope.message = data;
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    }


}
