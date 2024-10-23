// exports.hook_data = (next, connection) => {
//     // enable mail body parsing
//     connection.transaction.parse_body = true;
//     next();
// }

// exports.hook_data_post = function (next, connection) {
//     connection.transaction.parse_body = true;
//     this.loginfo("connection.transaction.body.bodytext");
//     this.loginfo(connection.transaction.body.children[0].bodytext);
//     next()
// }
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
                __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
));
var import_consola = __toESM(require("consola"));
exports.hook_data = (next, connection) => {
    import_consola.default.log("hey");
    connection.transaction.parse_body = true;
    next();
};
exports.hook_data_post = (next, connection) => {
    connection.transaction.parse_body = true;
    exports.loginfo("connection.transaction.body.bodytext");
    exports.loginfo(connection.transaction.body.children[0].bodytext);
    next();
};