const request = require('request');

class WeatherController {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    };

    /**
     * Get and parse weather data for next 3 days from api endpoint.
     */
    getWeather = function() {
        return new Promise((resolve, reject) => {
            return request(this.apiUrl, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    const weather = JSON.parse(body);
                    const {
                        city,
                        state
                    } = weather.today;
                    const threeDayForecast = weather.daily.slice(0, 3).map((day) => ({
                        description: day.description,
                        highTemperature: day.highTemperature,
                        lowTemperature: day.lowTemperature
                    }));
                    const result = {
                        city,
                        state,
                        threeDayForecast
                    };
                    resolve(result);
                }
            });
        });
    };
}

module.exports = WeatherController;
