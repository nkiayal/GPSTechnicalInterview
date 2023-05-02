import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApplicationService } from "../providers/application.service";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

    public headerTitle: string = '';
    public currentRoute: string = '';

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private _applicationService: ApplicationService
    ) { }
    ngOnInit(): void {

        this.currentRoute = this.router.url;
        if (this.currentRoute === '/create-application') {
            this.headerTitle = 'Create Application';
        }
        else if (this.currentRoute.includes('/edit-application')) {
            const id = this._route.snapshot.params.id;
            this.headerTitle = `Application ${id}`;
        }
        else {
            this.headerTitle = `Application Manager `;
        }
    }

    resetApplication(): void {
        this._applicationService.resetApplication()
    }
}
