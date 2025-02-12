import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from './customer.dto';
import { CustomerserviceService } from './customerservice.service';

@Component({
  selector: 'app-customer-list',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  myform!: FormGroup;
  customerList: Customer[] = [];
  cobj: Customer = {};
  btnname: string = "Save";
  status: boolean = false;

  constructor(private fb: FormBuilder, private cservice: CustomerserviceService) {
    this.myform = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      email: ["", Validators.required],
      age: ["", Validators.required]
    })
    this.showCustomerList();
  }
  get id() { return this.myform.get("id"); }
  get name() { return this.myform.get("name"); }
  get email() { return this.myform.get("email"); }
  get age() { return this.myform.get("age") }

  showCustomerList() {
    this.cservice.getCustomerList().subscribe(result => {
      this.customerList = result;
      console.log(this.customerList);
    });
  }
  saveCustomer() {

    if (this.btnname == "Save") {
      this.cobj = this.myform.value;
      this.cservice.addCustomer(this.cobj).subscribe(result => {
        this.showCustomerList()
      })
      this.clearFields();
    }
    else {
      this.cobj = this.myform.value;
      this.cservice.updateCustomer(this.cobj).subscribe(result => {
        this.showCustomerList()
      })
      this.btnname = "Save"
      this.status = false;
    }
    this.clearFields();
  }
  removeCustomer(id: any) {
    this.cservice.deleteCustomer(id).subscribe(result => {
      this.showCustomerList();
    });
  }
  editCustomer(c: any) {
    this.myform = this.fb.group({
      id: [c.id],
      name: [c.name],
      email: [c.email],
      age: [c.age]
    });
    this.btnname = 'Update'
    this.status = true;
  }
  clearFields() {
    this.myform = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      age: ['']
    });
  }
}
