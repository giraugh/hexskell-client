const express = require('express')
const path = require('path')

const BUILD_DIR = '../dist'
const PORT = process.env.PORT || 1234

// Create express app
const app = express()

// Setup middleware
app.use(express.static(path.join(__dirname, BUILD_DIR)))

// Serve bundle to all requests (to facilitate react routing)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, BUILD_DIR, 'index.html'))
})

// Listen on port supplied by environment
app
  .listen(PORT, _ => console.log(`Hexskell client being served on port ${PORT}`))
