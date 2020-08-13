const http = require('http')
const path = require('path')
const fs = require('fs')


const PORT = process.env.PORT || 8000

http.createServer((req, res) => {
    let filePath = ''
    if (req.url.includes('sounds')) {
        filePath = path.join(__dirname, req.url)
    } else {
        filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    }
    
    const fileExt = path.extname(filePath)
    let options = { 'Content-Type': 'text/html' }

    switch (fileExt) {
        case '.css':
            options = { 'Content-Type': 'text/css' }
            break
        case '.js':
            options = { 'Content-Type': 'text/javascript' }
            break
        case '.wav':
            options = { 'Content-Type': 'audio/mp3', }
            break
    }

    fs.readFile(filePath, (err, content) => {
        res.writeHead(200, options)
        res.end(content)
    })

}).listen(PORT, () => console.log(`Server running on Port ${PORT}`))