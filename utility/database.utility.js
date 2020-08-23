const mongoose = require('mongoose');

const mongoOption = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const mongoUrl = "mongodb://localhost:27017/appname";

function connect() {
    return mongoose.connect(mongoUrl, mongoOption);
}

// On connect
mongoose.connection.on('connected', () => {
    const msg = `Mongo connected with ${mongoUrl}`;
    console.logger.info(msg, "mongo");
    console.log(msg);
});

// On error
mongoose.connection.on('error', (err) => {
    const msg = `Error occur in mongo ${err}`;
    console.logger.info(err, "mongo");
    console.log(msg);
});

// On disconnected
mongoose.connection.on('disconnected', () => {
    const msg = 'Mongo connection disconnected';
    console.log(msg);
    console.logger.info(msg, "mongo");
    setTimeout(() => connect(), 3000);
});

// mongo connect
connect()