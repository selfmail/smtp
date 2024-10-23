
// globals.d.ts
import type { This } from "../../types/this.js";
import type { Next } from "./types/parameter.ts";

declare global {
    var OK: undefined;

    interface Exports {
        hook_data: (this: This, next: Next, connection: any) => void;
        hook_data_post: (this: This, next: Next, connection: any) => void;
        plugin: {
            name: string;
        };
    }

    var exports: Exports;
}
