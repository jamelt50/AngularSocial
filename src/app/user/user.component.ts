import { Component, Input, OnInit } from '@angular/core';
import { UserObject } from '../interface/index';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: UserObject;
  constructor() {}

  ngOnInit(): void {}
}
