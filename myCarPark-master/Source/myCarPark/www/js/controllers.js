var id;
angular.module('app.controllers', ['ngCordova'])

.controller('myCarParkCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])




   
.controller('reserveBookingCtrl', ['$scope', '$stateParams','$http','$cordovaSms', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope, $stateParams, $http, $cordovaSms) {

 $scope.viewSlot=function(event) {
    var user_id=JSON.parse(window.localStorage.getItem(id))[0];
     
      //var time_value=document.getElementById("slot_value").value;	  
		//console.log($scope.choice);
    $http.get('https://api.mlab.com/api/1/databases/carpark/collections/slot/'+$scope.choice+'?apiKey=uB6GZgs0JHGxvojb6G9wHunoxCue0JOT').success(function (data) {
          var floorSlots=["A0","A1","A2","A3","A4","A5","A6","A7"];
        var A=new Array(data.A0,data.A1,data.A2,data.A3,data.A4,data.A5,data.A6,data.A7);
        var booked_count=0;
             for(var i=0;i<8;i++){
              var slot=document.getElementById(floorSlots[i]);	
                if(A[i]==0)
                    {
                    slot.style.backgroundColor ='green';
                    booked_count++;
                    }
                 else if(A[i]==user_id)
                     slot.style.backgroundColor ='yellow';
                 else
                    slot.style.backgroundColor ='red'; 
             }
             $scope.x=booked_count;
    
        }); 
  };
    
  var maxCount=[0,0,0];
    
  $scope.cancelSlot=function(event) {
     var user_id=JSON.parse(window.localStorage.getItem(id))[0];
      var phone=JSON.parse(window.localStorage.getItem(id))[1];
    $http.get('https://api.mlab.com/api/1/databases/carpark/collections/slot/'+$scope.choice+'?apiKey=uB6GZgs0JHGxvojb6G9wHunoxCue0JOT').success(function (data) {
          var floorSlots=["A0","A1","A2","A3","A4","A5","A6","A7"];var i;
        var A=new Array(data.A0,data.A1,data.A2,data.A3,data.A4,data.A5,data.A6,data.A7);
             for(i=0;i<8;i++){
              var slot=document.getElementById(floorSlots[i]);	
                if(A[i]==user_id)
                    {
		$http({
          method: 'PUT' ,
          url: 'https://api.mlab.com/api/1/databases/carpark/collections/slot/'+$scope.choice+'	?apiKey=uB6GZgs0JHGxvojb6G9wHunoxCue0JOT',
                     data: "{$set : {"+floorSlots[i]+" : 0}}" ,
                     contentType: "application/json"
        }).success(function (data) {
             //find different slot limits 
            var diff_slot;
            if($scope.choice=='58f27fcc734d1d3b89ba801e')
                diff_slot=0;
            else if($scope.choice=='58f281aa734d1d3b89ba805d')
                diff_slot=1;
            else
                diff_slot=2;
            
            maxCount[diff_slot]=0;
			slot.style.backgroundColor="green";
			alert("Your booking is cancelled");
             //sms
            document.addEventListener("deviceready", function () {

        $cordovaSms
          .send(phone, "Your UserID: "+user_id+". Your booking is cancelled")
          .then(function() {
            // Success! SMS was sent
          }, function(error) {
            // An error occurred
          });

      });
        })   
			//location.reload();
			$scope.viewSlot();
            //$scope.parking();
                }
               
             }
    
        }); 
  };

 
$scope.bookSlot = function(a) {
    var user_id=JSON.parse(window.localStorage.getItem(id))[0];
		var slot=document.getElementById(a);
       var phone=JSON.parse(window.localStorage.getItem(id))[1];
		//console.log(slot.style.backgroundColor);
    
		slot.style.backgroundColor = slot.style.backgroundColor == 'red' ? alert("Try other available slot") : confirmSlot();
		function confirmSlot() {
            
            //find different slot limits 
            var diff_slot,temp_count=0;
            if($scope.choice=='58f27fcc734d1d3b89ba801e')
                diff_slot=0;
            else if($scope.choice=='58f281aa734d1d3b89ba805d')
                diff_slot=1;
            else
                diff_slot=2;
            
            //initializing counts
            $http.get('https://api.mlab.com/api/1/databases/carpark/collections/slot?apiKey=uB6GZgs0JHGxvojb6G9wHunoxCue0JOT').success(function (data) {
        var user_id=JSON.parse(window.localStorage.getItem(id))[0];
               for(var i=0;i<data.length;i++)
        { 
            var A=new Array(data[i].A0,data[i].A1,data[i].A2,data[i].A3,data[i].A4,data[i].A5,data[i].A6,data[i].A7);
          for(var j=0;j<8;j++){
              if(A[j]==user_id){
                 maxCount[i]=1;
              }
          }
         // console.log(maxCount[i])  
        } 
                  if(maxCount[diff_slot]==0)
           {
             
        $http({
          method: 'PUT' ,
          url: 'https://api.mlab.com/api/1/databases/carpark/collections/slot/'+$scope.choice+'	?apiKey=uB6GZgs0JHGxvojb6G9wHunoxCue0JOT',
          //data: JSON.stringify( { "$set" : {"A0" : 1 } } ),
            data: "{$set : {"+a+" : "+user_id+"}}" ,        
            contentType: "application/json"
        }).success(function (data) {
            //console.log(data.a)
          console.log(maxCount[diff_slot]);
                slot.style.backgroundColor="yellow";
                maxCount[diff_slot]++;
			     alert("Slot "+a+" booking is confirmed");
			    //location.reload();
			 //sms   
            document.addEventListener("deviceready", function () {

            $cordovaSms
              .send(phone, "Your UserID: "+user_id+". Slot "+a+" booking is confirmed.")
              .then(function() {
                // Success! SMS was sent
              }, function(error) {
                // An error occurred
              });

          });
            
             $scope.viewSlot();
            //$scope.parking();
        })
        }
       
            
 else alert("Booking Limit Reached");  
            });
               	
		};
    };

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('myCarPark2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', '$http','$q', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $q) {	
  $scope.isDisabled = false;
  $scope.signup = function () {
    var id=$scope.id;
	var name=$scope.uname;
    var pass=$scope.pass;
    var phone=$scope.phone;
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http({
      method: 'POST',
      url: 'https://api.mongolab.com/api/1/databases/sample/collections//MyDB?apiKey=1ZOH8YSgfpyJnkDHGCoKR1D6M36Ybm_E',
      data: JSON.stringify({
        id:id,
        username: name,
        password: pass,
        mobile: phone
      }),
      contentType:"application/json"
    }).success(function(data){
		$scope.isDisabled = true;
		alert("User Acount is created !!");
      //console.log(phone)
      //deferred.resolve('Welcome!');
    }).error(function (data){
		alert("Error in User account creation");
	})

  }
  $scope.autoid = function () {

    this.length = 4;
    this.timestamp = +new Date;

    var _getRandomInt = function (min, max) {
      return Math.floor(Math.random() * ( max - min + 1 )) + min;
    }


      var ts = this.timestamp.toString();
      var parts = ts.split("").reverse();
      var id = "";

      for (var i = 0; i < this.length; ++i) {
        var index = _getRandomInt(0, parts.length - 1);
        id += parts[index];
      }

    $scope.id=id;
      return id;

  }
  $scope.autoid();

}])

  .controller('logincontrol', ['$scope', '$stateParams', '$http', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $state) {
      $scope.logincheck = function () {

        var name=$scope.uname;
        var pw=$scope.pass;
        $http.get('https://api.mongolab.com/api/1/databases/sample/collections/MyDB?q={\"username\":\"'+name+'\",\"password\":\"'+pw+'\"}&apiKey=1ZOH8YSgfpyJnkDHGCoKR1D6M36Ybm_E')
        .success(function (data) {
			//console.log(data);
			if(data[0]==null){
				alert("Wrong Username or Password");
			}else if(name==data[0].username&&pw==data[0].password){
			   // var id;
				//console.log(data[0].id);
				var idphone=[data[0].id,data[0].mobile];
				window.localStorage.setItem( id, JSON.stringify(idphone));
               // console.log(JSON.parse(window.localStorage.getItem(id)));
				window.localStorage.getItem(id);
                
			  $state.go('menu.reserveBooking')
			}
			else{
				alert("Wrong Username or Password");
			}
        }).error(function(data){
			alert("Wrong Username or Password");
		});
      }


    }])

.controller('myBookingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('parkingTicketCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
   $scope.parking=function(){
      // console.log("hie");
       
      $http.get('https://api.mlab.com/api/1/databases/carpark/collections/slot?apiKey=uB6GZgs0JHGxvojb6G9wHunoxCue0JOT').success(function (data) {
        var user_id=JSON.parse(window.localStorage.getItem(id))[0];
        var qr=""+user_id+" ";
          //console.log(data);
       // var A=new Array(data.A0,data.A1,data.A2,data.A3,data.A4,data.A5,data.A6,data.A7);
        //var A=[0,1,2,3,4,5,6,7];
        for(var i=0;i<data.length;i++)
        { 
            var A=new Array(data[i].A0,data[i].A1,data[i].A2,data[i].A3,data[i].A4,data[i].A5,data[i].A6,data[i].A7);
          for(var j=0;j<8;j++){
              if(A[j]==user_id){
                  qr+="Slot"+i+" ";
                  qr+="A"+j+" ";
              }
          }
            
         }
          qr+=" booking confirmed";
var mySrc = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+qr;
document.getElementById('myImage').src = mySrc;
     // console.log(qr); 
                                  });

                                  }
   


}])
