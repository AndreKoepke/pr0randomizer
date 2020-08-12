"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const operators_2 = require("rxjs/internal/operators");
const image_1 = require("../models/image");
const mimeTypeUtil_1 = require("../util/mimeTypeUtil");
const axios = require('axios').default;
class Pr0grammService {
    constructor() {
        this.PR0GRAMM_API_URL = 'https://pr0gramm.com/api/items/get';
        this.COOKIE_REGEX = /__cfduid=(.*?);/gm;
    }
    getImage() {
        return rxjs_1.from(axios.get(this.PR0GRAMM_API_URL))
            .pipe(operators_1.map(response => Pr0grammService.extractRandomImage(response)), operators_2.flatMap(url => {
            let mime = mimeTypeUtil_1.MimeTypeUtil.determineByPath(url);
            return Pr0grammService.downloadImage(url)
                .pipe(operators_1.map(image => new image_1.Image(mime, image)));
        }));
    }
    static extractRandomImage(response) {
        let items = response.data.items
            .filter(value => value.image.endsWith('png'));
        return items[Math.floor(Math.random() * items.length)].image;
    }
    static downloadImage(imageUrl) {
        imageUrl = `https://img.pr0gramm.com/${imageUrl}`;
        console.log("starting download " + imageUrl);
        return rxjs_1.from(axios.get(imageUrl, { responseType: "arraybuffer" }))
            .pipe(operators_1.map(response => Buffer.from(response["data"], 'binary')));
    }
}
exports.Pr0grammService = Pr0grammService;
//# sourceMappingURL=pr0gramm-service.js.map