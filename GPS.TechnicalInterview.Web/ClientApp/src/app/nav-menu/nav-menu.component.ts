import { Input } from '@angular/core';
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

    @Input()
    public routeMode: string = ''

    constructor(private router: Router) {}
    ngOnInit(): void {
        switch (this.routeMode) {
            case 'create': {
                this.headerTitle = 'Create Application';
                break;
            }
            case 'edit': {
                this.headerTitle = 'Edit Application';
                break;
            }
            default: {
                this.headerTitle = 'Application Manager';
                break;
            }
        }
    }
}
