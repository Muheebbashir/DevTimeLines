import { GetAuthReturn } from "@clerk/types";

declare global {
  namespace Express {
    export interface Request {
      auth: GetAuthReturn;
    }
  }
}