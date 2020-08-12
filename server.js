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
    let contentType = 'text/html'

    switch (fileExt) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.wav':
            contentType = 'audio/wav'
            break
    }

    fs.readFile(filePath, (err, content) => {
        res.writeHead(200, {'Content-Type': contentType})
        res.end(content)
    })

}).listen(PORT, () => console.log(`Server running on Port ${PORT}`))