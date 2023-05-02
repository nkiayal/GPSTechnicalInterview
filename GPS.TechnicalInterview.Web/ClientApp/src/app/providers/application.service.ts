import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs'

import { IApplication } from '../interfaces/application.interface'

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    constructor() { }

    public isEdit: boolean = false;
    public application: IApplication = null;

    public subject = new Subject<any>();
    private _application = new BehaviorSubject({ isEdit: this.isEdit, application: this.application });

    currenApplication = this._application.asObservable();

    changeApplication(isEdit: boolean, application: IApplication = null): void {
        this._application.next({ isEdit: isEdit, application: application })
    }

    resetApplication(): void {
        this._application.next({ isEdit: false, application: null });
    }

}
