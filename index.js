const HTMLParser = require('node-html-parser');
const request = require('request');
const xkcdUrl = 'https://xkcd.com/';
const http = require('http');
const port = process.env.NODE_PORT || 8080;

http.createServer(function (req, res) {

request(xkcdUrl,{},(err, resp, body) => {

    if (err) { return console.log(err); }

    const imgUrl = HTMLParser.parse(body)
                       .querySelector('#comic')
                       .querySelector('img')
                       .attributes
                       .srcset;

    const cleanUrl = '<img src=\'https:' + imgUrl.split(' ')[0] + '\'\>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(cleanUrl);
    res.end();

});

}).listen(port);;
