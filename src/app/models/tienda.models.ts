export interface prodTienda {
    id: string;
    uid: string;
    Nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    idcategoria: string;
    idcolor: string;
    idcoleccion: string;
    idtema: string;
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
    id: string;
    uid: string;
    Nombre: string;
    descripcion: string;
    precio: string;
    stock: string;
    idcategoria: string;
    idcolor: string;
    idcoleccion: string;
    idtema: string;
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
    id: string;
    uid: string;
    Nombre: string;
}

export interface colecciones {
    id: string;
    uid: string;
    coleccion: string;
    estado: string;
}

export interface temas {
    id: string;
    uid: string;
    tema: string;
}

export interface colores {
    id: string;
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