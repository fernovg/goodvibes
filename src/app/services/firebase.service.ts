import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { deleteDoc, getDoc, orderBy, query, QueryConstraint, updateDoc, where } from '@firebase/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; //es una extension que crea id

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    //todos: servicios
    // firestore: Firestore = inject(Firestore);

    constructor(private firestore: Firestore) { }

    //* se crea una funcion generica para poder leer los datos de cualquier coleccion
    //* se actualiza automaticamente si existe un cambio en una coleccion
    traerColeccion<tipo>(path: string) {
        const refcollection = collection(this.firestore, path);
        return collectionData(refcollection) as Observable<tipo[]>
    }

    traerColeccionW<tipo>(path: string, q?: QueryConstraint[]) {
        const refcollection = collection(this.firestore, path);
        const queryRef = q ? query(refcollection, ...q) : refcollection;
        return collectionData(queryRef, { idField: 'id' }) as Observable<tipo[]>;
    }

    traerDocumentoPorId<tipo>(path: string, id: string): Promise<tipo | null> {
        const refDoc = doc(this.firestore, `${path}/${id}`);
        return getDoc(refDoc).then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.data() as tipo;
            } else {
                return null;
            }
        });
    }

    //* funcion generica para el registro en la base de datos
    crearDocumento(data: any, enlace: string, idDoc: string) {
        const document = doc(this.firestore, `${enlace}/${idDoc}`);
        return setDoc(document, data);
    }

    async actualizarDocId(data: any, enlace: string, idDoc: string) {
        const document = doc(this.firestore, `${enlace}/${idDoc}`);
        return updateDoc(document, data)
    }

    async actualizarDocumento(data: any, enlace: string) {
        const document = doc(this.firestore, enlace);
        return updateDoc(document, data)
    }

    borrarDocID(enlace: string, idDoc: string) {
        const document = doc(this.firestore, `${enlace}/${idDoc}`)
        return deleteDoc(document);
    }

    //*funcion para la creacion de id automaticas
    crearIdDoc() {
        return uuidv4()
    }

}