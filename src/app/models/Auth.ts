export interface UserCredentials {
    username: string,
    password: string
}

export interface LoggedInUser {
    id: number,
    token: string,
    username: string
}

export interface CreateUser {
    username: string,
    email: string,
    password: string
}
