# sfm-wayback-viewer

This part of an experiment with providing access to archived social media data recorded from social media APIs.
In particular, it provides a UI for viewing social media data and related web resources that is served by
wayback software.

sfm-wayback-viewer can be used on conjunction with [sfm-wayback](https://github.com/gwu-libraries/sfm-wayback).

sfm-wayback-viewer is an AngularJS application. For ease of use, a Docker container is provided.

## Running sfm-wayback-viewer
1. Clone this project.
2. Follow the directions for running sfm-wayback, but uncomment the sfmwaybackviewer container.

sfm-wayback-viewer will be available at [http://<your server>:8000/](http://localhost:8000/).

To use sfm-wayback-viewer, paste the URL of an archived API call into the input box labeled
"Wayback URL".  You can get a list of URLs from the PyWB search.

## Limitations
**This is only an experiment.** Only Twitter and Flickr are supported.
