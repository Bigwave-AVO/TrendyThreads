function setRoutes(app, controller) {
    app.get('/data', controller.getData);
    app.post('/data', controller.postData);
}

module.exports = setRoutes;