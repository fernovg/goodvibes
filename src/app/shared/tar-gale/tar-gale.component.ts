import { Component, inject } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { Blog } from 'src/app/models/galeria.models';
import { FirestoreService } from 'src/app/services/firebase.service';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-tar-gale',
  templateUrl: './tar-gale.component.html',
  styleUrls: ['./tar-gale.component.scss']
})
export class TarGaleComponent {

  private fireService = inject(FirestoreService);
  blog: Blog[] = [];

  constructor(){}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    const path = 'blog';
    this.fireService.traerColeccionW<Blog>(path,[orderBy('fecha', 'desc')]).subscribe( blog => {
      this.blog = blog;
    })
  }

  // Obtener primera imagen del blog
getPrimeraImagen(blog: Blog): string | null {
  const img = blog.secciones.find(sec => sec.tipo === 'imagen');
  return img ? img.contenido : null;
}

// Obtener resumen (primer párrafo o subtítulo)
getResumen(blog: Blog): string {
  const sec = blog.secciones.find(s =>
    s.tipo === 'subtitulo' || s.tipo === 'parrafo'
  );
  return sec ? sec.contenido.slice(0, 140) + '...' : '';
}

}
