import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

export class CrudService {
    constructor(protected http: HttpClient, private API_URL) {

    }

    listAll() {
        return this.http.get<[]>(this.API_URL)
            .pipe(
                delay(1000), tap(console.log)
            );
    }

    loadByID(id) {
        return this.http.get(`${this.API_URL}/${id}`).pipe(take(1));
    }

    private create(record) {
        return this.http.post(this.API_URL, record).pipe(take(1));
    }

    private update(record) {
        return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
    }

    upload(files: Set<File>) {
        const formData = new FormData();
        files.forEach(file => formData.append('file', file, file.name));

        return this.http.post(`${this.API_URL}`, formData, {
            observe: 'events',
            reportProgress: true
        });
    }

    save(record) {
        console.log('record', record);

        if (record['id']) {
            return this.update(record);
        }
        return this.create(record);
    }

    remove(id) {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
    }
}
