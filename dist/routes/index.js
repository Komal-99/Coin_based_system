"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
var express_1 = require("express");
var v1 = (0, express_1.Router)();
exports.v1 = v1;
v1.use("/admin", function (req, res) {
    res.send("Admin route");
});
//# sourceMappingURL=index.js.map