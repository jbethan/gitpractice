angular.module('restaurants',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.restaurants = [];
    $scope.upcount = [];
    $scope.downcount = [];
    $scope.getAll = function() {
			return $http.get('/restaurants').success(function(data){
				angular.copy(data, $scope.restaurants);
			});
    };
    
    $scope.getAll();
    $scope.create = function(restaurant) {
			return $http.post('/restaurants', restaurant).success(function(data){
				$scope.restaurants.push(data);
			});
    };
    $scope.upCount = function() {
      console.log("In Upcount");
      angular.forEach($scope.restaurants, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.upcount.push(value);
        }
      });
    };
    $scope.upvote = function(restaurant) {
      return $http.put('/restaurants/' + restaurant._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          restaurant.upVotes += 1;
        });
    };
    $scope.downCount = function() {
      console.log("In Downcount");
      angular.forEach($scope.restaurants, function(value,key) {
        if(value.selected) {
          $scope.downvote(value);
          $scope.downcount.push(value);
        }
      });
    };
    $scope.downvote = function(restaurant) {
      return $http.put('/restaurants/' + restaurant._id + '/downvote')
        .success(function(data){
          console.log("downvote worked");
          restaurant.downVotes += 1;
        });
    };

    $scope.addRestaurant = function() {
      var newObj = {Name:$scope.name, Address:$scope.address, ImageURL:$scope.imageURL, upVotes:0, downVotes:0};
      $scope.create(newObj);
      $scope.name = '';
      $scope.address = '';
      $scope.imageURL = '';
    };

    $scope.incrementUpvotes = function(restaurant) {
      $scope.upvote(restaurant);
    };
    
    $scope.incrementDownvotes = function(restaurant) {
      $scope.downvote(restaurant);
    };
 
    $scope.delete = function(restaurant) {
      console.log("Deleting Name "+restaurant.Name+" ID "+restaurant._id);
      $http.delete('/restaurants/'+restaurant._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
