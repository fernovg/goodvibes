export interface prodTienda {
    uid: string;
    Nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    uidcategoria: string;
    uidcolor: string;
    uidcoleccion: string;
    uidtema: string;
    categoria: string;
    color: string;
    tema: string;
    coleccion: string;
    foto1: string;
    foto2: string;
    foto3: string;
    fecha: string;
    hora: string;
}


export interface producto {
    uid: string;
    Nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    uidcategoria: string;
    uidcolor: string;
    uidcoleccion: string;
    uidtema: string;
    categoria: string;
    color: string;
    tema: string;
    coleccion: string;
    foto1: string;
    foto2: string;
    foto3: string;
    fecha: string;
    hora: string;
}

export class registroP {
    message?: string;
    result?: boolean;
}

export class borrarP {
    message?: string;
    result?: boolean;
}

export class editarP {
    message?: string;
    result?: boolean;
}

export interface categorias {
    uid: string;
    Nombre: string;
}

export interface colecciones {
    uid: string;
    coleccion: string;
    estado: string;
}

export interface temas {
    uid: string;
    tema: string;
}

export interface colores {
    uid: string;
    color: string;
}

export interface totalpCat {
    idCate: number;
    categoria: string;
    total_productos: string;
}

export interface editStock {
    message?: string;
    result?: boolean;
}

export class registro {
    message?: string;
    result?: boolean;
}