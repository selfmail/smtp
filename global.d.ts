
// globals.d.ts
import type { This } from "../../types/this.js";
import type { Next } from "./types/parameter.ts";

declare global {
    var OK: undefined;

    // function, variables & objects which can be exported
    interface Exports {
        // Hooks

        // DATA hooks
        hook_data: (this: This, next: Next, connection: any) => void;
        hook_data_post: (this: This, next: Next, connection: any) => void;

        // QUEUE hooks
        hook_queue: (this: This, next: Next, connection: any) => void

        // plugin configuration
        plugin: {
            /**Name of this plugin. */
            name: string;
        };
    }

    var exports: Exports;
}
