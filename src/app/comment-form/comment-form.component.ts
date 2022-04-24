import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../article.service';
import { CommentObject } from '../interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() id_article: number;
  @Output() emitComment = new EventEmitter<CommentObject>();
  commentForm = this.formBuilder.group({
    contenu: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}
  ngComment() {
    const that = this;
    this.articleService
      .postComment(this.id_article, this.commentForm.value.contenu)
      .subscribe({
        next(data) {
          that.emitComment.emit(data);
        },
      });
  }
}
