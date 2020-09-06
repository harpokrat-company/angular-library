import {Component, Input} from '@angular/core';
import {Secret} from '@harpokrat/hcl';

@Component({
  selector: 'hpk-secret-viewer',
  templateUrl: './secret-viewer.component.html',
  styleUrls: ['./secret-viewer.component.css']
})
export class SecretViewerComponent {

  @Input() secret: Secret;

  constructor() {
  }

  public copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
