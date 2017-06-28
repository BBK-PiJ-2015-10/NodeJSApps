
	var myApp = angular.module('myApp',[]);

	myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
		
			console.log("Hellow World from controller updated");
		
			
			var refresh = function() {
				$http.get('/contactlist').then(function(response){
					console.log("I got the data I requested");
					$scope.contactlist = response.data;
					$scope.contact = null;
				}, function (error){
					console.log("This application has produced an error");
				});
			};
			
			refresh();
			
			$scope.addContact = function(){
				console.log($scope.contact);
				$http.post('/contactlist',$scope.contact).then(function(response){
					console.log(response);
				},function(error){
					console.log("An error generated from add contact method");
				});
				refresh();
			};
			
			$scope.remove = function(id){
				console.log(id);
				//Send the http request to the server and ensure it is received
				$http.delete('/contactlist/' +id).then(function(response){
					refresh();
				},function(error){
					console.log("Error from remove function");
				});	
			};
			
			$scope.edit = function(id){
				console.log(id);
				$http.get('/contactlist/' +id).then(function(response){
					$scope.contact = response.data},function(error){
						console.log("Error from edit function");
					}
				);
			};
			
			
			$scope.update = function(){
				console.log($scope.contact._id);
				$http.put('/contactlist/' +$scope.contact._id, $scope.contact).then(function(response){
						refresh();
					},function(error){
						console.log("Error from update function");
					});		
			};
			
			
			
			$scope.deselect = function(){
				$scope.contact = null;
			};
				
		
			
		}
		
	]);
	
	

