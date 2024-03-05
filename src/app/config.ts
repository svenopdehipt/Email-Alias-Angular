import {Messages} from "./messages";

export type Config = {
    registered: boolean,
    messages: Messages,
    colorScheme: number,
    isPhone: boolean,
    emails: string,
}

export enum ColorScheme {
    system,
    light,
    dark
}
