/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AllSportyNewsTestModule } from '../../../test.module';
import { CategoryDialogComponent } from '../../../../../../main/webapp/app/entities/category/category-dialog.component';
import { CategoryService } from '../../../../../../main/webapp/app/entities/category/category.service';
import { Category } from '../../../../../../main/webapp/app/entities/category/category.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { MessageService } from '../../../../../../main/webapp/app/entities/message';

describe('Component Tests', () => {

    describe('Category Management Dialog Component', () => {
        let comp: CategoryDialogComponent;
        let fixture: ComponentFixture<CategoryDialogComponent>;
        let service: CategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AllSportyNewsTestModule],
                declarations: [CategoryDialogComponent],
                providers: [
                    UserService,
                    MessageService,
                    CategoryService
                ]
            })
            .overrideTemplate(CategoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Category(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Category();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
