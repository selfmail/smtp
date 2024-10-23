import type { This } from "../../types/this.js";

exports.hook_data = function (this: This, next, connection) {
    // enable mail body parsing
    connection.transaction.parse_body = true;
    next(OK);
}

exports.hook_data_post = function (this: This, next, connection,) {
    connection.transaction.parse_body = true;
    this.logerror("connection.transaction.body.bodytext");
    this.loginfo(connection.transaction.body.children[0].bodytext);
    next()
}

exports.plugin = {
    name: "check_sender",
}
