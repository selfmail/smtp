exports.hook_data = function (this, next, connection) {
    // enable mail body parsing
    connection.transaction.parse_body = true;
    next();
}

exports.hook_data_post = function (this, next, connection,) {
    connection.transaction.parse_body = true;
    this.logerror("Content of this message:");
    this.loginfo(connection.transaction.body.children[0].bodytext);
    next()
}

exports.plugin = {
    name: "log_data",
}
