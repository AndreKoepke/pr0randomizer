"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MimeTypeUtil {
    static determineByPath(path) {
        return MimeTypeUtil.types.png;
    }
}
MimeTypeUtil.types = {
    'png': 'image/png'
};
exports.MimeTypeUtil = MimeTypeUtil;
//# sourceMappingURL=mimeTypeUtil.js.map