/* eslint-disable no-unused-vars */
type Env = {
    PORT: string;
    CLIENT_ID_GOOGLE: string;
    CLIENT_SECRET_GOOGLE: string;
    CLIENT_ID_GITHUB: string;
    CLIENT_SECRET_GITHUB: string;
    SECRET_KEY:string,
    NEXT_PUBLIC_BASE_API_URL:string
};

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env { }
    }
}
export type IEnv = Env;
