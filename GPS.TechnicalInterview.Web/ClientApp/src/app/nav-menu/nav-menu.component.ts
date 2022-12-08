import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public headerTitle: string = '';
  public currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    const applicationNumber = this.activatedRoute.snapshot.paramMap.get('applicationNumber')

    this.currentRoute = this.router.url;
    if (this.currentRoute === '/create-application') {
      this.headerTitle = 'Create Application';
    } else if(this.currentRoute.includes('/create-application')) {
      this.headerTitle = `Application ${applicationNumber}`;
    } else {
      this.headerTitle = 'Application Manager';
    }
  }
}
