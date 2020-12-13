import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})

export class ImageService {
    private baseUrl = environment.url;

    constructor(private http: HttpService) { }   

    getData(val) {
        return this.http.FileUpload(this.baseUrl + Constants.getData, val);
    }

}