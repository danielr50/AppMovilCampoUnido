var app = angular.module("campoUnido.auth", []);

app.factory("Auth", function($firebaseAuth){

	var ref = new Firebase("https://campo-unido.firebaseio.com/");
	var auth = $firebaseAuth(ref);

	return auth;
});

	