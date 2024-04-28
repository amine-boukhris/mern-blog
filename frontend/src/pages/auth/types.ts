export interface AuthFormBody {
    email: string;
    password: string;
}

export type RegisterFormBody = AuthFormBody & {
    username: string;
};

export type LoginFormBody = AuthFormBody;