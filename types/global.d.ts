import type { Next } from "./parameter.ts"

declare const exports: {
    // DATA
    hook_data_post: (next: Next, connection: any) => void
    hook_data: (next: Next, connection: any) => void,
    // I have no idea why Nextit's not working without the record type...
    plugin: Record<"name", string>

}