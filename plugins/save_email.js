exports.register = function () {
    this.register_hook('queue', 'send_to_api');
};

exports.send_to_api = function (next, connection, params) {
    const transaction = connection.transaction;
    const mail_from = transaction.mail_from.address(); // Absender
    const rcpt_to = transaction.rcpt_to.map(rcpt => rcpt.address()); // Empfänger
    const email_body = connection.transaction.body.children[0].bodytext; // Nur den Textkörper auslesen (ohne Anhänge)

    this.loginfo(`This mail came from: ${mail_from}\nIs for: ${rcpt_to}\nWith the content: ${email_body}`)
    // fake api call

    next(OK)
};