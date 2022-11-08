export interface products {
    imageUrl: string;
    price: number;
    name: string;
    id: number;
    quantity?: number;
}

export type categories = {
    title: string,
    imageUrl?: string
    items: products[]
}

export interface params {
    title: string


}

export interface signInparams {
    email: string,
    password: string
}

export interface userInfo {
    displayName: string,
    email: string
}

export interface registerParams {
    email: string,
    password: string,
    displayName: string
}

export interface setUser{
    email:string,
    displayName: string
}