import { Pipe, PipeTransform } from "@angular/core";
import { Status } from "../interfaces/applications.interface";

@Pipe({
  name: "status",
})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case Status.NEW:
        return "New";
      case Status.APPROVED:
        return "Approved";
      case Status.FUNDED:
        return "Funded";
      default:
        console.log("Error, no pipe for status type");
        return;
    }
  }
}
