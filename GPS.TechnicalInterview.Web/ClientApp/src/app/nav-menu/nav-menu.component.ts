import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public headerTitle: string = '';
  public currentRoute: string = '';
  public routeParam?: string;
  public goBack: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const splitUrl = this.router.url.split('/');
    this.currentRoute = splitUrl.length > 1 ? splitUrl[1] : splitUrl[0];
    this.routeParam = splitUrl.length > 2 ? splitUrl[2] : undefined;

    switch (this.currentRoute) {
      case 'create-application':
        this.headerTitle = 'Create Application';
        this.goBack = true;
        break;
      case 'edit-application':
        this.headerTitle = `Application ${this.routeParam ?? ''}`;
        this.goBack = true;
        break;
      default:
        this.headerTitle = 'Application Manager';
    }
  }
}
