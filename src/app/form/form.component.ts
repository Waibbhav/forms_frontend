import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  userForm!: FormGroup;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.apiService
        .post('/user/create', this.userForm.value)
        .subscribe(
          (res:any) => {
            this.apiService.alert(res.message, "success")
          },
          (error) => {
             this.apiService.alert("Failed to add user account", 'error');
            console.error('Error:', error);
          }
        );
    }
  }
}