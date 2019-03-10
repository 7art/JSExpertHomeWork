const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const userData = require('./db.json').user;
// const low = require('lowdb')
// const db = low('db.json')
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
   // var user = db.get("user").value()
    if (req.body.login ==  userData.login && req.body.password ==  userData.password) {
        res.jsonp({
            status: true
        })
    } else {
        //res.sendStatus(401);
        res.jsonp({
            status: false
        })
    }
})

// Use default router
server.use(router)
server.listen(1337, () => {
    console.log('JSON Server is running')
})



