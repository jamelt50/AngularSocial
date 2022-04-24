import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ArticleObject } from '../interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {
  @Input() article?: ArticleObject;
  @Output() emitArticle = new EventEmitter<ArticleObject>();
  postForm = this.formBuilder.group({
    contenu: '',
    titre: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    if (this.article) {
      this.postForm.setValue({
        contenu: this.article.contenu,
        titre: this.article.titre,
      });
    }
  }
  ngPost() {
    const that = this;
    if (this.article) {
      this.articleService
        .updateOne(
          this.article.id_article,
          this.postForm.value.contenu,
          this.postForm.value.titre
        )
        .subscribe({
          next(data) {
            that.emitArticle.emit(data);
          },
        });
    } else {
      this.articleService
        .postOne(this.postForm.value.contenu, this.postForm.value.titre)
        .subscribe({
          next(data) {
            that.emitArticle.emit(data);
          },
        });
    }
  }
}
