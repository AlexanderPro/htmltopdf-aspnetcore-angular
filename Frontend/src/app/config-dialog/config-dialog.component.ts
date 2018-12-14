import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Config } from '../models/config.model'

@Component({
    selector: 'config-dialog',
    templateUrl: './config-dialog.component.html'
})
export class ConfigDialogComponent {
    @Input() show: boolean;
    @Input() data: Config;

    @Output() canceled = new EventEmitter<any>();
    @Output() saved = new EventEmitter<Config>();

    fileTypes: { text: string, value: string }[] = [
        {text: 'Pdf', value: 'pdf'},
        {text: 'Image', value: 'image'}
    ];

    paperTypes: { text: string, value: string }[] = [
        {text: 'Custom', value: 'custom'},
        {text: 'A3', value: 'a3'},
        {text: 'A4', value: 'a4'},
        {text: 'A5', value: 'a5'},
        {text: 'Legal', value: 'legal'},
        {text: 'Letter', value: 'letter'},
        {text: 'Tabloid', value: 'tabloid'}
    ];

    paperOrientations: { text: string, value: string }[] = [
        {text: 'Portrait', value: 'portrait'},
        {text: 'Landscape', value: 'landscape'}
    ];

    paperUnitNames: { text: string, value: string }[] = [
        {text: 'CM', value: 'cm'},
        {text: 'IN', value: 'in'}
    ];

    imageTypes: { text: string, value: string }[] = [
        {text: 'JPG', value: 'jpg'},
        {text: 'PNG', value: 'png'}
    ];

    @HostListener('document:keydown', ['$event'])
    onKeyDown(event:KeyboardEvent) {
        if (event.keyCode == 27 && this.show) {
            this.canceled.emit();
        }
    }

    cancel() {
        this.canceled.emit();
    }

    save() {
        this.saved.emit(this.data);
    }

    dropDownOnChanged(fieldName:string, value:any) {
        if (typeof fieldName == 'string' && typeof value == 'string') {
            this.data[fieldName] = value;
        }
    }
}