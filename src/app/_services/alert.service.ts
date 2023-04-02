import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../_models';
import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbComponentStatus, NbGlobalPhysicalPosition, NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../pages/modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';




@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private toastrService: NbToastrService,private dialogService: NbDialogService) {}
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    config: NbToastrConfig;

    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    confirm:boolean;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = true;
    status: NbComponentStatus = 'primary';
  
    title = 'HI there!';
    content = `I'm cool toaster!`;
  
    types: NbComponentStatus[] = [
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ];
    positions: string[] = [
      NbGlobalPhysicalPosition.TOP_RIGHT,
      NbGlobalPhysicalPosition.TOP_LEFT,
      NbGlobalPhysicalPosition.BOTTOM_LEFT,
      NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    ];

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.showToast('success', "Success", message);
    }
    error(message: string, options?: any) {

        this.showToast('danger', "Success", message);

       
    }
    info(message: string, options?: any) {
        this.showToast('primary', "Lookup", message);
    }
    warn(message: string, options?: any) {
        this.showToast('warning', "Are Sure", message);
    }

    // main alert method    
    alert(alert: Alert) {
      this.showToast(this.status, this.title, this.content);
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
  confirmation(){
 
return this.dialogService.open(DialogNamePromptComponent)
   
  }
    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
          status: type,
          destroyByClick: this.destroyByClick,
          duration: this.duration,
          hasIcon: this.hasIcon,
          position: this.position,
          preventDuplicates: this.preventDuplicates,
          preventOpenDuplicates: true,
          progressBar : true,
          limit: 3,
          closeButton : true.valueOf
        };
        const titleContent = title ? `. ${title}` : '';
        this.index += 1;
        this.toastrService.show(
          body,
          `${titleContent}`,
          config);
      }
     hasSameErrorToastr(message){
        var hasSameErrorToastr = false;
        var $toastContainer = $('#toast-container');
        if ($toastContainer.length > 0) {
          var $errorToastr = $toastContainer.find('.toast-error');
          if ($errorToastr.length > 0) {
            var currentText = $errorToastr.find('.toast-message').text();
            var areEqual = message.toUpperCase() === currentText.toUpperCase();
            if (areEqual) {
              hasSameErrorToastr = true;
            }
          }
        }
      
        return hasSameErrorToastr;
      }
}