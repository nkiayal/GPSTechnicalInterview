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

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {

    this.currentRoute = this.router.url;
    if (this.currentRoute === '/create-application') {
      this.headerTitle = 'Create Application';
    } else if(this.currentRoute.includes('/edit-application')) {
      const applicationNumber: string = this.route.snapshot.paramMap.get("applicationNumber")
      this.headerTitle = `Application ${applicationNumber}`;
    }
    else {
      this.headerTitle = "Application"
    }
  }
}
