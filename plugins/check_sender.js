exports.hook_data = function(next, connection) {
  connection.transaction.parse_body = true;
  next(OK);
};
exports.hook_data_post = function(next, connection) {
  connection.transaction.parse_body = true;
  this.logerror("connection.transaction.body.bodytext");
  this.loginfo(connection.transaction.body.children[0].bodytext);
  next();
};
exports.plugin = {
  name: "check_sender"
};
