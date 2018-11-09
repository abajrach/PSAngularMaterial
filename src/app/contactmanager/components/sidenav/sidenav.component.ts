import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  
  private isScreenSizeSmall: boolean = false;

  public users: Observable<User[]>;
  
  constructor(public breakpointObserver: BreakpointObserver, private userService: UserService) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 720px)'])

      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSizeSmall = true;
        } else {
          this.isScreenSizeSmall = false;
        }
      });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(data => {
      console.log(data);
    });
  }

  isScreenSmall(): boolean {
    return this.isScreenSizeSmall;
  }

}
