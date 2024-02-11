export interface prodTienda{
    id?: number;
    Nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    cate?: string;
    foto1?: string;
    foto2?: string;
    foto3?: string;
    fecha?: string;
    hora?: string;
}

export interface producto {
    id: string;
    Nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    foto1: string;
    foto2: string;
    foto3: string;
    fecha: string;
    hora: string;
}

export class registroP{
    message?: string;
    result?: boolean;
}

export class borrarP{
    message?: string;
    result?: boolean;
}

export class editarP{
    message?: string;
    result?: boolean;
}

export interface categorias {
    id: string;
    Nombre: string;
}