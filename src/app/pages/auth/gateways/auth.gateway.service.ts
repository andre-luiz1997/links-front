import { Injectable } from "@angular/core";
import { isEmpty } from "@shared/utils/common";
import { STORAGE } from "@shared/utils/storage";
import { AuthSocket } from "src/app/app.module";

@Injectable({
    providedIn: 'root'
})
export class AuthGatewayService {
    private token = '';

    constructor(
        private authSocket: AuthSocket
    ) {
        this.reload();
    }

    reload() {
        const token = STORAGE.get(STORAGE.keys.ACCESS_TOKEN);
        if(token !== this.token) {
            this.token = token;
            this.connect();
        }
    }

    connect() {
        this.authSocket.disconnect();
        if(isEmpty(this.token)) return;
        this.authSocket.ioSocket.io.opts.extraHeaders = {
            Authorization: `Bearer ${this.token}`
        };
        this.authSocket.connect();
    }

    getMessage(event: string) {
        return this.authSocket.fromEvent(event);
    }
}