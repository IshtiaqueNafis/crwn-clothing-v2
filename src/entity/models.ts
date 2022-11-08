import { string } from "yup";

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

export interface params{
    title: string

}

