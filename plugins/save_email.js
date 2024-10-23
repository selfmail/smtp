exports.hook_queue = function(next, connection) {
  const transaction = connection.transaction;
  const mail_from = transaction.mail_from.address();
  const rcpt_to = transaction.rcpt_to.map((rcpt) => rcpt.address());
  const email_body = connection.transaction.body.children[0].bodytext;
  this.loginfo(`This mail came from: ${mail_from}
Is for: ${rcpt_to}
With the content: ${email_body}`);
  next(OK);
};
exports.plugin = {
  name: "save_email"
};
