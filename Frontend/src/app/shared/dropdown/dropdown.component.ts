import {Component, ElementRef, AfterViewInit, Output, EventEmitter, Input, Self} from '@angular/core';
import {ControlValueAccessor, NgModel} from '@angular/forms';
declare var $: any;
@Component({
    selector: 'dropdown',
    template: `
        <select class="ui dropdown" [(ngModel)]="selectedOption">
            <option *ngFor="let item of items" [value]="item[valueField]">{{item[textField]}}</option>
        </select>
    `,
    providers: [NgModel]
})
export class DropdownComponent implements AfterViewInit, ControlValueAccessor {
    @Input() valueField: string;
    @Input() textField: string;
    @Input() items: any[] = [];
    @Output() change: EventEmitter<string> = new EventEmitter<string>();
    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    private _selectedOption: string = '';
    get selectedOption(): string {
        return this._selectedOption;
    }
    @Input()
    set selectedOption(option: string){
        if(option === this._selectedOption) return;
        this._selectedOption = option;
        this.writeValue(option);
    }

    constructor(private parentElement: ElementRef, @Self() private self: NgModel){
        this.self.valueAccessor = this;
    }
    ngAfterViewInit(): void {
        /*let selectElement: HTMLElement = this.parentElement.nativeElement.children[0];
        console.log(this.parentElement, selectElement);
        $(selectElement).dropdown();*/
    }
    writeValue (value: string): void {
        this.self.viewToModelUpdate(value);
        this.change.emit(value);
    }
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}