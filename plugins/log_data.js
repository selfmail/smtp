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
exports.hook_data = function (next, connection) {
    connection.transaction.parse_body = true;
    next();
};
exports.hook_data_post = function (next, connection) {
    connection.transaction.parse_body = true;
    this.logerror("connection.transaction.body.bodytext");
    this.loginfo(connection.transaction.body.children[0].bodytext);
    next();
};
exports.plugin = {
    name: "check_sender",
    hook: void 0
};