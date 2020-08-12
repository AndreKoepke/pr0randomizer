import express from 'express';
import {Pr0grammService} from "./services/pr0gramm-service";

const pr0gramm = new Pr0grammService();
const app = express();
const port = 3000;

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    res.send(200);
});


app.get('/random.png', function (req, res) {
    pr0gramm.getImage()
        .subscribe(value => {
            res.writeHead(200, {
                'Content-Type': value.mimeType,
                'Content-Length': Buffer.byteLength(value.data)
            });
            res.end(value.data, 'binary');
        });
});


app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});