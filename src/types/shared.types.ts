import type { Registry } from "miragejs";
import type Schema from "miragejs/orm/schema";

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppSchema = Schema<Registry<any, any>>;
