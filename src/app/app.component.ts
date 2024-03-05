import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemMeta,
    MatListSubheaderCssMatStyler
} from "@angular/material/list";
import {Email} from './email'
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {Messages} from "./messages";
import {ColorScheme, Config} from "./config";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [MatList, MatListItem, MatIconButton, MatListItemMeta, MatIcon, MatListItemLine, MatToolbar, MatButton, MatListSubheaderCssMatStyler],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    registered: Boolean = false
    messages!: Messages
    isPhone!: boolean
    highlightedEmails: Email[] = []
    emails: Email[] = []

    constructor(private _snackBar: MatSnackBar) {}

    async ngOnInit() {
        const config = await getConfig();
        const currentDomain = await getCurrentDomain();
        this.registered = config.registered;
        this.messages = config.messages;
        this.isPhone = config.isPhone;
        const emails: Email[] = JSON.parse(config.emails);

        if (currentDomain) {
            for (let email of emails) {
                if (email.privateComment.replace(' ', '').toLowerCase().includes(currentDomain)) {
                    this.highlightedEmails.push(email)
                    break
                } else {
                    this.emails.push(email)
                }
            }
        }
        else {
            this.emails = emails
        }

        switch (config.colorScheme) {
            case ColorScheme.system:
                document.body.classList.add("system-theme")
                break;
            case ColorScheme.light:
                document.body.classList.add("light-theme")
                break;
            case ColorScheme.dark:
                document.body.classList.add("dark-theme")
                break;
        }

        if (!config.isPhone) {
            document.body.classList.add('large_screen');
        }
    }

    async copyEmailToClipboard(email: Email) {
        await navigator.clipboard.writeText(email.address)
        this._snackBar.open(
            this.messages.copiedToClipboard,
            undefined,
            {
                duration: 2000,
                verticalPosition: this.isPhone ? "top" : "bottom",
                panelClass: "snackbar"
            }
        )
    }

    openLicense() {
        window.open('https://github.com/svenopdehipt/Email-Alias-Angular/blob/main/third-party-licenses.txt', '_blank')
    }
}

declare function getCurrentDomain(): Promise<string>
declare function getConfig(): Promise<Config>
