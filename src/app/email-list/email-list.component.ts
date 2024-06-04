import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatListItemLine, MatListItemMeta} from "@angular/material/list";
import {Email} from "../email";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Messages} from "../messages";

@Component({
  selector: 'app-email-list',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatListItem,
        MatListItemLine,
        MatListItemMeta
    ],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.css'
})
export class EmailListComponent {
    constructor(private _snackBar: MatSnackBar) {}

    @Input() emails: Email[] = []
    @Input() messages?: Messages
    @Input() isPhone = false

    async copyEmailToClipboard(email: Email) {
        await navigator.clipboard.writeText(email.address)
        this._snackBar.open(
            this.messages?.copiedToClipboard ?? "",
            undefined,
            {
                duration: 2000,
                verticalPosition: this.isPhone ? "top" : "bottom",
                panelClass: "snackbar"
            }
        )
    }
}
