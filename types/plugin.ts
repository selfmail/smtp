export type Hook = "data_post"
    | "data"
    | "rcpt"

export type Plugin = {
    /**Name of this plugin, used for the file-name and for the plugins file */
    name: string,
    /**Type of hook, used for the plugins file inside the config directory */
    hook: Hook,
}