import { Brand } from "effect";

export type userId = string & Brand.Brand<"userId">;
export const userId = Brand.refined<userId>(
    (n) => typeof n === "string", // Check if the value is an integer
    (n) => Brand.error(`Expected ${n} to be an string`), // Error message if the value is not an integer
);