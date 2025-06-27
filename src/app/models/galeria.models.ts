export interface galeria {
    id?: number;
    foto?: string;
    descripcion?: string;
    fecha?: string;
    hora?: string;
    nombre?: string;
    fotop?: string;
}

export interface Blog {
    uid?: string;
    foto: string;
    titulo: string;
    autor: string;
    fecha: string; // ISO
    secciones: SeccionBlog[]; // 👈 lista de bloques: texto, subtítulo, imagen, etc.
    etiquetas?: string[];
}

export interface SeccionBlog {
    tipo: 'parrafo' | 'subtitulo' | 'imagen';
    contenido: string; // texto del párrafo o subtítulo, o URL si es imagen
}

export interface publica {
    id?: number;
    foto?: string;
    descripcion?: string;
    fecha?: string;
    hora?: string;
    nombre?: string;
    fotop?: string;
}

export class resPubli {
    message?: string;
    result?: boolean;
}

export interface totalPub {
    Total?: string;
    fotos?: string;
}
