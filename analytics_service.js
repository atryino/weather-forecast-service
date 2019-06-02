var fs = require('fs');

class AnalyticsService {
    constructor() {}

    /**
     * Save request data to file.
     * @param {Object} request 
     */
    logRequest(request) {
        let date = new Date();
        request.date = date;
        fs.readFile('analytics.json', function (err, data) {
            var json = JSON.parse(data);
            json.push(request);
        
            fs.writeFile("analytics.json", JSON.stringify(json), () => {});
        });
    }
}

module.exports = AnalyticsService;
