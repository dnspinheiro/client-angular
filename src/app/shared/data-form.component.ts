import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './service/crud-service';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-data-form',
  template: '<div></div>',
  // styleUrls: ['./data-form.component.css']
})
export abstract class DataFormComponent extends CrudService {
  formulario: FormGroup;
  // variavel que recebe dados do get entidade
  resources: any;
  files: Set<File>;
  progress = 0;

  constructor(protected injector: Injector, protected ENDPOINT: String) {
    super(injector, `${environment.api + ENDPOINT}`);
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
      console.log('rsc', data);

      this.resources = data;
    });
    // throw new Error("Method not implemented.");
  }

  OnDelete(_item) {
    this.remove(_item.id).subscribe(data => {
      console.log('deleted');
      this.list();
    });
    // throw new Error("Method not implemented.");
  }

  // primeira funcao executada no click do botão enviar
  onSubmit() {
    // console.log(this.formulario);
    if (this.formulario.valid) {
      if (this.files && this.files.size > 0) {
        this.upload(this.files).subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          console.log(event);
          if (event.type == HttpEventType.Response) {
            console.log('upload concluído');
            // submit adicionado aqui, quando existir upload de arquivo
            // this.submit();
          } else if (event.type == HttpEventType.UploadProgress) {
            const percent = Math.round((event.loaded * 100) / event.total);
            console.log('progresso', percent);
            this.progress = percent;
          }
        });
      }
      // adiciona submit aqui quando não existir campo para arquivo em form
      this.submit();
    } else {
      this.validForm();
    }
  }

  // quando seleciona arquivo para carregamento
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
    // reset de progress bar quando há mais de um arquivo
    this.progress = 0;
  }

  // indica os campos que estão inválidos quando clicka no botão de enviar
  validForm() {
    console.log('form invalido', this.formulario);
    Object.keys(this.formulario.controls).forEach(campo => {
      const controle = this.formulario.get(campo);
      controle.markAsTouched();
    });
  }

  // limpa form e carrega novos dados em form
  carregarDadosForm(item) {
    this.cancelar();
    this.formulario.patchValue(item);
  }

  cancelar() {
    this.formulario.reset();
  }

  // validação de mensagem para campo de email
  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  // validação de campo obrigatório, retorna classe de erro do bootstrap
  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  // validação de campo se foi tocado, para campos obrigatórios
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }
}
