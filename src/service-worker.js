/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
    console.log("Yay! Workbox has loaded 🎉");

    workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerRoute(".*\.\html", args => {
        return articleHandler.handle(args).then(response => {
            if (!response) {
                return caches.match('offline.html');
            } else if (response.status === 404) {
                return caches.match('404.html');
            } else if (response.status >= 400) {
                return caches.match('error.html');
            }
            return response;
        });
    });

} else {
    console.log("Noo! Workbox didn't load 😬");
}

workbox.googleAnalytics.initialize();
