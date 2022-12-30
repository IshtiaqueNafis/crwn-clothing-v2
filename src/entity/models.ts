export interface products {
    imageUrl: string;
    price: number;
    name: string;
    id: number;
    quantity?: number;
}

export interface categories  {
    id?: number;
    title: string,
    imageUrl?: string
    items?: products[]
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
