var app = angular.module('campoUnido.users', []);

// provee specific user data or a list de todos los (all) users
app.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){
	var usersRef = new Firebase(FirebaseUrl+'users');
	var users = $firebaseArray(usersRef);

	var Users = {
		// nos permite obtener el perfil de un usurio especifico
		getProfile: function(uid){
			return $firebaseObject(usersRef.child(uid));
		},
		// helper function que retorna el displayName del usuario con el uid
		getDisplayName: function(uid){
			return users.$gerRecord(uid).displayName;
		}, 
		getGravatar: function(uid){
			return '//www.gravatar.com/avatar/'+users.$getRecord(uid).emailHash;
		},
		all: users
	};

	return Users;
});