var express = require('express');
var https = require('https');
var fs = require('fs');

var AnalyticsService = require('./analytics_service');
var CacheService = require('./cache_service');
var Routes = require('./routes_controller');
var WeatherController = require('./weather_controller');

const apiUrl = 'https://j9l4zglte4.execute-api.us-east-1.amazonaws.com/api/ctl/weather';
const options = {
  key: fs.readFileSync('ssl/client-key.pem'),
  cert: fs.readFileSync('ssl/client-cert.pem')
};

const analyticsService = new AnalyticsService();
const cacheService = new CacheService(3600);
const weatherController = new WeatherController(apiUrl);
const routesController = new Routes(weatherController, cacheService, analyticsService);

const app = express();
routesController.registerRoutes(app);

https.createServer(options, app).listen(8080);
