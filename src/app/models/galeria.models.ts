export interface galeria{
    id?: number;
    foto?: string;
    descripcion?: string;    
    fecha?: string;
    hora?: string;
    nombre?: string;
    fotop?: string;
}

export interface publica{
    id?: number;
    foto?: string;
    descripcion?: string;    
    fecha?: string;
    hora?: string;
    nombre?: string;
    fotop?: string;
}

export class resPubli{
    message?: string;
    result?: boolean;
}

export interface totalPub{
    Total?: string;
    fotos?: string;
}
