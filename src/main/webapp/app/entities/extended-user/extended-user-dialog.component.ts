import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExtendedUser } from './extended-user.model';
import { ExtendedUserPopupService } from './extended-user-popup.service';
import { ExtendedUserService } from './extended-user.service';

@Component({
    selector: 'jhi-extended-user-dialog',
    templateUrl: './extended-user-dialog.component.html'
})
export class ExtendedUserDialogComponent implements OnInit {

    extendedUser: ExtendedUser;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private extendedUserService: ExtendedUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.extendedUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.extendedUserService.update(this.extendedUser));
        } else {
            this.subscribeToSaveResponse(
                this.extendedUserService.create(this.extendedUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExtendedUser>>) {
        result.subscribe((res: HttpResponse<ExtendedUser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExtendedUser) {
        this.eventManager.broadcast({ name: 'extendedUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-extended-user-popup',
    template: ''
})
export class ExtendedUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extendedUserPopupService: ExtendedUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.extendedUserPopupService
                    .open(ExtendedUserDialogComponent as Component, params['id']);
            } else {
                this.extendedUserPopupService
                    .open(ExtendedUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
