const corsOptions = {
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
  });

module.exports = {
    corsOptions,
    limiter,
    helmetOptions
};

