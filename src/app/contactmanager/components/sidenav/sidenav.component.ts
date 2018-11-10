import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

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
  
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    public breakpointObserver: BreakpointObserver, 
    private userService: UserService,
    private router: Router) {}

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

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    })
  }

  isScreenSmall(): boolean {
    return this.isScreenSizeSmall;
  }

}
