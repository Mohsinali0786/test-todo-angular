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
  ngOnInit() {

  }
  ngDoCheck() {
    console.log('ngOnChanges')
    if (this.name.value && this.email.value && !this.email.invalid && this.phone.value && !this.isEdit) {
    console.log('ngOnChanges inside if')

      this.disabled = false
    }
    else{
      this.disabled=true
    }

  }
  checkinputFields() {


  }
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['name', 'email', 'phone', 'delete'];
  data: any = [{ id: 123, name: 'Ahmed', email: 'ahmed@live.com', phone: 12223 },
  { id: 321, name: 'Saad', email: 'saad@live.com', phone: 1221111 }
  ]
  dataSource = this.data;
  genId = 0;
  isEdit: boolean = false;
  editRecords: any = {};
  disabled: boolean = true;

  getErrorMessage() {
    if (this.email.hasError('required') || (this.name.hasError('required'))) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  saveform() {

    let id_gen = Math.floor(Math.random() * 1000);
    if (id_gen > 99) {
      let obj = {
        id: id_gen,
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        isEdit: this.isEdit,
      }
      let isExist=this.dataSource.find((v:any)=>v.email==obj.email)
      console.log('isExist',isExist)
      if(!isExist){
        this.dataSource = [...this.dataSource, obj];
      }
      else{
        alert('Record already exist')
      }
    }
    this.name.setValue('');
    this.email.setValue('');
    this.phone.setValue('');
    this.disabled=true
  }
  delete(id: any) {
    this.dataSource = this.dataSource.filter((v: any) => v.id != id)
  }
  edit(id: any) {
    this.isEdit = true;
    this.disabled=true;
    let findRecIndex = this.dataSource.findIndex((v: any) => v.id == id)
    console.log('finalRec', this.disabled)
    this.name.setValue(this.dataSource[findRecIndex].name);
    this.email.setValue(this.dataSource[findRecIndex].email);
    this.phone.setValue(this.dataSource[findRecIndex].phone);
    this.dataSource[findRecIndex].isEdit=true
  }
  update(id: any) {
    this.isEdit = false
    let findRecIndex = this.dataSource.findIndex((v: any) => v.id == id)
    this.dataSource[findRecIndex].name = this.name.value
    this.dataSource[findRecIndex].email = this.email.value
    this.dataSource[findRecIndex].phone = this.phone.value
    this.dataSource[findRecIndex].isEdit=false
    this.name.setValue('');
    this.email.setValue('');
    this.phone.setValue('');
  }

}
