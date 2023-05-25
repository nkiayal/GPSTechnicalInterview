import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

    public headerTitle: string = '';
    public currentRoute: string = '';
    public dataID: string = '';
    public routeID$: Observable<any>;

    @Input()
    public routeMode: string = ''

    constructor(private router: Router, public route: ActivatedRoute) {
        this.routeID$ = route.url;
    }
    ngOnInit(): void {
        switch (this.routeMode) {
            case 'create': {
                this.headerTitle = 'Create Application';
                break;
            }
            case 'edit': {
                this.routeID$.pipe(
                    take(1),
                    map((url) => this.dataID = url[url.length - 1].path)
                ).subscribe();
                this.headerTitle = 'Edit Application: ' + this.dataID;
                break;
            }
            default: {
                this.headerTitle = 'Application Manager';
                break;
            }
        }
    }
}
