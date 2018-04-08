import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/sign-in']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
