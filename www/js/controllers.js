angular.module('campoUnido.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, Auth, FirebaseUrl) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // aqui va codigo de login
    var authCtrl = $scope;
    authCtrl.user = {
      email: '',
      password: ''
    };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    authCtrl: authCtrl
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    console.log("entro al modal");
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('funcion doLogin le pasa authCtrl.user', authCtrl.user);

    // $state.go("app.registro");
    Auth.$authWithPassword(authCtrl.user).then(function(auth){
      $state.go("app.playlists");
      console.log("exito al ingresar");

      authCtrl.user = {
        email: '',
        password: ''
      };  

      $scope.closeLogin();

    }, function(error){
      $scope.error = error;
      console.log("error al ingresar");
    });
  
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.irRegistro = function(){
    $scope.closeLogin();
    $state.go("app.registro");
  };

  Auth.$onAuth(function(authData){
    if(authData === null){
      console.log("not logged in yet");
    } else{
      console.log("loggin as :", authData.uid);
      console.log('el email del usuario es '+ authData.password.email);
    }
    $scope.authData = authData;
  });

})
// fin controller principal AppCtrl



.controller('PlaylistsCtrl', function($scope, FirebaseUrl, $firebaseArray) {


  var CategoriasPrincipalesRef = new Firebase(FirebaseUrl+'categoriaPrincipal');
  $scope.escupeCategoriasPrincipales = $firebaseArray(CategoriasPrincipalesRef); 

})
// fin controller PlaylistsCtrl




.controller('PlaylistCtrl', function($scope, $stateParams) {

})
// fin controller Playlist



.controller("AuthCtrl", function($scope, Auth, $state, FirebaseUrl, $firebaseArray){
  var authCtrl = this;

  authCtrl.user = {
    email:'',
    password: ''
  };

  // function de login (ingresar)
  authCtrl.login = function(){
    Auth.$authWithPassword(authCtrl.user).then(function(auth){
      // $state.go("search");

    }, function(error){
      authCtrl.error = error;
    });
  };

  // function de register (registro)
  authCtrl.register = function(){
    Auth.$createUser(authCtrl.user).then(function(user){
      authCtrl.login();
      console.log("entro a registro abajo");
      console.log(authCtrl.user.dedicacion);
      // crear nodo en firebase
      var nodoRef = new Firebase(FirebaseUrl+'categorias');
      var enviarDedicacion = authCtrl.user.dedicacion;
      nodoRef.push(enviarDedicacion);
      // vuelve al estado principal
      $state.go('app.playlists');
    }, function(error){
      authCtrl.error = error;
    });
  };



})
// fin controller Auth Ctrl

.controller('entraCategoriaCtrl', function($scope, $stateParams){
  var id = $stateParams.id;
  console.log(id);
});




