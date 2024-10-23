import { Plugin } from "../../types/plugin.js";
import { This } from "../../types/this.js";

exports.hook_data = function (this: This, next: any, connection: any) {
    // enable mail body parsing
    connection.transaction.parse_body = true;
    next();
}

exports.hook_data_post = function (this: This, next: any, connection: any,) {
    connection.transaction.parse_body = true;
    this.logerror("connection.transaction.body.bodytext");
    this.loginfo(connection.transaction.body.children[0].bodytext);
    next()
}

exports.plugin = {
    name: "check_sender",
    hook: undefined
} satisfies Plugin
