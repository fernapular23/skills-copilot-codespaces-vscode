// create web server
// 1. import http module
const http = require('http');
const url = require('url');
const fs = require('fs');
const comments = [];
// 2. create web server
// 3. register request event
// 4. listen port
http.createServer((req, res) => {
    // 1. get url
    // console.log(req.url);
    // 2. parse url
    const urlObj = url.parse(req.url, true);
    // console.log(urlObj);
    // 3. get path
    const pathName = urlObj.pathname;
    // console.log(pathName);
    // 4. judge path
    if (pathName === '/') {
        // 5. read html file
        fs.readFile('./views/index.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found');
            }
            // 6. read comments
            fs.readFile('./data/comments.json', (err, commentsData) => {
                if (err) {
                    return res.end('404 Not Found');
                }
                // 7. render html
                const comments = JSON.parse(commentsData.toString());
                const htmlStr = template.render(data.toString(), {
                    comments: comments
                });
                // 8. send response
                res.end(htmlStr);
            });
        });
    } else if (pathName.indexOf('/public/') === 0) {
        // 5. read static resource
        fs.readFile('.' + pathName, (err, data) => {
            if (err) {
                return res.end('404 Not Found');
            }
            // 6. send response
            res.end(data);
        });
    } else if (pathName === '/post') {
        // 5. read html file
        fs.readFile('./views/post.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found');
            }
            // 6. send response
            res.end(data);
        });
    } else if (pathName === '/pinglun') {
        // 1. get params
        // console.log(urlObj.query);
        // 2. add comments
        const comment = urlObj.query;
        comment.dateTime = '2019-10-10';
        comments.unshift(comment);
        // 3. redirect
        // status code:
