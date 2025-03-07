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
  public applicationNumber: string | null= '';

  constructor(private router: Router, private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {

    this.currentRoute = this.router.url;
    if (this.currentRoute === '/create-application') {
      this.headerTitle = 'Create Application';
    } else if (this.currentRoute.includes('/edit-application')) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.applicationNumber = params.get('applicationNumber');
        this.headerTitle = `Application ${this.applicationNumber}`;
      });
    }
    else {
      this.headerTitle = 'Application Manager';
    }
  }
}
