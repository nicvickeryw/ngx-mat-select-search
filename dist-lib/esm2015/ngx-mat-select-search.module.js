/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MatSelectSearchComponent } from './mat-select-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatSelectSearchClearDirective } from './mat-select-search-clear.directive';
export const MatSelectSearchVersion = '3.0.0';
let NgxMatSelectSearchModule = class NgxMatSelectSearchModule {
};
NgxMatSelectSearchModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatButtonModule,
            MatCheckboxModule,
            MatIconModule,
            MatInputModule,
            MatProgressSpinnerModule,
            MatTooltipModule
        ],
        declarations: [
            MatSelectSearchComponent,
            MatSelectSearchClearDirective
        ],
        exports: [
            MatSelectSearchComponent,
            MatSelectSearchClearDirective
        ]
    })
], NgxMatSelectSearchModule);
export { NgxMatSelectSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1zZWxlY3Qtc2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXQtc2VsZWN0LXNlYXJjaC8iLCJzb3VyY2VzIjpbIm5neC1tYXQtc2VsZWN0LXNlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFcEYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDO0FBc0I5QyxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtDQUFJLENBQUE7QUFBNUIsd0JBQXdCO0lBbkJwQyxRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixhQUFhO1lBQ2IsY0FBYztZQUNkLHdCQUF3QjtZQUN4QixnQkFBZ0I7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDWix3QkFBd0I7WUFDeEIsNkJBQTZCO1NBQzlCO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asd0JBQXdCO1lBQ3hCLDZCQUE2QjtTQUM5QjtLQUNGLENBQUM7R0FDVyx3QkFBd0IsQ0FBSTtTQUE1Qix3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBCaXRob3N0IEdtYkggQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3RTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWF0U2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmUgfSBmcm9tICcuL21hdC1zZWxlY3Qtc2VhcmNoLWNsZWFyLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBNYXRTZWxlY3RTZWFyY2hWZXJzaW9uID0gJzMuMC4wJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdFNlbGVjdFNlYXJjaENvbXBvbmVudCxcbiAgICBNYXRTZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0U2VsZWN0U2VhcmNoQ29tcG9uZW50LFxuICAgIE1hdFNlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0U2VsZWN0U2VhcmNoTW9kdWxlIHsgfVxuIl19