exports.register = function () {
    this.register_hook('data_post', 'log_data')
    this.loginfo("Plugin hook_data loaded");
};
exports.log_data = function (next, connection) {
    // this.loginfo(connection.transaction.body.body_text_encoded);
    next()
}