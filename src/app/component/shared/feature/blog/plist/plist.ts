import { Component } from '@angular/core';
import { BlogService } from '../../../../../service/blog';
import { IPage } from '../../../../../model/plist';
import { Blog } from '../../../../../model/blog';
import { BotoneraComponent } from '../../../botonera/botonera';
import { neighborhood } from '../../../../../environment/environment';

@Component({
  selector: 'app-plist',
  imports: [BotoneraComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PlistBlog {

  oPage: IPage<Blog> | null = null;
  numPage: number = 0;
  numRpp: number = 5;

  constructor(private blogService: BlogService) { }

  // oBotonera eliminado, ahora la botonera es un componente
  readonly neighborhood = neighborhood;

  ngOnInit() {

    this.getPage();
  }

  getPage() {
    this.blogService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<Blog>) => {
        this.oPage = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  onPageChange(numPage: number) {
    this.numPage = numPage;
    this.getPage();
  }


}
