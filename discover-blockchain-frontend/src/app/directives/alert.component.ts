import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AlertService} from '../services/alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {
    /**
     * Subscribe to alert messages
     */
    this.subscription = alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    /**
     * Unsubscribe on destroy to prevent memory leaks
     */
    this.subscription.unsubscribe();
  }
}
