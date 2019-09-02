import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './service/crud-service';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-form',
  template: '<div></div>',
  // styleUrls: ['./data-form.component.css']
})
export abstract class DataFormComponent extends CrudService {
  formulario: FormGroup;
  resources: any;
  files: Set<File>;
  progress = 0;

  constructor(protected http: HttpClient, protected ENDPOINT: String) {
    super(http, `${environment.api + ENDPOINT}`);
  }

  submit() {
    // this.getCampo('data').setValue(this.getCampo('data').value.replace(/\//g, ""));
    this.save(
      this.formulario.value).subscribe(dados => {
        this.cancelar();
        this.list();
      }, (error) => alert('error'));
    // throw new Error("Method not implemented.");
  }

  list() {
    this.listAll().subscribe(data => {
      this.resources = data;
    });
    // throw new Error("Method not implemented.");
  }

  delete(id) {
    this.remove(id).subscribe(data => {
      console.log('deleted');
      this.list();
    });
    // throw new Error("Method not implemented.");
  }

  onSubmit() {
    // console.log(this.formulario);
    if (this.formulario.valid) {
      if (this.files && this.files.size > 0) {
        this.upload(this.files).subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          console.log(event);
          if (event.type == HttpEventType.Response) {
            console.log('upload concluído');
          } else if (event.type == HttpEventType.UploadProgress) {
            const percent = Math.round((event.loaded * 100) / event.total);
            console.log('progresso', percent);
            this.progress = percent;
          }
        });
      }
      this.submit();
    } else {
      this.validForm();
    }
  }

  onChange(event) {
    const selectFiles = <FileList>event.srcElement.files;
    // document.getElementById('filesLabel').innerHTML = selectFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectFiles.length; i++) {
      fileNames.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);
    }
    document.getElementById('filesLabel').innerHTML = fileNames.join(", ");
    this.progress = 0;
  }

  validForm() {
    console.log('form invalido', this.formulario);
    Object.keys(this.formulario.controls).forEach(campo => {
      const controle = this.formulario.get(campo);
      controle.markAsTouched();
    });
  }

  carregarDadosForm(item) {
    this.cancelar();
    this.formulario.patchValue(item);
  }

  cancelar() {
    this.formulario.reset();
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }
}
