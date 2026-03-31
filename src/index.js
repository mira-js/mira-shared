"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceSchema = exports.Source = void 0;
const zod_1 = require("zod");
// ─── Sources ─────────────────────────────────────────────────────────────────
var Source;
(function (Source) {
    Source["reddit"] = "reddit";
    Source["hackernews"] = "hackernews";
    Source["news"] = "news";
})(Source || (exports.Source = Source = {}));
exports.SourceSchema = zod_1.z.nativeEnum(Source);
//# sourceMappingURL=index.js.map