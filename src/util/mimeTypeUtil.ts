export class MimeTypeUtil {

    private static readonly types = {
        'png': 'image/png'
    }

    public static determineByPath(path: string): string {
        return MimeTypeUtil.types.png;
    }

}