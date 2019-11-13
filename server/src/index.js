const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

// Initializing the application
Promise.all([
    // Starting express server
    app.listen(config.PORT),

    // Initializing database connection
    mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

]).then(result => {

    console.log(`Server has started on port ${config.PORT}...
Database connection estabilshed...
GraphQL playgound URL:  http://localhost:${config.PORT}/graphql 
`)

}).catch(error => {
    console.log('Failed to start server: ', error)
})