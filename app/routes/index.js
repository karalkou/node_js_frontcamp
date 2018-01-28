const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
    noteRoutes(app, db);
    // Other routes handlers will be here later
};