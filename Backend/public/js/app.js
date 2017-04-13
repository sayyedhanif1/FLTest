angular.module('app', ['ngRoute'])
      //---------------
      // Services
      //---------------
      .factory('Templates', ['$http', function($http){
        return {
          get:function() {
              var request = $http.get('/templates');
              return request;
          }
        }


      }])

      .factory('Template', ['$http', function($http){
        return function(id){
          return $http({
            method: 'GET',
            url: '/templates/'+ id
          });
        }
      }])

      .factory('TemplateDel', ['$http', function($http){
        return function(id){
          return $http({
            method: 'DELETE',
            url: '/templates/'+ id
          });
        }
      }])

      .factory('TemplateSave', ['$http', function($http){
        return function(body, id){
          if( id){
            return $http({
              method: 'PUT',
              url: '/templates/' + id,
              data : body
            });
          }else{
            return $http({
            method: 'POST',
              url: '/templates',
              data : body
            });
          }
          
        }
      }])
     
      //---------------
      // Controllers
      //---------------
      
      .controller('TemplateListCtrl', ['$scope', '$route', 'TemplateDel', 'Templates', function ($scope, $route, TemplateDel, Templates) {
        // $scope.students = Students;
        Templates.get().success(function(data){
          console.log(data);
          $scope.templates = data;
          
        }).error(function(data, status){
          console.log(data, status);
          $scope.templates = [];
        });

        $scope.deleteTmplate = function(id){
          TemplateDel(id)
          .success(function(data){
            $('#myModal-'+id).modal('hide')
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $route.reload();
          }).error(function(data, status){
            console.log(data, status);
            $scope.template = null;
          });
        }
      }])

      .controller('TemplateDetCtrl', ['$scope', '$routeParams', 'Template', function ($scope, $routeParams, Template) {
        Template($routeParams.id)
        .success(function(data){
          $scope.template = data;
        }).error(function(data, status){
          console.log(data, status);
          $scope.template = null;
        });
      }])

      .controller('TemplateDelCtrl', ['$scope', '$routeParams', '$location', 'TemplateDel', function ($scope, $routeParams, $location, TemplateDel) {
        console.log('StudentDelCtrl called..... ')
        TemplateDel($routeParams.id)
        .success(function(data){
          $location.path( "/index" );
        }).error(function(data, status){
          console.log(data, status);
          $scope.template = null;
        });
      }])

      .controller('TemplateCreateEditCtrl', ['$scope', '$routeParams', '$location', 'Template', 'TemplateSave' ,function ($scope, $routeParams, $location, Template, TemplateSave) {
        if( $routeParams.id){
          $('#btn_submit').val('Edit')
          Template($routeParams.id)
          .success(function(data){
            $scope.template = data;
          }).error(function(data, status){
            console.log(data, status);
            $scope.template = null;
          });
        } else{
          $('#btn_submit').val('Create')
        }    

        $scope.templateSave = function(){
          TemplateSave($scope.template, $routeParams.id)
          .success(function(data){
            $location.path( "/" );
          }).error(function(data, status){
            console.log(data, status);
            $('#errMsg1').show()
            $('#errMsg1').html(data.error)
          });
        }

      }])
      //---------------
      // Routes
      //---------------
      .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {
          templateUrl: '/list.html',
          controller: 'TemplateListCtrl'
        })
        .when('/show/:id', {
          templateUrl: '/templateDetails.html',
          controller: 'TemplateDetCtrl'
        })
        .when('/new', {
          templateUrl: '/templateCreateEdit.html',
          controller: 'TemplateCreateEditCtrl'
        })
        .when('/edit/:id', {
          templateUrl: '/templateCreateEdit.html',
          controller: 'TemplateCreateEditCtrl'
        })
        .when('/delete/:id', {
          templateUrl: '/list.html',
          controller: 'TemplateDelCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
      }]);