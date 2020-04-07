module.exports = {
    mongodb: {
        URI: 'mongodb+srv://'.concat(process.env.DB_USER, ':', process.env.DB_PWD, '@', process.env.DB_HOST, '/', process.env.DB_DATABASE),
        CONF: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            w: 'majority',
            retryWrites: true
        }
    }
};
