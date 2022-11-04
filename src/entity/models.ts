export interface products {
    imageUrl: string;
    price: number;
    name: string;
    id: number;
    quantity?: number;
}

export type category= {
    title: string,
    imageUrl: string
    items: products[]
}

