'use strict';

/* Services */
var sfvServices = angular.module('sfvServices', []);

sfvServices.factory('flickrProvider', ['$http', '$q', function($http, $q) {
    var factory = {};

    factory.photoInfo = function(piUrl) {
        return $http.get(piUrl);
    }

    factory.peoplePublicPhotos = function(pppUrl) {
        //TODO:  Handle multiple pages
        var prom1 = $http.get(pppUrl);
        var parsedPppUrl = parseUrl(pppUrl);
        var prom2 = prom1.then(function(data) {
            var proms = [];
            for (var i in data["data"]["photos"]["photo"]) {
                var piUrl = parsedPppUrl.protocol + "//" + parsedPppUrl.host + parsedPppUrl.pathname + "?method=flickr.photos.getInfo&photo_id=" + data["data"]["photos"]["photo"][i]["id"];
                proms.push(factory.photoInfo(piUrl));
            }
            return $q.all(proms);
        });
        return [prom1, prom2];

    }

    factory.peopleInfo = function(piUrl) {
        //https://api.flickr.com/services/rest/?nojsoncallback=1&user_id=131866249%40N02&method=flickr.people.getInfo&format=json
        //https://api.flickr.com/services/rest/?nojsoncallback=1&page=1&user_id=131866249%40N02&method=flickr.people.getPublicPhotos&format=json
        //http://localhost:8080/test_collection/20150504145402/https://api.flickr.com/services/rest/?nojsoncallback=1&secret=d6de2300bd&photo_id=16176690763&method=flickr.photos.getInfo&format=json
        var prom1 = $http.get(piUrl);
        //People public photos
        var prom2 = prom1.then(function(data) {
            var parsedPiUrl = parseUrl(piUrl);
            var pppUrl = parsedPiUrl.protocol + "//" + parsedPiUrl.host + parsedPiUrl.pathname + "?method=flickr.people.getPublicPhotos&user_id=" + parsedPiUrl.searchObject.user_id;
            return factory.peoplePublicPhotos(pppUrl);

        });
        return [prom1, prom2];
    }

    factory.photoInfo2Url = function(sampleUrl, photoInfo, type) {
        var parsedUrl = parseUrl(sampleUrl);
        var splitPathname = parsedUrl.pathname.split("/");
      //Not a complete url. Requires type and file extension to be appended, e.g., o.jpg
      return parsedUrl.protocol + "//" + parsedUrl.host + "/" + splitPathname[1] + "/"  + splitPathname[2] + "/https://farm" + photoInfo["photo"]["farm"] + ".staticflickr.com/" + photoInfo["photo"]["server"] + "/" + photoInfo["photo"]["id"] + "_" + photoInfo["photo"]["secret"];

    }
    return factory;

}]);

sfvServices.factory('twitterProvider', ['$http', function($http) {
    var factory = {};

    factory.userTimeline = function(utUrl) {
        return $http.get(utUrl);
    }

    factory.search = function(sUrl) {
        return $http.get(sUrl);
    }

    return factory;
}]);


function parseUrl(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}
