exports.register = function () {
    this.loginfo("Plugin check_email_in_db loaded");
    this.register_hook('rcpt', 'check_email_in_db');
};

// check if the recipient is in the db
exports.check_email_in_db = function (next, connection, params) {
    const email = params[0].address();

    this.loginfo(params[0])

    this.loginfo(email, "This is the email")
    if (email == "henri") {
        this.loginfo(`E-Mail-Adresse ${email} nicht in der Datenbank gefunden.`);
        return next(DENY, "Empfänger nicht autorisiert.");
    } else if (email == "henri@selfmail.app") {
        this.loginfo(`E-Mail-Adresse ${email} nicht in der Datenbank gefunden.`);
        return next(DENY, "Empfänger nicht autorisiert.");
    }
    return next(OK)
};