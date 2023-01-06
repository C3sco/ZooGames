var session = require('express-session');


HomepageUser.use(sessione({
    secret: 'sec',
    resave: true,
    saveUninitialized: true
}))