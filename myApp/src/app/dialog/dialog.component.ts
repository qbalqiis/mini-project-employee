import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import {MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  employeeForm !: FormGroup;
  actionBtn: string ='Save'
  currentDate: any = new Date();

  constructor(private formBuilder: FormBuilder,
              private employee: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef :MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      group: ['', Validators.required],
      status: ['', Validators.required],
      salary: ['', Validators.required],
      description: ['', Validators.required]
    })
    if(this.editData){
      this.actionBtn ="Update";
      this.employeeForm.controls['userName'].setValue(this.editData.userName);
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['birthDate'].setValue(this.editData.birthDate);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['group'].setValue(this.editData.group);
      this.employeeForm.controls['status'].setValue(this.editData.status);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
      this.employeeForm.controls['description'].setValue(this.editData.description);
    }

  }

  addEmployee() {
   if(this.editData){
     if (this.employeeForm.valid) {
       this.employee.postEmployee(this.employeeForm.value)
         .subscribe({
           next: (res) => {
             alert("Data employee added successfully")
             this.employeeForm.reset();
             this.dialogRef.close('save');
           },
           error: () => {
             alert("Error while adding the data employee");
           }
         })
     }
   }else{
     this.updateEmployee()
   }
  }
  updateEmployee(){
    this.employee.putEmployee(this.employeeForm.value,this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Data update Successfully");
          this.employeeForm.reset();
          this.dialogRef.close('update')
        },
        error: () => {
          alert("Error while updating the record")

        }
      })
  }
}
