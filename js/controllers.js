'use strict';

/* Controllers */

var sfvControllers = angular.module('sfvControllers', []);

sfvControllers.controller('sfvCtrl', ['$scope', '$log', 'flickrProvider', 'twitterProvider',
  function($scope, $log, flickrProvider, twitterProvider) {

    $scope.updateWbUrl = function() {
        //Flickr
        if ($scope.wbUrl.indexOf("api.flickr.com") != -1) {
          if ($scope.wbUrl.indexOf("method=flickr.people.getInfo") != -1) {
              var piRes = flickrProvider.peopleInfo($scope.wbUrl);
              //piRes is [peopleInfo promise, [peoplePublicPhotos promise, [photoInfo all promise]]]
              piRes[0].then(function(piData) {
                  $scope.flickrPerson = piData["data"];
              });
              piRes[1].then(function(data) {
                  //Not using peoplePublicPhotos
                  //data[0].then(function(pppData) {
                        //$scope.res2 = pppData["data"];
                  //});
                  data[1].then(function(phiDatas) {
                      var phRes = [];
                      var phUrls = []
                      for(var i in phiDatas) {
                          phRes.push(phiDatas[i]["data"]);
                          phUrls.push(flickrProvider.photoInfo2Url($scope.wbUrl, phiDatas[i]["data"]));
                      }
                      $scope.flickrPublicPhotos = phRes;
                      $scope.flickrPublicPhotosUrls = phUrls;
                  });
              });
          } else if ($scope.wbUrl.indexOf("method=flickr.people.getPublicPhotos") != -1) {
              var pppRes = flickrProvider.peoplePublicPhotos($scope.wbUrl);
              //pppRes is [peoplePublicPhotos promise, [photoInfo all promise]]
              pppRes[1].then(function(phiDatas) {
                  var phRes = [];
                  var phUrls = []
                  for(var i in phiDatas) {
                      phRes.push(phiDatas[i]["data"]);
                      phUrls.push(flickrProvider.photoInfo2Url($scope.wbUrl, phiDatas[i]["data"]));
                  }
                  $scope.flickrPublicPhotos = phRes;
                  $scope.flickrPublicPhotosUrls = phUrls;
              });
          } else if ($scope.wbUrl.indexOf("method=flickr.photos.getInfo") != -1) {
              var phiRes = flickrProvider.photoInfo($scope.wbUrl);
              phiRes.then(function(phiData) {
                  var phRes = [];
                  var phUrls = []
                  phRes.push(phiData["data"]);
                  phUrls.push(flickrProvider.photoInfo2Url($scope.wbUrl, phiData["data"]));
                  $scope.flickrPublicPhotos = phRes;
                  $scope.flickrPublicPhotosUrls = phUrls;
              });
          } else {
              $scope.msg = "It's Flickr, but don't know how to handle that type of content."
          }
        } else if ($scope.wbUrl.indexOf("api.twitter.com") != -1) {
            if ($scope.wbUrl.indexOf("/statuses/user_timeline") != -1) {
                twitterProvider.userTimeline($scope.wbUrl).then(function(utData){
                    $scope.tweets = utData["data"];
                });
            } else if ($scope.wbUrl.indexOf("/search/tweets.json") != -1) {
                twitterProvider.search($scope.wbUrl).then(function(utData){
                    $scope.tweets = utData["data"]["statuses"];
                });
            } else {
                $scope.msg = "It's Twitter, but don't know how to handle that type of content."
            }
        } else {
          $scope.msg = "Don't know how to handle that type of content."
        }
    };
  }]);
