import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AuthorizeService } from '../../services/authorize.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    loginFail = false;
    inputEnable = false;

    constructor(private element: ElementRef, private auth: AuthorizeService, private router: Router) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        window.localStorage.clear();
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    login(username: any, password: any) {
        this.inputEnable = true;
        this.auth.authentication(username, password).then((loginResponse) => {
            if (loginResponse['operation'] === 'success') {
                this.loginFail = false;
                Object.keys(loginResponse).forEach((key) => {
                    localStorage.setItem(key, loginResponse[key]);
                });
                this.router.navigateByUrl('/สารสนเทศ');
            } else {
                this.inputEnable = false;
                this.loginFail = true;
                localStorage.clear();
            }
        }).catch(err => {
            localStorage.clear();
        });
    }

    onKeyUsername(event, username, password) {
        if (event.key == 'Enter') {
            this.login(username, password);
        }
    }
}
