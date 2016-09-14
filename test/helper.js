var jsdom = require('jsdom');
global.document = jsdom.jsdom('<html><body><title>App</title><body><header id="search-bar"></header><div id="info"></div><div id="map"></div><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyChOlZRAueiZhq_lmN_bKVmdSAZL5AAyhc&signed_in=true" async defer></script><script src="../build/react.min.js"></script><script type="text/babel" src="../build/app.js"></script></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
