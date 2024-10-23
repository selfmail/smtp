import consola from "consola";

exports.hook_data = (next: any, connection: any) => {
    // enable mail body parsing
    consola.log("hey")
    connection.transaction.parse_body = true;
    next();
}

type This = {
    loginfo: (m: string) => void,
}

exports.hook_data_post = function (this: This, next: any, connection: any,) {
    connection.transaction.parse_body = true;
    this.loginfo("connection.transaction.body.bodytext");
    this.loginfo(connection.transaction.body.children[0].bodytext);
    next()
}