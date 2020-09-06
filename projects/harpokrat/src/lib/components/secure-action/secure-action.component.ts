import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ISecureActionResource} from '@harpokrat/client';

@Component({
  selector: 'hpk-secure-action',
  templateUrl: './secure-action.component.html',
  styleUrls: ['./secure-action.component.css']
})
export class SecureActionComponent implements OnInit {

  @Input() token: string;

  @Input() secureAction: ISecureActionResource;

  constructor(
    private readonly $router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  redirect(): void {
    this.$router.navigate(['/']).then();
  }

}
