import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/galeria.models';
import {
  categorias,
  colecciones,
  colores,
  producto,
  temas,
} from 'src/app/models/tienda.models';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blog!: Blog;
  private fireService = inject(FirestoreService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('uid');
    const path = 'blog';
    if (id) {
      this.fireService.traerDocumentoPorId<Blog>(path,id).then((blog => {
        if (blog) {
          this.blog = blog;
        } else {
          console.error('Blog no encontrado');
        }
      }))
    }
  }

}
