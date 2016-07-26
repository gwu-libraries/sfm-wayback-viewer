'use strict';

/* Filters */

var sfvFilters = angular.module('sfvFilters', []);


sfvFilters.filter('tweet_text', ['$log', '$sce', function($log, $sce) {
  return function(tweet) {
      var orig_text = tweet["text"];
      var text = orig_text;
      for(var i in tweet["entities"]["urls"]) {
          var url = tweet["entities"]["urls"][i];
          var start = url["indices"][0];
          var end = url["indices"][1];
          var url_text = orig_text.substring(start, end);
          text = text.replace(url_text, "<a href=\"" + url["expanded_url"] + "\">" + url["display_url"] + "</a>");
      }
      //Remove media links
      for(var i in tweet["entities"]["media"]) {
          var url = tweet["entities"]["media"][i];
          var start = url["indices"][0];
          var end = url["indices"][1];
          var url_text = orig_text.substring(start, end);
          text = text.replace(url_text, "");
      }
      return $sce.trustAsHtml(text);
  };
}]);
