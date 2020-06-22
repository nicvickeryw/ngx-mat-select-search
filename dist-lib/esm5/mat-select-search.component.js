/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnDestroy, OnInit, QueryList, ViewChild, ContentChild, Optional, HostBinding, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatOption, _countGroupLabelsBeforeOption } from '@angular/material/core';
import { MatSelect, SELECT_PANEL_MAX_HEIGHT } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { A, Z, ZERO, NINE, SPACE, END, HOME, UP_ARROW, DOWN_ARROW, ESCAPE, } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { delay, take, takeUntil } from 'rxjs/operators';
import { MatSelectSearchClearDirective } from './mat-select-search-clear.directive';
/* tslint:disable:member-ordering component-selector */
/**
 * Component providing an input field for searching MatSelect options.
 *
 * Example usage:
 *
 * interface Bank {
 *  id: string;
 *  name: string;
 * }
 *
 * @Component({
 *   selector: 'my-app-data-selection',
 *   template: `
 *     <mat-form-field>
 *       <mat-select [formControl]="bankCtrl" placeholder="Bank">
 *         <mat-option>
 *           <ngx-mat-select-search [formControl]="bankFilterCtrl"></ngx-mat-select-search>
 *         </mat-option>
 *         <mat-option *ngFor="let bank of filteredBanks | async" [value]="bank.id">
 *           {{bank.name}}
 *         </mat-option>
 *       </mat-select>
 *     </mat-form-field>
 *   `
 * })
 * export class DataSelectionComponent implements OnInit, OnDestroy {
 *
 *   // control for the selected bank
 *   public bankCtrl: FormControl = new FormControl();
 *   // control for the MatSelect filter keyword
 *   public bankFilterCtrl: FormControl = new FormControl();
 *
 *   // list of banks
 *   private banks: Bank[] = [{name: 'Bank A', id: 'A'}, {name: 'Bank B', id: 'B'}, {name: 'Bank C', id: 'C'}];
 *   // list of banks filtered by search keyword
 *   public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
 *
 *   // Subject that emits when the component has been destroyed.
 *   private _onDestroy = new Subject<void>();
 *
 *
 *   ngOnInit() {
 *     // load the initial bank list
 *     this.filteredBanks.next(this.banks.slice());
 *     // listen for search field value changes
 *     this.bankFilterCtrl.valueChanges
 *       .pipe(takeUntil(this._onDestroy))
 *       .subscribe(() => {
 *         this.filterBanks();
 *       });
 *   }
 *
 *   ngOnDestroy() {
 *     this._onDestroy.next();
 *     this._onDestroy.complete();
 *   }
 *
 *   private filterBanks() {
 *     if (!this.banks) {
 *       return;
 *     }
 *
 *     // get the search keyword
 *     let search = this.bankFilterCtrl.value;
 *     if (!search) {
 *       this.filteredBanks.next(this.banks.slice());
 *       return;
 *     } else {
 *       search = search.toLowerCase();
 *     }
 *
 *     // filter the banks
 *     this.filteredBanks.next(
 *       this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
 *     );
 *   }
 * }
 */
var MatSelectSearchComponent = /** @class */ (function () {
    function MatSelectSearchComponent(matSelect, changeDetectorRef, _viewportRuler, matOption, liveAnnouncer, matFormField) {
        if (matOption === void 0) { matOption = null; }
        if (matFormField === void 0) { matFormField = null; }
        this.matSelect = matSelect;
        this.changeDetectorRef = changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this.matOption = matOption;
        this.liveAnnouncer = liveAnnouncer;
        this.matFormField = matFormField;
        /** Label of the search placeholder */
        this.placeholderLabel = 'Suche';
        /** Type of the search input field */
        this.type = 'text';
        /** Label to be shown when no entries are found. Set to null if no message should be shown. */
        this.noEntriesFoundLabel = 'Keine Optionen gefunden';
        /**
         *  Text that is appended to the currently active item label announced by screen readers,
         *  informing the user of the current index, value and total options.
         *  eg: Bank R (Germany) 1 of 6
        */
        this.indexAndLengthScreenReaderText = ' of ';
        /**
          * Whether or not the search field should be cleared after the dropdown menu is closed.
          * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
          */
        this.clearSearchInput = true;
        /** Whether to show the search-in-progress indicator */
        this.searching = false;
        /** Disables initial focusing of the input field */
        this.disableInitialFocus = false;
        /** Enable clear input on escape pressed */
        this.enableClearOnEscapePressed = false;
        /**
         * Prevents home / end key being propagated to mat-select,
         * allowing to move the cursor within the search input instead of navigating the options
         */
        this.preventHomeEndKeyPropagation = false;
        /** Disables scrolling to active options when option list changes. Useful for server-side search */
        this.disableScrollToActiveOnOptionsChanged = false;
        /** Adds 508 screen reader support for search box */
        this.ariaLabel = 'dropdown search';
        /** Whether to show Select All Checkbox (for mat-select[multi=true]) */
        this.showToggleAllCheckbox = false;
        /** select all checkbox checked state */
        this.toggleAllCheckboxChecked = false;
        /** select all checkbox indeterminate state */
        this.toggleAllCheckboxIndeterminate = false;
        /** Display a message in a tooltip on the toggle-all checkbox */
        this.toggleAllCheckboxTooltipMessage = '';
        /** Define the position of the tooltip on the toggle-all checkbox. */
        this.toogleAllCheckboxTooltipPosition = 'below';
        /** Output emitter to send to parent component with the toggle all boolean */
        this.toggleAll = new EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        /** Event that emits when the current value changes */
        this.change = new EventEmitter();
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
    }
    MatSelectSearchComponent_1 = MatSelectSearchComponent;
    Object.defineProperty(MatSelectSearchComponent.prototype, "isInsideMatOption", {
        get: function () {
            return !!this.matOption;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelectSearchComponent.prototype, "value", {
        /** Current search value */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    MatSelectSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        // set custom panel class
        var panelClass = 'mat-select-search-panel';
        if (this.matSelect.panelClass) {
            if (Array.isArray(this.matSelect.panelClass)) {
                this.matSelect.panelClass.push(panelClass);
            }
            else if (typeof this.matSelect.panelClass === 'string') {
                this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
            }
            else if (typeof this.matSelect.panelClass === 'object') {
                this.matSelect.panelClass[panelClass] = true;
            }
        }
        else {
            this.matSelect.panelClass = panelClass;
        }
        // set custom mat-option class if the component was placed inside a mat-option
        if (this.matOption) {
            this.matOption.disabled = true;
            this.matOption._getHostElement().classList.add('contains-mat-select-search');
        }
        else {
            console.error('<ngx-mat-select-search> must be placed inside a <mat-option> element');
        }
        // when the select dropdown panel is opened or closed
        this.matSelect.openedChange
            .pipe(delay(1), takeUntil(this._onDestroy))
            .subscribe(function (opened) {
            if (opened) {
                _this.updateInputWidth();
                // focus the search field when opening
                if (!_this.disableInitialFocus) {
                    _this._focus();
                }
            }
            else {
                // clear it when closing
                if (_this.clearSearchInput) {
                    _this._reset();
                }
            }
        });
        // set the first item active after the options changed
        this.matSelect.openedChange
            .pipe(take(1))
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function () {
            if (_this.matSelect._keyManager) {
                _this.matSelect._keyManager.change.pipe(takeUntil(_this._onDestroy))
                    .subscribe(function () {
                    if (!_this.disableScrollToActiveOnOptionsChanged) {
                        _this.adjustScrollTopToFitActiveOptionIntoView();
                    }
                });
            }
            else {
                console.log('_keyManager was not initialized.');
            }
            _this._options = _this.matSelect.options;
            // Closure variable for tracking the most recent first option.
            // In order to avoid avoid causing the list to
            // scroll to the top when options are added to the bottom of
            // the list (eg: infinite scroll), we compare only
            // the changes to the first options to determine if we
            // should set the first item as active.
            // This prevents unncessary scrolling to the top of the list
            // when options are appended, but allows the first item
            // in the list to be set as active by default when there
            // is no active selection
            var previousFirstOption = _this._options.toArray()[_this.getOptionsLengthOffset()];
            _this._options.changes
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function (optionChanges) {
                // Convert the QueryList to an array
                var options = optionChanges.toArray();
                var keyManager = _this.matSelect._keyManager;
                if (keyManager && _this.matSelect.panelOpen) {
                    // avoid "expression has been changed" error
                    setTimeout(function () {
                        // set first item active and input width
                        // The true first item is offset by 1
                        var currentFirstOption = options[_this.getOptionsLengthOffset()];
                        // Check to see if the first option in these changes is different from the previous.
                        var firstOptionIsChanged = !_this.matSelect.compareWith(previousFirstOption, currentFirstOption);
                        // CASE: The first option is different now.
                        // Indiciates we should set it as active and scroll to the top.
                        if (firstOptionIsChanged) {
                            keyManager.setFirstItemActive();
                        }
                        // Update our reference
                        previousFirstOption = currentFirstOption;
                        // wait for panel width changes
                        setTimeout(function () {
                            _this.updateInputWidth();
                        });
                        // set no entries found class on mat option
                        if (_this.matOption) {
                            if (_this._noEntriesFound()) {
                                _this.matOption._getHostElement().classList.add('mat-select-search-no-entries-found');
                            }
                            else {
                                _this.matOption._getHostElement().classList.remove('mat-select-search-no-entries-found');
                            }
                        }
                        if (!_this.disableScrollToActiveOnOptionsChanged) {
                            _this.adjustScrollTopToFitActiveOptionIntoView();
                        }
                    }, 1);
                }
            });
        });
        // detect changes when the input changes
        this.change
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.changeDetectorRef.detectChanges();
        });
        // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
        this._viewportRuler.change()
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function () {
            if (_this.matSelect.panelOpen) {
                _this.updateInputWidth();
            }
        });
        this.initMultipleHandling();
    };
    MatSelectSearchComponent.prototype._emitSelectAllBooleanToParent = function (state) {
        this.toggleAll.emit(state);
    };
    MatSelectSearchComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    MatSelectSearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // update view when available options change
        this.matSelect.openedChange
            .pipe(take(1), takeUntil(this._onDestroy)).subscribe(function () {
            _this.matSelect.options.changes
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.changeDetectorRef.markForCheck();
            });
        });
    };
    MatSelectSearchComponent.prototype._isToggleAllCheckboxVisible = function () {
        return this.matSelect.multiple && this.showToggleAllCheckbox;
    };
    /**
     * Handles the key down event with MatSelect.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    MatSelectSearchComponent.prototype._handleKeydown = function (event) {
        // Prevent propagation for all alphanumeric characters in order to avoid selection issues
        if ((event.key && event.key.length === 1) ||
            (event.keyCode >= A && event.keyCode <= Z) ||
            (event.keyCode >= ZERO && event.keyCode <= NINE) ||
            (event.keyCode === SPACE)
            || (this.preventHomeEndKeyPropagation && (event.keyCode === HOME || event.keyCode === END))) {
            event.stopPropagation();
        }
        // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
        if (this.enableClearOnEscapePressed === true && event.keyCode === ESCAPE && this.value) {
            this._reset(true);
            event.stopPropagation();
        }
    };
    /**
     * Handles the key up event with MatSelect.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    MatSelectSearchComponent.prototype._handleKeyup = function (event) {
        if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
            var ariaActiveDescendantId_1 = this.matSelect._getAriaActiveDescendant();
            var index = this._options.toArray().findIndex(function (item) { return item.id === ariaActiveDescendantId_1; });
            if (index !== -1) {
                var activeDescendant = this._options.toArray()[index];
                this.liveAnnouncer.announce(activeDescendant.viewValue + ' '
                    + this.getAriaIndex(index)
                    + this.indexAndLengthScreenReaderText
                    + this.getAriaLength());
            }
        }
    };
    /**
     * Calculate the index of the current option, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
     *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
     */
    MatSelectSearchComponent.prototype.getAriaIndex = function (optionIndex) {
        if (this.getOptionsLengthOffset() === 0) {
            return optionIndex + 1;
        }
        return optionIndex;
    };
    /**
     * Calculate the length of the options, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have length of options.length -1, due to search.
     *    Case 2 [1, 2, 3] will have length of options.length.
     */
    MatSelectSearchComponent.prototype.getAriaLength = function () {
        return this._options.toArray().length - this.getOptionsLengthOffset();
    };
    MatSelectSearchComponent.prototype.writeValue = function (value) {
        var valueChanged = value !== this._value;
        if (valueChanged) {
            this._value = value;
            this.change.emit(value);
        }
    };
    MatSelectSearchComponent.prototype.onInputChange = function (value) {
        var valueChanged = value !== this._value;
        if (valueChanged) {
            this.initMultiSelectedValues();
            this._value = value;
            this.onChange(value);
            this.change.emit(value);
        }
    };
    MatSelectSearchComponent.prototype.onBlur = function (value) {
        this.writeValue(value);
        this.onTouched();
    };
    MatSelectSearchComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MatSelectSearchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Focuses the search input field
     */
    MatSelectSearchComponent.prototype._focus = function () {
        if (!this.searchSelectInput || !this.matSelect.panel) {
            return;
        }
        // save and restore scrollTop of panel, since it will be reset by focus()
        // note: this is hacky
        var panel = this.matSelect.panel.nativeElement;
        var scrollTop = panel.scrollTop;
        // focus
        this.searchSelectInput.nativeElement.focus();
        panel.scrollTop = scrollTop;
    };
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    MatSelectSearchComponent.prototype._reset = function (focus) {
        if (!this.searchSelectInput) {
            return;
        }
        this.searchSelectInput.nativeElement.value = '';
        this.onInputChange('');
        if (this.matOption && !focus) {
            // remove no entries found class on mat option
            this.matOption._getHostElement().classList.remove('mat-select-search-no-entries-found');
        }
        if (focus) {
            this._focus();
        }
    };
    /**
     * Initializes handling <mat-select [multiple]="true">
     * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
     */
    MatSelectSearchComponent.prototype.initMultipleHandling = function () {
        var _this = this;
        // if <mat-select [multiple]="true">
        // store previously selected values and restore them when they are deselected
        // because the option is not available while we are currently filtering
        this.matSelect.valueChange
            .pipe(takeUntil(this._onDestroy))
            .subscribe(function (values) {
            if (_this.matSelect.multiple) {
                var restoreSelectedValues_1 = false;
                if (_this._value && _this._value.length
                    && _this.previousSelectedValues && Array.isArray(_this.previousSelectedValues)) {
                    if (!values || !Array.isArray(values)) {
                        values = [];
                    }
                    var optionValues_1 = _this.matSelect.options.map(function (option) { return option.value; });
                    _this.previousSelectedValues.forEach(function (previousValue) {
                        if (!values.some(function (v) { return _this.matSelect.compareWith(v, previousValue); })
                            && !optionValues_1.some(function (v) { return _this.matSelect.compareWith(v, previousValue); })) {
                            // if a value that was selected before is deselected and not found in the options, it was deselected
                            // due to the filtering, so we restore it.
                            values.push(previousValue);
                            restoreSelectedValues_1 = true;
                        }
                    });
                }
                if (restoreSelectedValues_1) {
                    _this.matSelect._onChange(values);
                }
                _this.previousSelectedValues = values;
            }
        });
    };
    /**
     * Scrolls the currently active option into the view if it is not yet visible.
     */
    MatSelectSearchComponent.prototype.adjustScrollTopToFitActiveOptionIntoView = function () {
        if (this.matSelect.panel && this.matSelect.options.length > 0) {
            var matOptionHeight = this.getMatOptionHeight();
            var activeOptionIndex = this.matSelect._keyManager.activeItemIndex || 0;
            var labelCount = _countGroupLabelsBeforeOption(activeOptionIndex, this.matSelect.options, this.matSelect.optionGroups);
            // If the component is in a MatOption, the activeItemIndex will be offset by one.
            var indexOfOptionToFitIntoView = (this.matOption ? -1 : 0) + labelCount + activeOptionIndex;
            var currentScrollTop = this.matSelect.panel.nativeElement.scrollTop;
            var searchInputHeight = this.innerSelectSearch.nativeElement.offsetHeight;
            var amountOfVisibleOptions = Math.floor((SELECT_PANEL_MAX_HEIGHT - searchInputHeight) / matOptionHeight);
            var indexOfFirstVisibleOption = Math.round((currentScrollTop + searchInputHeight) / matOptionHeight) - 1;
            if (indexOfFirstVisibleOption >= indexOfOptionToFitIntoView) {
                this.matSelect.panel.nativeElement.scrollTop = indexOfOptionToFitIntoView * matOptionHeight;
            }
            else if (indexOfFirstVisibleOption + amountOfVisibleOptions <= indexOfOptionToFitIntoView) {
                this.matSelect.panel.nativeElement.scrollTop = (indexOfOptionToFitIntoView + 1) * matOptionHeight
                    - (SELECT_PANEL_MAX_HEIGHT - searchInputHeight);
            }
        }
    };
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    MatSelectSearchComponent.prototype.updateInputWidth = function () {
        if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
            return;
        }
        var element = this.innerSelectSearch.nativeElement;
        var panelElement;
        while (element = element.parentElement) {
            if (element.classList.contains('mat-select-panel')) {
                panelElement = element;
                break;
            }
        }
        if (panelElement) {
            this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
        }
    };
    MatSelectSearchComponent.prototype.getMatOptionHeight = function () {
        if (this.matSelect.options.length > 0) {
            return this.matSelect.options.first._getHostElement().getBoundingClientRect().height;
        }
        return 0;
    };
    /**
     *  Initialize this.previousSelectedValues once the first filtering occurs.
     */
    MatSelectSearchComponent.prototype.initMultiSelectedValues = function () {
        if (this.matSelect.multiple && !this._value) {
            this.previousSelectedValues = this.matSelect.options
                .filter(function (option) { return option.selected; })
                .map(function (option) { return option.value; });
        }
    };
    /**
     * Returns whether the "no entries found" message should be displayed
     */
    MatSelectSearchComponent.prototype._noEntriesFound = function () {
        if (!this._options) {
            return;
        }
        return this.noEntriesFoundLabel && this.value && this._options.length === this.getOptionsLengthOffset();
    };
    /**
     * Determine the offset to length that can be caused by the optional matOption used as a search input.
     */
    MatSelectSearchComponent.prototype.getOptionsLengthOffset = function () {
        if (this.matOption) {
            return 1;
        }
        else {
            return 0;
        }
    };
    var MatSelectSearchComponent_1;
    MatSelectSearchComponent.ctorParameters = function () { return [
        { type: MatSelect, decorators: [{ type: Inject, args: [MatSelect,] }] },
        { type: ChangeDetectorRef },
        { type: ViewportRuler },
        { type: MatOption, decorators: [{ type: Optional }, { type: Inject, args: [MatOption,] }] },
        { type: LiveAnnouncer },
        { type: MatFormField, decorators: [{ type: Optional }, { type: Inject, args: [MatFormField,] }] }
    ]; };
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "placeholderLabel", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "noEntriesFoundLabel", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "indexAndLengthScreenReaderText", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "clearSearchInput", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "searching", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "disableInitialFocus", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "enableClearOnEscapePressed", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "preventHomeEndKeyPropagation", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "disableScrollToActiveOnOptionsChanged", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "ariaLabel", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "showToggleAllCheckbox", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "toggleAllCheckboxChecked", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "toggleAllCheckboxIndeterminate", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "toggleAllCheckboxTooltipMessage", void 0);
    tslib_1.__decorate([
        Input()
    ], MatSelectSearchComponent.prototype, "toogleAllCheckboxTooltipPosition", void 0);
    tslib_1.__decorate([
        Output()
    ], MatSelectSearchComponent.prototype, "toggleAll", void 0);
    tslib_1.__decorate([
        ViewChild('searchSelectInput', { read: ElementRef, static: true })
    ], MatSelectSearchComponent.prototype, "searchSelectInput", void 0);
    tslib_1.__decorate([
        ViewChild('innerSelectSearch', { read: ElementRef, static: true })
    ], MatSelectSearchComponent.prototype, "innerSelectSearch", void 0);
    tslib_1.__decorate([
        ContentChild(MatSelectSearchClearDirective, { static: false })
    ], MatSelectSearchComponent.prototype, "clearIcon", void 0);
    tslib_1.__decorate([
        HostBinding('class.mat-select-search-inside-mat-option')
    ], MatSelectSearchComponent.prototype, "isInsideMatOption", null);
    MatSelectSearchComponent = MatSelectSearchComponent_1 = tslib_1.__decorate([
        Component({
            selector: 'ngx-mat-select-search',
            template: "<!-- Placeholder to adjust vertical offset of the mat-option elements -->\n<input matInput class=\"mat-select-search-input mat-select-search-hidden\"/>\n\n<!-- Note: the  mat-datepicker-content mat-tab-header are needed to inherit the material theme colors, see PR #22 -->\n<div\n      #innerSelectSearch\n      class=\"mat-select-search-inner mat-typography mat-datepicker-content mat-tab-header\"\n      [ngClass]=\"{'mat-select-search-inner-multiple': matSelect.multiple, 'mat-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <mat-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n                [color]=\"matFormField?.color\"\n                class=\"mat-select-search-toggle-all-checkbox\"\n                [checked]=\"toggleAllCheckboxChecked\"\n                [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n                [matTooltip]=\"toggleAllCheckboxTooltipMessage\"\n                matTooltipClass=\"ngx-mat-select-search-toggle-all-tooltip\"\n                [matTooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n                (change)=\"_emitSelectAllBooleanToParent($event.checked)\"\n  ></mat-checkbox>\n\n  <input matInput\n         class=\"mat-select-search-input\"\n         autocomplete=\"off\"\n         [type]=\"type\"\n         [value]=\"value\"\n         #searchSelectInput\n         (keydown)=\"_handleKeydown($event)\"\n         (keyup)=\"_handleKeyup($event)\"\n         (input)=\"onInputChange($event.target.value)\"\n         (blur)=\"onBlur($event.target.value)\"\n         [placeholder]=\"placeholderLabel\"\n         [attr.aria-label]=\"ariaLabel\"\n  />\n  <mat-spinner *ngIf=\"searching\"\n          class=\"mat-select-search-spinner\"\n          diameter=\"16\"></mat-spinner>\n\n  <button mat-button\n          *ngIf=\"value && !searching\"\n          mat-icon-button\n          aria-label=\"Clear\"\n          (click)=\"_reset(true)\"\n          class=\"mat-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[ngxMatSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <mat-icon>close</mat-icon>\n    </ng-template>\n  </button>\n\n  <ng-content select=\".mat-select-search-custom-header-content\"></ng-content>\n\n</div>\n\n<div *ngIf=\"_noEntriesFound()\"\n     class=\"mat-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>\n<!--\nCopyright (c) 2018 Bithost GmbH All Rights Reserved.\n\nUse of this source code is governed by an MIT-style license that can be\nfound in the LICENSE file at https://angular.io/license\n-->\n",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return MatSelectSearchComponent_1; }),
                    multi: true
                }
            ],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mat-select-search-hidden{visibility:hidden}.mat-select-search-inner{position:absolute;top:0;width:100%;border-bottom-width:1px;border-bottom-style:solid;z-index:100;font-size:inherit;box-shadow:none;border-radius:4px 4px 0 0;-webkit-transform:translate3d(0,0,0)}.mat-select-search-inner.mat-select-search-inner-multiple{width:100%}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all{display:flex;align-items:center}.mat-select-search-inner .mat-input-element{flex-basis:auto}.mat-select-search-inner .mat-input-element:-ms-input-placeholder{-ms-user-select:text}::ng-deep .mat-select-search-panel{transform:none!important;overflow-x:hidden}.mat-select-search-input{padding:16px 36px 16px 16px;box-sizing:border-box}.mat-select-search-no-entries-found{padding:16px}.mat-select-search-clear{position:absolute;right:4px;top:5px}.mat-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host.mat-select-search-inside-mat-option .mat-select-search-input{padding-top:0;padding-bottom:0;height:3em;line-height:3em}:host.mat-select-search-inside-mat-option .mat-select-search-clear{top:3px}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search{position:static;padding:0}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search .mat-option-pseudo-checkbox{display:none}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search.mat-select-search-no-entries-found{height:6em}.mat-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}"]
        }),
        tslib_1.__param(0, Inject(MatSelect)),
        tslib_1.__param(3, Optional()), tslib_1.__param(3, Inject(MatOption)),
        tslib_1.__param(5, Optional()), tslib_1.__param(5, Inject(MatFormField))
    ], MatSelectSearchComponent);
    return MatSelectSearchComponent;
}());
export { MatSelectSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdC1zZWxlY3Qtc2VhcmNoLyIsInNvdXJjZXMiOlsibWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUM1RixTQUFTLEVBQ1QsWUFBWSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUM1QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUNMLENBQUMsRUFDRCxDQUFDLEVBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sR0FDL0MsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFVLE1BQU0sZ0JB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QUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7UUFvR2EsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRzNCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRTdCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO09BeEd4Qix3QkFBd0IsQ0FxaUJwQztJQUFELCtCQUFDO0NBQUEsQUFyaUJELElBcWlCQztTQXJpQlksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQml0aG9zdCBHbWJIIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIENvbnRlbnRDaGlsZCwgT3B0aW9uYWwsIEhvc3RCaW5kaW5nLCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRPcHRpb24sIF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3QsIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtcbiAgQSxcbiAgWixcbiAgWkVSTyxcbiAgTklORSxcbiAgU1BBQ0UsIEVORCwgSE9NRSwgVVBfQVJST1csIERPV05fQVJST1csIEVTQ0FQRSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFrZSwgdGFrZVVudGlsLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hdFNlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXQtc2VsZWN0LXNlYXJjaC1jbGVhci5kaXJlY3RpdmUnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgY29tcG9uZW50LXNlbGVjdG9yICovXG4vKipcbiAqIENvbXBvbmVudCBwcm92aWRpbmcgYW4gaW5wdXQgZmllbGQgZm9yIHNlYXJjaGluZyBNYXRTZWxlY3Qgb3B0aW9ucy5cbiAqXG4gKiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGludGVyZmFjZSBCYW5rIHtcbiAqICBpZDogc3RyaW5nO1xuICogIG5hbWU6IHN0cmluZztcbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAtZGF0YS1zZWxlY3Rpb24nLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxtYXQtZm9ybS1maWVsZD5cbiAqICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbF09XCJiYW5rQ3RybFwiIHBsYWNlaG9sZGVyPVwiQmFua1wiPlxuICogICAgICAgICA8bWF0LW9wdGlvbj5cbiAqICAgICAgICAgICA8bmd4LW1hdC1zZWxlY3Qtc2VhcmNoIFtmb3JtQ29udHJvbF09XCJiYW5rRmlsdGVyQ3RybFwiPjwvbmd4LW1hdC1zZWxlY3Qtc2VhcmNoPlxuICogICAgICAgICA8L21hdC1vcHRpb24+XG4gKiAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBiYW5rIG9mIGZpbHRlcmVkQmFua3MgfCBhc3luY1wiIFt2YWx1ZV09XCJiYW5rLmlkXCI+XG4gKiAgICAgICAgICAge3tiYW5rLm5hbWV9fVxuICogICAgICAgICA8L21hdC1vcHRpb24+XG4gKiAgICAgICA8L21hdC1zZWxlY3Q+XG4gKiAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAqICAgYFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBEYXRhU2VsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICpcbiAqICAgLy8gY29udHJvbCBmb3IgdGhlIHNlbGVjdGVkIGJhbmtcbiAqICAgcHVibGljIGJhbmtDdHJsOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICogICAvLyBjb250cm9sIGZvciB0aGUgTWF0U2VsZWN0IGZpbHRlciBrZXl3b3JkXG4gKiAgIHB1YmxpYyBiYW5rRmlsdGVyQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAqXG4gKiAgIC8vIGxpc3Qgb2YgYmFua3NcbiAqICAgcHJpdmF0ZSBiYW5rczogQmFua1tdID0gW3tuYW1lOiAnQmFuayBBJywgaWQ6ICdBJ30sIHtuYW1lOiAnQmFuayBCJywgaWQ6ICdCJ30sIHtuYW1lOiAnQmFuayBDJywgaWQ6ICdDJ31dO1xuICogICAvLyBsaXN0IG9mIGJhbmtzIGZpbHRlcmVkIGJ5IHNlYXJjaCBrZXl3b3JkXG4gKiAgIHB1YmxpYyBmaWx0ZXJlZEJhbmtzOiBSZXBsYXlTdWJqZWN0PEJhbmtbXT4gPSBuZXcgUmVwbGF5U3ViamVjdDxCYW5rW10+KDEpO1xuICpcbiAqICAgLy8gU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gKiAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gKlxuICpcbiAqICAgbmdPbkluaXQoKSB7XG4gKiAgICAgLy8gbG9hZCB0aGUgaW5pdGlhbCBiYW5rIGxpc3RcbiAqICAgICB0aGlzLmZpbHRlcmVkQmFua3MubmV4dCh0aGlzLmJhbmtzLnNsaWNlKCkpO1xuICogICAgIC8vIGxpc3RlbiBmb3Igc2VhcmNoIGZpZWxkIHZhbHVlIGNoYW5nZXNcbiAqICAgICB0aGlzLmJhbmtGaWx0ZXJDdHJsLnZhbHVlQ2hhbmdlc1xuICogICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gKiAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAqICAgICAgICAgdGhpcy5maWx0ZXJCYW5rcygpO1xuICogICAgICAgfSk7XG4gKiAgIH1cbiAqXG4gKiAgIG5nT25EZXN0cm95KCkge1xuICogICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gKiAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gKiAgIH1cbiAqXG4gKiAgIHByaXZhdGUgZmlsdGVyQmFua3MoKSB7XG4gKiAgICAgaWYgKCF0aGlzLmJhbmtzKSB7XG4gKiAgICAgICByZXR1cm47XG4gKiAgICAgfVxuICpcbiAqICAgICAvLyBnZXQgdGhlIHNlYXJjaCBrZXl3b3JkXG4gKiAgICAgbGV0IHNlYXJjaCA9IHRoaXMuYmFua0ZpbHRlckN0cmwudmFsdWU7XG4gKiAgICAgaWYgKCFzZWFyY2gpIHtcbiAqICAgICAgIHRoaXMuZmlsdGVyZWRCYW5rcy5uZXh0KHRoaXMuYmFua3Muc2xpY2UoKSk7XG4gKiAgICAgICByZXR1cm47XG4gKiAgICAgfSBlbHNlIHtcbiAqICAgICAgIHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICogICAgIH1cbiAqXG4gKiAgICAgLy8gZmlsdGVyIHRoZSBiYW5rc1xuICogICAgIHRoaXMuZmlsdGVyZWRCYW5rcy5uZXh0KFxuICogICAgICAgdGhpcy5iYW5rcy5maWx0ZXIoYmFuayA9PiBiYW5rLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgPiAtMSlcbiAqICAgICApO1xuICogICB9XG4gKiB9XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1tYXQtc2VsZWN0LXNlYXJjaCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXQtc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2VsZWN0U2VhcmNoQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIC8qKiBMYWJlbCBvZiB0aGUgc2VhcmNoIHBsYWNlaG9sZGVyICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyTGFiZWwgPSAnU3VjaGUnO1xuXG4gIC8qKiBUeXBlIG9mIHRoZSBzZWFyY2ggaW5wdXQgZmllbGQgKi9cbiAgQElucHV0KCkgdHlwZSA9ICd0ZXh0JztcblxuICAvKiogTGFiZWwgdG8gYmUgc2hvd24gd2hlbiBubyBlbnRyaWVzIGFyZSBmb3VuZC4gU2V0IHRvIG51bGwgaWYgbm8gbWVzc2FnZSBzaG91bGQgYmUgc2hvd24uICovXG4gIEBJbnB1dCgpIG5vRW50cmllc0ZvdW5kTGFiZWwgPSAnS2VpbmUgT3B0aW9uZW4gZ2VmdW5kZW4nO1xuXG4gIC8qKlxuICAgKiAgVGV4dCB0aGF0IGlzIGFwcGVuZGVkIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gbGFiZWwgYW5ub3VuY2VkIGJ5IHNjcmVlbiByZWFkZXJzLFxuICAgKiAgaW5mb3JtaW5nIHRoZSB1c2VyIG9mIHRoZSBjdXJyZW50IGluZGV4LCB2YWx1ZSBhbmQgdG90YWwgb3B0aW9ucy5cbiAgICogIGVnOiBCYW5rIFIgKEdlcm1hbnkpIDEgb2YgNlxuICAqL1xuICBASW5wdXQoKSBpbmRleEFuZExlbmd0aFNjcmVlblJlYWRlclRleHQgPSAnIG9mICc7XG5cbiAgLyoqXG4gICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VhcmNoIGZpZWxkIHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIHRoZSBkcm9wZG93biBtZW51IGlzIGNsb3NlZC5cbiAgICAqIFVzZWZ1bCBmb3Igc2VydmVyLXNpZGUgZmlsdGVyaW5nLiBTZWUgWyMzXShodHRwczovL2dpdGh1Yi5jb20vYml0aG9zdC1nbWJoL25neC1tYXQtc2VsZWN0LXNlYXJjaC9pc3N1ZXMvMylcbiAgICAqL1xuICBASW5wdXQoKSBjbGVhclNlYXJjaElucHV0ID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0byBzaG93IHRoZSBzZWFyY2gtaW4tcHJvZ3Jlc3MgaW5kaWNhdG9yICovXG4gIEBJbnB1dCgpIHNlYXJjaGluZyA9IGZhbHNlO1xuXG4gIC8qKiBEaXNhYmxlcyBpbml0aWFsIGZvY3VzaW5nIG9mIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBASW5wdXQoKSBkaXNhYmxlSW5pdGlhbEZvY3VzID0gZmFsc2U7XG5cbiAgLyoqIEVuYWJsZSBjbGVhciBpbnB1dCBvbiBlc2NhcGUgcHJlc3NlZCAqL1xuICBASW5wdXQoKSBlbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBob21lIC8gZW5kIGtleSBiZWluZyBwcm9wYWdhdGVkIHRvIG1hdC1zZWxlY3QsXG4gICAqIGFsbG93aW5nIHRvIG1vdmUgdGhlIGN1cnNvciB3aXRoaW4gdGhlIHNlYXJjaCBpbnB1dCBpbnN0ZWFkIG9mIG5hdmlnYXRpbmcgdGhlIG9wdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIHByZXZlbnRIb21lRW5kS2V5UHJvcGFnYXRpb24gPSBmYWxzZTtcblxuICAvKiogRGlzYWJsZXMgc2Nyb2xsaW5nIHRvIGFjdGl2ZSBvcHRpb25zIHdoZW4gb3B0aW9uIGxpc3QgY2hhbmdlcy4gVXNlZnVsIGZvciBzZXJ2ZXItc2lkZSBzZWFyY2ggKi9cbiAgQElucHV0KCkgZGlzYWJsZVNjcm9sbFRvQWN0aXZlT25PcHRpb25zQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIC8qKiBBZGRzIDUwOCBzY3JlZW4gcmVhZGVyIHN1cHBvcnQgZm9yIHNlYXJjaCBib3ggKi9cbiAgQElucHV0KCkgYXJpYUxhYmVsID0gJ2Ryb3Bkb3duIHNlYXJjaCc7XG5cbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBTZWxlY3QgQWxsIENoZWNrYm94IChmb3IgbWF0LXNlbGVjdFttdWx0aT10cnVlXSkgKi9cbiAgQElucHV0KCkgc2hvd1RvZ2dsZUFsbENoZWNrYm94ID0gZmFsc2U7XG5cbiAgLyoqIHNlbGVjdCBhbGwgY2hlY2tib3ggY2hlY2tlZCBzdGF0ZSAqL1xuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveENoZWNrZWQgPSBmYWxzZTtcblxuICAvKiogc2VsZWN0IGFsbCBjaGVja2JveCBpbmRldGVybWluYXRlIHN0YXRlICovXG4gIEBJbnB1dCgpIHRvZ2dsZUFsbENoZWNrYm94SW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gIC8qKiBEaXNwbGF5IGEgbWVzc2FnZSBpbiBhIHRvb2x0aXAgb24gdGhlIHRvZ2dsZS1hbGwgY2hlY2tib3ggKi9cbiAgQElucHV0KCkgdG9nZ2xlQWxsQ2hlY2tib3hUb29sdGlwTWVzc2FnZSA9ICcnO1xuXG4gIC8qKiBEZWZpbmUgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIG9uIHRoZSB0b2dnbGUtYWxsIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKSB0b29nbGVBbGxDaGVja2JveFRvb2x0aXBQb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdhYm92ZScgfCAnYmVsb3cnIHwgJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2JlbG93JztcblxuICAvKiogT3V0cHV0IGVtaXR0ZXIgdG8gc2VuZCB0byBwYXJlbnQgY29tcG9uZW50IHdpdGggdGhlIHRvZ2dsZSBhbGwgYm9vbGVhbiAqL1xuICBAT3V0cHV0KCkgdG9nZ2xlQWxsID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBAVmlld0NoaWxkKCdzZWFyY2hTZWxlY3RJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIHNlYXJjaFNlbGVjdElucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBAVmlld0NoaWxkKCdpbm5lclNlbGVjdFNlYXJjaCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGlubmVyU2VsZWN0U2VhcmNoOiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gY3VzdG9tIHNlYXJjaCBpbnB1dCBjbGVhciBpY29uICovXG4gIEBDb250ZW50Q2hpbGQoTWF0U2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhckljb246IE1hdFNlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWF0LXNlbGVjdC1zZWFyY2gtaW5zaWRlLW1hdC1vcHRpb24nKVxuICBnZXQgaXNJbnNpZGVNYXRPcHRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5tYXRPcHRpb247XG4gIH1cblxuICAvKiogQ3VycmVudCBzZWFyY2ggdmFsdWUgKi9cbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XG5cbiAgb25DaGFuZ2U6IEZ1bmN0aW9uID0gKF86IGFueSkgPT4geyB9O1xuICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKF86IGFueSkgPT4geyB9O1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdFNlbGVjdCBvcHRpb25zICovXG4gIHB1YmxpYyBfb3B0aW9uczogUXVlcnlMaXN0PE1hdE9wdGlvbj47XG5cbiAgLyoqIFByZXZpb3VzbHkgc2VsZWN0ZWQgdmFsdWVzIHdoZW4gdXNpbmcgPG1hdC1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj4qL1xuICBwcml2YXRlIHByZXZpb3VzU2VsZWN0ZWRWYWx1ZXM6IGFueVtdO1xuXG4gIC8qKiBFdmVudCB0aGF0IGVtaXRzIHdoZW4gdGhlIGN1cnJlbnQgdmFsdWUgY2hhbmdlcyAqL1xuICBwcml2YXRlIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTWF0U2VsZWN0KSBwdWJsaWMgbWF0U2VsZWN0OiBNYXRTZWxlY3QsXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTWF0T3B0aW9uKSBwdWJsaWMgbWF0T3B0aW9uOiBNYXRPcHRpb24gPSBudWxsLFxuICAgIHByaXZhdGUgbGl2ZUFubm91bmNlcjogTGl2ZUFubm91bmNlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1hdEZvcm1GaWVsZCkgcHVibGljIG1hdEZvcm1GaWVsZDogTWF0Rm9ybUZpZWxkID0gbnVsbFxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHNldCBjdXN0b20gcGFuZWwgY2xhc3NcbiAgICBjb25zdCBwYW5lbENsYXNzID0gJ21hdC1zZWxlY3Qtc2VhcmNoLXBhbmVsJztcbiAgICBpZiAodGhpcy5tYXRTZWxlY3QucGFuZWxDbGFzcykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5tYXRTZWxlY3QucGFuZWxDbGFzcykpIHtcbiAgICAgICAgKDxzdHJpbmdbXT50aGlzLm1hdFNlbGVjdC5wYW5lbENsYXNzKS5wdXNoKHBhbmVsQ2xhc3MpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5tYXRTZWxlY3QucGFuZWxDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5tYXRTZWxlY3QucGFuZWxDbGFzcyA9IFt0aGlzLm1hdFNlbGVjdC5wYW5lbENsYXNzLCBwYW5lbENsYXNzXTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubWF0U2VsZWN0LnBhbmVsQ2xhc3MgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMubWF0U2VsZWN0LnBhbmVsQ2xhc3NbcGFuZWxDbGFzc10gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hdFNlbGVjdC5wYW5lbENsYXNzID0gcGFuZWxDbGFzcztcbiAgICB9XG5cbiAgICAvLyBzZXQgY3VzdG9tIG1hdC1vcHRpb24gY2xhc3MgaWYgdGhlIGNvbXBvbmVudCB3YXMgcGxhY2VkIGluc2lkZSBhIG1hdC1vcHRpb25cbiAgICBpZiAodGhpcy5tYXRPcHRpb24pIHtcbiAgICAgIHRoaXMubWF0T3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubWF0T3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5zLW1hdC1zZWxlY3Qtc2VhcmNoJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJzxuZ3gtbWF0LXNlbGVjdC1zZWFyY2g+IG11c3QgYmUgcGxhY2VkIGluc2lkZSBhIDxtYXQtb3B0aW9uPiBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gd2hlbiB0aGUgc2VsZWN0IGRyb3Bkb3duIHBhbmVsIGlzIG9wZW5lZCBvciBjbG9zZWRcbiAgICB0aGlzLm1hdFNlbGVjdC5vcGVuZWRDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWxheSgxKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG9wZW5lZCkgPT4ge1xuICAgICAgICBpZiAob3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgICAgLy8gZm9jdXMgdGhlIHNlYXJjaCBmaWVsZCB3aGVuIG9wZW5pbmdcbiAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUluaXRpYWxGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2xlYXIgaXQgd2hlbiBjbG9zaW5nXG4gICAgICAgICAgaWYgKHRoaXMuY2xlYXJTZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cblxuICAgIC8vIHNldCB0aGUgZmlyc3QgaXRlbSBhY3RpdmUgYWZ0ZXIgdGhlIG9wdGlvbnMgY2hhbmdlZFxuICAgIHRoaXMubWF0U2VsZWN0Lm9wZW5lZENoYW5nZVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hdFNlbGVjdC5fa2V5TWFuYWdlcikge1xuICAgICAgICAgIHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlU2Nyb2xsVG9BY3RpdmVPbk9wdGlvbnNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RTY3JvbGxUb3BUb0ZpdEFjdGl2ZU9wdGlvbkludG9WaWV3KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdfa2V5TWFuYWdlciB3YXMgbm90IGluaXRpYWxpemVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMubWF0U2VsZWN0Lm9wdGlvbnM7XG5cblxuICAgICAgICAvLyBDbG9zdXJlIHZhcmlhYmxlIGZvciB0cmFja2luZyB0aGUgbW9zdCByZWNlbnQgZmlyc3Qgb3B0aW9uLlxuICAgICAgICAvLyBJbiBvcmRlciB0byBhdm9pZCBhdm9pZCBjYXVzaW5nIHRoZSBsaXN0IHRvXG4gICAgICAgIC8vIHNjcm9sbCB0byB0aGUgdG9wIHdoZW4gb3B0aW9ucyBhcmUgYWRkZWQgdG8gdGhlIGJvdHRvbSBvZlxuICAgICAgICAvLyB0aGUgbGlzdCAoZWc6IGluZmluaXRlIHNjcm9sbCksIHdlIGNvbXBhcmUgb25seVxuICAgICAgICAvLyB0aGUgY2hhbmdlcyB0byB0aGUgZmlyc3Qgb3B0aW9ucyB0byBkZXRlcm1pbmUgaWYgd2VcbiAgICAgICAgLy8gc2hvdWxkIHNldCB0aGUgZmlyc3QgaXRlbSBhcyBhY3RpdmUuXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdW5uY2Vzc2FyeSBzY3JvbGxpbmcgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxuICAgICAgICAvLyB3aGVuIG9wdGlvbnMgYXJlIGFwcGVuZGVkLCBidXQgYWxsb3dzIHRoZSBmaXJzdCBpdGVtXG4gICAgICAgIC8vIGluIHRoZSBsaXN0IHRvIGJlIHNldCBhcyBhY3RpdmUgYnkgZGVmYXVsdCB3aGVuIHRoZXJlXG4gICAgICAgIC8vIGlzIG5vIGFjdGl2ZSBzZWxlY3Rpb25cbiAgICAgICAgbGV0IHByZXZpb3VzRmlyc3RPcHRpb24gPSB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKVt0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKV07XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKChvcHRpb25DaGFuZ2VzOiBRdWVyeUxpc3Q8TWF0T3B0aW9uPikgPT4ge1xuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBRdWVyeUxpc3QgdG8gYW4gYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25DaGFuZ2VzLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgY29uc3Qga2V5TWFuYWdlciA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyO1xuICAgICAgICAgICAgaWYgKGtleU1hbmFnZXIgJiYgdGhpcy5tYXRTZWxlY3QucGFuZWxPcGVuKSB7XG5cbiAgICAgICAgICAgICAgLy8gYXZvaWQgXCJleHByZXNzaW9uIGhhcyBiZWVuIGNoYW5nZWRcIiBlcnJvclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgZmlyc3QgaXRlbSBhY3RpdmUgYW5kIGlucHV0IHdpZHRoXG5cbiAgICAgICAgICAgICAgICAvLyBUaGUgdHJ1ZSBmaXJzdCBpdGVtIGlzIG9mZnNldCBieSAxXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEZpcnN0T3B0aW9uID0gb3B0aW9uc1t0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKV07XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGZpcnN0IG9wdGlvbiBpbiB0aGVzZSBjaGFuZ2VzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cy5cbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdE9wdGlvbklzQ2hhbmdlZCA9ICF0aGlzLm1hdFNlbGVjdC5jb21wYXJlV2l0aChwcmV2aW91c0ZpcnN0T3B0aW9uLCBjdXJyZW50Rmlyc3RPcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gQ0FTRTogVGhlIGZpcnN0IG9wdGlvbiBpcyBkaWZmZXJlbnQgbm93LlxuICAgICAgICAgICAgICAgIC8vIEluZGljaWF0ZXMgd2Ugc2hvdWxkIHNldCBpdCBhcyBhY3RpdmUgYW5kIHNjcm9sbCB0byB0aGUgdG9wLlxuICAgICAgICAgICAgICAgIGlmIChmaXJzdE9wdGlvbklzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAga2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgb3VyIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgIHByZXZpb3VzRmlyc3RPcHRpb24gPSBjdXJyZW50Rmlyc3RPcHRpb247XG5cbiAgICAgICAgICAgICAgICAvLyB3YWl0IGZvciBwYW5lbCB3aWR0aCBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBubyBlbnRyaWVzIGZvdW5kIGNsYXNzIG9uIG1hdCBvcHRpb25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRPcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ub0VudHJpZXNGb3VuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0T3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ21hdC1zZWxlY3Qtc2VhcmNoLW5vLWVudHJpZXMtZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0T3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoJ21hdC1zZWxlY3Qtc2VhcmNoLW5vLWVudHJpZXMtZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZVNjcm9sbFRvQWN0aXZlT25PcHRpb25zQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RTY3JvbGxUb3BUb0ZpdEFjdGl2ZU9wdGlvbkludG9WaWV3KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0sIDEpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIGRldGVjdCBjaGFuZ2VzIHdoZW4gdGhlIGlucHV0IGNoYW5nZXNcbiAgICB0aGlzLmNoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcblxuICAgIC8vIHJlc2l6ZSB0aGUgaW5wdXQgd2lkdGggd2hlbiB0aGUgdmlld3BvcnQgaXMgcmVzaXplZCwgaS5lLiB0aGUgdHJpZ2dlciB3aWR0aCBjb3VsZCBwb3RlbnRpYWxseSBiZSByZXNpemVkXG4gICAgdGhpcy5fdmlld3BvcnRSdWxlci5jaGFuZ2UoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWF0U2VsZWN0LnBhbmVsT3Blbikge1xuICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuaW5pdE11bHRpcGxlSGFuZGxpbmcoKTtcbiAgfVxuXG4gIF9lbWl0U2VsZWN0QWxsQm9vbGVhblRvUGFyZW50KHN0YXRlOiBib29sZWFuKSB7XG4gICAgdGhpcy50b2dnbGVBbGwuZW1pdChzdGF0ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIHVwZGF0ZSB2aWV3IHdoZW4gYXZhaWxhYmxlIG9wdGlvbnMgY2hhbmdlXG4gICAgdGhpcy5tYXRTZWxlY3Qub3BlbmVkQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXRTZWxlY3Qub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBfaXNUb2dnbGVBbGxDaGVja2JveFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWF0U2VsZWN0Lm11bHRpcGxlICYmIHRoaXMuc2hvd1RvZ2dsZUFsbENoZWNrYm94O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGtleSBkb3duIGV2ZW50IHdpdGggTWF0U2VsZWN0LlxuICAgKiBBbGxvd3MgZS5nLiBzZWxlY3Rpbmcgd2l0aCBlbnRlciBrZXksIG5hdmlnYXRpb24gd2l0aCBhcnJvdyBrZXlzLCBldGMuXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBQcmV2ZW50IHByb3BhZ2F0aW9uIGZvciBhbGwgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgaW4gb3JkZXIgdG8gYXZvaWQgc2VsZWN0aW9uIGlzc3Vlc1xuICAgIGlmICgoZXZlbnQua2V5ICYmIGV2ZW50LmtleS5sZW5ndGggPT09IDEpIHx8XG4gICAgICAoZXZlbnQua2V5Q29kZSA+PSBBICYmIGV2ZW50LmtleUNvZGUgPD0gWikgfHxcbiAgICAgIChldmVudC5rZXlDb2RlID49IFpFUk8gJiYgZXZlbnQua2V5Q29kZSA8PSBOSU5FKSB8fFxuICAgICAgKGV2ZW50LmtleUNvZGUgPT09IFNQQUNFKVxuICAgICAgfHwgKHRoaXMucHJldmVudEhvbWVFbmRLZXlQcm9wYWdhdGlvbiAmJiAoZXZlbnQua2V5Q29kZSA9PT0gSE9NRSB8fCBldmVudC5rZXlDb2RlID09PSBFTkQpKVxuICAgICkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGlmIGNsaWNrIEVzY2FwZSwgaWYgaW5wdXQgaXMgZW1wdHksIGNsb3NlIHRoZSBkcm9wZG93biwgaWYgbm90LCBlbXB0eSBvdXQgdGhlIHNlYXJjaCBmaWVsZFxuICAgIGlmICh0aGlzLmVuYWJsZUNsZWFyT25Fc2NhcGVQcmVzc2VkID09PSB0cnVlICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLl9yZXNldCh0cnVlKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBrZXkgdXAgZXZlbnQgd2l0aCBNYXRTZWxlY3QuXG4gICAqIEFsbG93cyBlLmcuIHRoZSBhbm5vdW5jaW5nIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlRGVzY2VuZGFudCBieSBzY3JlZW4gcmVhZGVycy5cbiAgICovXG4gIF9oYW5kbGVLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVyB8fCBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICBjb25zdCBhcmlhQWN0aXZlRGVzY2VuZGFudElkID0gdGhpcy5tYXRTZWxlY3QuX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IGFyaWFBY3RpdmVEZXNjZW5kYW50SWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBhY3RpdmVEZXNjZW5kYW50ID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KClbaW5kZXhdO1xuICAgICAgICB0aGlzLmxpdmVBbm5vdW5jZXIuYW5ub3VuY2UoXG4gICAgICAgICAgYWN0aXZlRGVzY2VuZGFudC52aWV3VmFsdWUgKyAnICdcbiAgICAgICAgICArIHRoaXMuZ2V0QXJpYUluZGV4KGluZGV4KVxuICAgICAgICAgICsgdGhpcy5pbmRleEFuZExlbmd0aFNjcmVlblJlYWRlclRleHRcbiAgICAgICAgICArIHRoaXMuZ2V0QXJpYUxlbmd0aCgpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgb3B0aW9uLCB0YWtpbmcgdGhlIG9mZnNldCB0byBsZW5ndGggaW50byBhY2NvdW50LlxuICAgKiBleGFtcGxlczpcbiAgICogICAgQ2FzZSAxIFtTZWFyY2gsIDEsIDIsIDNdIHdpbGwgaGF2ZSBvZmZzZXQgb2YgMSwgZHVlIHRvIHNlYXJjaCBhbmQgd2lsbCByZWFkIGluZGV4IG9mIHRvdGFsLlxuICAgKiAgICBDYXNlIDIgWzEsIDIsIDNdIHdpbGwgaGF2ZSBvZmZzZXQgb2YgMCBhbmQgd2lsbCByZWFkIGluZGV4ICsxIG9mIHRvdGFsLlxuICAgKi9cbiAgZ2V0QXJpYUluZGV4KG9wdGlvbkluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG9wdGlvbkluZGV4ICsgMTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbkluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBvcHRpb25zLCB0YWtpbmcgdGhlIG9mZnNldCB0byBsZW5ndGggaW50byBhY2NvdW50LlxuICAgKiBleGFtcGxlczpcbiAgICogICAgQ2FzZSAxIFtTZWFyY2gsIDEsIDIsIDNdIHdpbGwgaGF2ZSBsZW5ndGggb2Ygb3B0aW9ucy5sZW5ndGggLTEsIGR1ZSB0byBzZWFyY2guXG4gICAqICAgIENhc2UgMiBbMSwgMiwgM10gd2lsbCBoYXZlIGxlbmd0aCBvZiBvcHRpb25zLmxlbmd0aC5cbiAgICovXG4gIGdldEFyaWFMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy50b0FycmF5KCkubGVuZ3RoIC0gdGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2YWx1ZUNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5fdmFsdWU7XG4gICAgaWYgKHZhbHVlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UodmFsdWUpIHtcbiAgICBjb25zdCB2YWx1ZUNoYW5nZWQgPSB2YWx1ZSAhPT0gdGhpcy5fdmFsdWU7XG4gICAgaWYgKHZhbHVlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5pbml0TXVsdGlTZWxlY3RlZFZhbHVlcygpO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25CbHVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUodmFsdWUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbikge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbikge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgc2VhcmNoIGlucHV0IGZpZWxkXG4gICAqL1xuICBwdWJsaWMgX2ZvY3VzKCkge1xuICAgIGlmICghdGhpcy5zZWFyY2hTZWxlY3RJbnB1dCB8fCAhdGhpcy5tYXRTZWxlY3QucGFuZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2F2ZSBhbmQgcmVzdG9yZSBzY3JvbGxUb3Agb2YgcGFuZWwsIHNpbmNlIGl0IHdpbGwgYmUgcmVzZXQgYnkgZm9jdXMoKVxuICAgIC8vIG5vdGU6IHRoaXMgaXMgaGFja3lcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMubWF0U2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gcGFuZWwuc2Nyb2xsVG9wO1xuXG4gICAgLy8gZm9jdXNcbiAgICB0aGlzLnNlYXJjaFNlbGVjdElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgIHBhbmVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGN1cnJlbnQgc2VhcmNoIHZhbHVlXG4gICAqIEBwYXJhbSBmb2N1cyB3aGV0aGVyIHRvIGZvY3VzIGFmdGVyIHJlc2V0dGluZ1xuICAgKi9cbiAgcHVibGljIF9yZXNldChmb2N1cz86IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoU2VsZWN0SW5wdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZWFyY2hTZWxlY3RJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5vbklucHV0Q2hhbmdlKCcnKTtcbiAgICBpZiAodGhpcy5tYXRPcHRpb24gJiYgIWZvY3VzKSB7XG4gICAgICAvLyByZW1vdmUgbm8gZW50cmllcyBmb3VuZCBjbGFzcyBvbiBtYXQgb3B0aW9uXG4gICAgICB0aGlzLm1hdE9wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKCdtYXQtc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kJyk7XG4gICAgfVxuICAgIGlmIChmb2N1cykge1xuICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBoYW5kbGluZyA8bWF0LXNlbGVjdCBbbXVsdGlwbGVdPVwidHJ1ZVwiPlxuICAgKiBOb3RlOiB0byBpbXByb3ZlIHRoaXMgY29kZSwgbWF0LXNlbGVjdCBzaG91bGQgYmUgZXh0ZW5kZWQgdG8gYWxsb3cgZGlzYWJsaW5nIHJlc2V0dGluZyB0aGUgc2VsZWN0aW9uIHdoaWxlIGZpbHRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgaW5pdE11bHRpcGxlSGFuZGxpbmcoKSB7XG4gICAgLy8gaWYgPG1hdC1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAvLyBzdG9yZSBwcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyBhbmQgcmVzdG9yZSB0aGVtIHdoZW4gdGhleSBhcmUgZGVzZWxlY3RlZFxuICAgIC8vIGJlY2F1c2UgdGhlIG9wdGlvbiBpcyBub3QgYXZhaWxhYmxlIHdoaWxlIHdlIGFyZSBjdXJyZW50bHkgZmlsdGVyaW5nXG4gICAgdGhpcy5tYXRTZWxlY3QudmFsdWVDaGFuZ2VcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWVzKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1hdFNlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICAgIGxldCByZXN0b3JlU2VsZWN0ZWRWYWx1ZXMgPSBmYWxzZTtcbiAgICAgICAgICBpZiAodGhpcy5fdmFsdWUgJiYgdGhpcy5fdmFsdWUubGVuZ3RoXG4gICAgICAgICAgICAmJiB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlcyB8fCAhQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5tYXRTZWxlY3Qub3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMuZm9yRWFjaChwcmV2aW91c1ZhbHVlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCF2YWx1ZXMuc29tZSh2ID0+IHRoaXMubWF0U2VsZWN0LmNvbXBhcmVXaXRoKHYsIHByZXZpb3VzVmFsdWUpKVxuICAgICAgICAgICAgICAgICYmICFvcHRpb25WYWx1ZXMuc29tZSh2ID0+IHRoaXMubWF0U2VsZWN0LmNvbXBhcmVXaXRoKHYsIHByZXZpb3VzVmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIGEgdmFsdWUgdGhhdCB3YXMgc2VsZWN0ZWQgYmVmb3JlIGlzIGRlc2VsZWN0ZWQgYW5kIG5vdCBmb3VuZCBpbiB0aGUgb3B0aW9ucywgaXQgd2FzIGRlc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAvLyBkdWUgdG8gdGhlIGZpbHRlcmluZywgc28gd2UgcmVzdG9yZSBpdC5cbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXN0b3JlU2VsZWN0ZWRWYWx1ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzdG9yZVNlbGVjdGVkVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLm1hdFNlbGVjdC5fb25DaGFuZ2UodmFsdWVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdGhlIGN1cnJlbnRseSBhY3RpdmUgb3B0aW9uIGludG8gdGhlIHZpZXcgaWYgaXQgaXMgbm90IHlldCB2aXNpYmxlLlxuICAgKi9cbiAgcHJpdmF0ZSBhZGp1c3RTY3JvbGxUb3BUb0ZpdEFjdGl2ZU9wdGlvbkludG9WaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hdFNlbGVjdC5wYW5lbCAmJiB0aGlzLm1hdFNlbGVjdC5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG1hdE9wdGlvbkhlaWdodCA9IHRoaXMuZ2V0TWF0T3B0aW9uSGVpZ2h0KCk7XG4gICAgICBjb25zdCBhY3RpdmVPcHRpb25JbmRleCA9IHRoaXMubWF0U2VsZWN0Ll9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCB8fCAwO1xuICAgICAgY29uc3QgbGFiZWxDb3VudCA9IF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKGFjdGl2ZU9wdGlvbkluZGV4LCB0aGlzLm1hdFNlbGVjdC5vcHRpb25zLCB0aGlzLm1hdFNlbGVjdC5vcHRpb25Hcm91cHMpO1xuICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBpcyBpbiBhIE1hdE9wdGlvbiwgdGhlIGFjdGl2ZUl0ZW1JbmRleCB3aWxsIGJlIG9mZnNldCBieSBvbmUuXG4gICAgICBjb25zdCBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldyA9ICh0aGlzLm1hdE9wdGlvbiA/IC0xIDogMCkgKyBsYWJlbENvdW50ICsgYWN0aXZlT3B0aW9uSW5kZXg7XG4gICAgICBjb25zdCBjdXJyZW50U2Nyb2xsVG9wID0gdGhpcy5tYXRTZWxlY3QucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgIGNvbnN0IHNlYXJjaElucHV0SGVpZ2h0ID0gdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgIGNvbnN0IGFtb3VudE9mVmlzaWJsZU9wdGlvbnMgPSBNYXRoLmZsb29yKChTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCAtIHNlYXJjaElucHV0SGVpZ2h0KSAvIG1hdE9wdGlvbkhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGluZGV4T2ZGaXJzdFZpc2libGVPcHRpb24gPSBNYXRoLnJvdW5kKChjdXJyZW50U2Nyb2xsVG9wICsgc2VhcmNoSW5wdXRIZWlnaHQpIC8gbWF0T3B0aW9uSGVpZ2h0KSAtIDE7XG5cbiAgICAgIGlmIChpbmRleE9mRmlyc3RWaXNpYmxlT3B0aW9uID49IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3KSB7XG4gICAgICAgIHRoaXMubWF0U2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gaW5kZXhPZk9wdGlvblRvRml0SW50b1ZpZXcgKiBtYXRPcHRpb25IZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4T2ZGaXJzdFZpc2libGVPcHRpb24gKyBhbW91bnRPZlZpc2libGVPcHRpb25zIDw9IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3KSB7XG4gICAgICAgIHRoaXMubWF0U2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gKGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ICsgMSkgKiBtYXRPcHRpb25IZWlnaHRcbiAgICAgICAgICAtIChTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCAtIHNlYXJjaElucHV0SGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIFNldCB0aGUgd2lkdGggb2YgdGhlIGlubmVyU2VsZWN0U2VhcmNoIHRvIGZpdCBldmVuIGN1c3RvbSBzY3JvbGxiYXJzXG4gICAqICBBbmQgc3VwcG9ydCBhbGwgT3BlcmF0aW9uIFN5c3RlbXNcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJbnB1dFdpZHRoKCkge1xuICAgIGlmICghdGhpcy5pbm5lclNlbGVjdFNlYXJjaCB8fCAhdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgcGFuZWxFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYXQtc2VsZWN0LXBhbmVsJykpIHtcbiAgICAgICAgcGFuZWxFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYW5lbEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHBhbmVsRWxlbWVudC5jbGllbnRXaWR0aCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRNYXRPcHRpb25IZWlnaHQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5tYXRTZWxlY3Qub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXRTZWxlY3Qub3B0aW9ucy5maXJzdC5fZ2V0SG9zdEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogIEluaXRpYWxpemUgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzIG9uY2UgdGhlIGZpcnN0IGZpbHRlcmluZyBvY2N1cnMuXG4gICAqL1xuICBpbml0TXVsdGlTZWxlY3RlZFZhbHVlcygpIHtcbiAgICBpZiAodGhpcy5tYXRTZWxlY3QubXVsdGlwbGUgJiYgIXRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgPSB0aGlzLm1hdFNlbGVjdC5vcHRpb25zXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZClcbiAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBcIm5vIGVudHJpZXMgZm91bmRcIiBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWRcbiAgICovXG4gIHB1YmxpYyBfbm9FbnRyaWVzRm91bmQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9vcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubm9FbnRyaWVzRm91bmRMYWJlbCAmJiB0aGlzLnZhbHVlICYmIHRoaXMuX29wdGlvbnMubGVuZ3RoID09PSB0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIG9mZnNldCB0byBsZW5ndGggdGhhdCBjYW4gYmUgY2F1c2VkIGJ5IHRoZSBvcHRpb25hbCBtYXRPcHRpb24gdXNlZCBhcyBhIHNlYXJjaCBpbnB1dC5cbiAgICovXG4gIHByaXZhdGUgZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm1hdE9wdGlvbikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=