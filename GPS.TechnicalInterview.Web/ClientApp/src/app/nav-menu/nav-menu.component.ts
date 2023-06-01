import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  public headerTitle: string = '';
  public currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.currentRoute = this.router.url.split('?')[0];
    if (this.currentRoute === '/create-application') {
      this.route.queryParams.subscribe(params => {
        if (params.edit) {
          this.headerTitle = `Application ${params.edit}`;
        } else {
          this.headerTitle = 'Create Application';
        }
      });
    } else {
      this.headerTitle = 'Application Manager';
    }
  }
}
