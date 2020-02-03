const HTMLParser = require('node-html-parser');
const request = require('request');
const xkcdUrl = 'https://xkcd.com/';
const http = require('http');
const port = process.env.NODE_PORT || 8080;

http.createServer(function (req, res) {

request(xkcdUrl,{},(err, resp, body) => {

    if (err) { return console.log(err); }

    const attr = HTMLParser.parse(body)
                       .querySelector('#comic')
                       .querySelector('img')
                       .attributes;

    const imgUrl = attr.srcset;
    const altText = attr.title;

    const cleanHtml = '<html><center><img src=\'https:' + imgUrl.split(' ')[0] + '\'\><br><h2>' 
              + altText + '</h2></center></html>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(cleanHtml);
    res.end();

});

}).listen(port);;
