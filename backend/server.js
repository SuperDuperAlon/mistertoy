const express = require('express')
const cookieParser = require('cookie-parser')
// const toyService = require('./services/toy.service.js')
// const userService = require('./services/user.service.js')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

// App configuration
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

// const corsOptions = {
//     origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true
// }
// app.use(cors(corsOptions))


if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080','http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const toyRoutes = require('./api/toy/toy.routes.js')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')

app.use('/api/toys', toyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})



// app.listen(3030, () => console.log("Server runs at http://127.0.0.1:3030"));