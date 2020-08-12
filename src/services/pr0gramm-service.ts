import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Pr0grammItem} from "../models/pr0gramm-item";
import {flatMap} from "rxjs/internal/operators";
import {Image} from "../models/image";
import {MimeTypeUtil} from "../util/mimeTypeUtil";

const axios = require('axios').default;

export class Pr0grammService {

    private readonly PR0GRAMM_API_URL = 'https://pr0gramm.com/api/items/get';
    private readonly COOKIE_REGEX = /__cfduid=(.*?);/gm;

    public getImage(): Observable<Image> {

        return from(axios.get(this.PR0GRAMM_API_URL))
            .pipe(
                map(response => Pr0grammService.extractRandomImage(response)),
                flatMap(url => {
                    let mime = MimeTypeUtil.determineByPath(url);

                    return Pr0grammService.downloadImage(url)
                        .pipe(map(image => new Image(mime, image)))
                }));

    }

    private static extractRandomImage(response: any): string {
        let items = (response.data.items as Pr0grammItem[])
            .filter(value => value.image.endsWith('png'));

        return items[Math.floor(Math.random() * items.length)].image;
    }

    private static downloadImage(imageUrl: string): Observable<Buffer> {
        imageUrl = `https://img.pr0gramm.com/${imageUrl}`;
        console.log("starting download " + imageUrl);

        return from(axios.get(imageUrl, {responseType: "arraybuffer"}))
            .pipe(map(response => Buffer.from(response["data"], 'binary')));
    }
}
