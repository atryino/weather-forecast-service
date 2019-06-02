class RoutesController {
    constructor(weatherController, cacheService, analyticsService) {
        this.weatherController = weatherController;
        this.cacheService = cacheService;
        this.analyticsService = analyticsService;
    };

    /**
     * Log user request and get weather data for given zip code.
     * @param {Object} request
     * @param {Object} response
     */
    getWeatherData = function(request, response) {
        const zipCode = request.params.zipCode;
        this.analyticsService.logRequest(Object.assign(request.params, request.headers));
        return this.cacheService.get(zipCode, this.weatherController.getWeather.bind(this.weatherController))
            .then((result) => {
                response.send(result);
            }).catch((error) => {
                console.log('error', error);
                response.status(500).send(error);
            });
    }

    /**
     * Set up endpoints.
     * @param {Object} app
     */
    registerRoutes = function(app) {
        app.get('/:zipCode', this.getWeatherData.bind(this));
    };
}

module.exports = RoutesController;
