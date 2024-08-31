import { TaggedError } from "effect/Data";

export class CreateHistoryError extends TaggedError("CreateHistoryError")<{
    message: unknown;
}> {}
export class ProcessIsComboWinner  extends TaggedError("ProcessIsComboWinner")<{
    message: unknown;
}> {}
export class GetPointError  extends TaggedError("GetPointError")<{
    message: unknown;
}> {}