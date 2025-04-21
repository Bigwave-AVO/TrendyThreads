class Controller {
    getData(req, res) {
        // Logic to get data
        res.send("Data retrieved successfully");
    }

    postData(req, res) {
        // Logic to post data
        res.send("Data posted successfully");
    }
}

module.exports = Controller;