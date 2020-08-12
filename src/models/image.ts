export class Image {

    mimeType: string;
    data: Buffer;

    public constructor(mimeType: string, data: Buffer) {
        this.data = data;
        this.mimeType = mimeType;
    }


}