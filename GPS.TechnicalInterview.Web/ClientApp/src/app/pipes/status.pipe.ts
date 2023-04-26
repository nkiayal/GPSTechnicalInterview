import { Pipe, PipeTransform} from '@angular/core'
import { Status } from '../models/status';

@Pipe({name: 'applicationStatus'})

export class ApplicationStatus implements PipeTransform {
    transform(value: Status): string {
        return Status[value];
    }
}