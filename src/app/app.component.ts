import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['name', 'email', 'phone', 'delete'];

  data: any = []
  dataSource = this.data;
  genId = 0;
  isEdit: boolean = false;
  editRecords: any = {};

  getErrorMessage() {
    if (this.email.hasError('required') || (this.name.hasError('required'))) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  saveform() {

    if (this.dataSource.length === 0) {
      console.log('If')
      this.genId = 0;
    }
    else {
      console.log('else')
      this.genId = (this.dataSource[this.dataSource.length - 1].id) + 1

    }
    console.log(this.genId, 'Iddd')
    let obj = {
      id: this.genId,
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      isEdit: this.isEdit,
    }
    this.dataSource = [...this.dataSource, obj];
    console.log(this.dataSource)
  }
  delete(id: any) {
    this.dataSource = this.dataSource.filter((v: any) => v.id != id)
  }
  edit(id: any) {
    this.isEdit = true
    console.log('this', this.name.value)
    let edit = this.dataSource.find((v: any) => v.id == id)
    this.editRecords.name = edit.name
    this.editRecords.email = edit.email
    this.editRecords.phone = edit.phone,
    this.editRecords.id=id

    console.log('edit', edit)
  }
  update() {
    this.isEdit = false
    let id=this.editRecords.id
    this.dataSource[id]=this.editRecords
    console.log('Update', this.dataSource)
  }

}
