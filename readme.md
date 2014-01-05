Installation
============

ensure node 0.10 is installed. Agile Warlock was not tested with previous versions, but could work.
If it doesn't, do no blame me ;)
use node --version if you're not sure about the installed version.

If you don't have Bower:
npm install -g bower

then
npm install
bower install

run the app:
node app.js

then access to http://localhost:8080/public/

Architecture
============

Client:
-------

AngularJS               MV* framework
|_ angular-socket-io
Flot.js                 Charts

Server:
-------

Node.JS
|_ Restify              Rest framework
|_ Socket.IO            Websocket support + fallbacks
|_ NodeRedis            Redis driver
|_ Passport             Authentification


Database:
---------
Redis

