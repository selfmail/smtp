
// globals.d.ts
import type { This } from "../../types/this.js";

declare global {
    var OK: unknown;

    interface Exports {
        hook_data: (this: This, next: any, connection: any) => void;
        hook_data_post: (this: This, next: any, connection: any) => void;
        plugin: {
            name: string;
        };
    }

    var exports: Exports;
}

export { };
