import { Component, OnInit } from '@angular/core';
import { Config } from './models/config.model'
import { post, responseIsJson, getFileNameFromResponse, saveBlob, cloneDeep } from './shared/utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    url:string = '';
    message:string = '';
    loading:boolean = false;
    showConfig:boolean = false;
    config:Config = null;
    configCopy:Config = null;

    ngOnInit() {
        const storageItem = localStorage.getItem('config');
        if (storageItem) {
            this.config = JSON.parse(storageItem);
        } else {
            this.config = new Config();
            this.config.fileType = 'pdf';
            this.config.paperType = 'a4';
            this.config.paperOrientation = 'portrait';
            this.config.imageType = 'jpg';
            this.config.paperWidth = null;
            this.config.paperHeight = null;
            this.config.paperUnitName = 'cm';
            this.config.imageWidth = null;
            this.config.imageHeight = null;
        }
    }

    get fileType() {
        return this.config.fileType.toLowerCase() == 'image' && this.config.imageType ? this.config.imageType.toUpperCase() : 'PDF';
    }

    download() : void {
        if (!this.url) {
            this.message = 'Website URL is empty.';
            return;
        }
        if (this.loading) {
            return;
        }
        this.config.url = this.url;
        let fileName = `File.${this.config.fileType}`;
        let self = this;
        this.loading = true
        this.message = '';
        post('api/converter/converthtmltopdf', this.config)
            .then(response => {
                if (!response.ok) {
                    throw response.statusText || 'Server Error.';
                }
                if (responseIsJson(response)) {
                    throw response.json();
                }
                fileName = getFileNameFromResponse(response);
                return response.blob();
            })
            .then(blob => {
                if (blob.size > 0) {
                    saveBlob(blob, fileName);
                } else {
                    self.message = 'Response is empty.';
                }
                self.loading = false;
            })
            .catch(error => {
                if (typeof(error) == 'string') {
                    self.message = error;
                    self.loading = false;
                } else {
                    error.then((r: any) => {
                        if (r.message) {
                            self.message = r.message;
                        }
                        self.loading = false;
                    });
                }
            });
    }

    showConfigDialog() : void {
        if (this.loading) {
            return;
        }
        this.configCopy = cloneDeep(this.config);
        this.showConfig = true;
    }

    cancelConfigDialog() : void {
        this.showConfig = false;
    }

    saveConfigDialog(config:Config) : void {
        this.config = cloneDeep(config);
        this.config.url = '';
        localStorage.setItem('config', JSON.stringify(this.config))
        this.showConfig = false;
    }
}