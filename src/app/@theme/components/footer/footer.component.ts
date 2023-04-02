import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    <span class="footer-text" style="margin-right: 5px;"> © 2022 - <a class="p-link" target="_blank" href="https://www.mediasoftbd.com/" ><b >Mediasoft Data Systems Ltd. </b></a>All rights reserved </span>
    </span>
    
  `,
})
export class FooterComponent {
}