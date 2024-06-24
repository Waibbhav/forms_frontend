import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;
  userData: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.apiService.get(`/user/get/${this.userId}`).subscribe((res: any) => {
          this.userData = res.data;
          this.populateForm();
        });
      }
    });
  }

  populateForm() {
    if (this.userData) {
      this.userForm.patchValue({
        fullName: this.userData.fullName,
        email: this.userData.email,
        address: this.userData.address,
        phone: this.userData.phone,
      });
    }
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.userForm.value, id: this.userId };
      this.apiService.post('/user/update', updatedUser).subscribe(
        (res: any) => {
          this.apiService.alert(res.message, 'success');
          this.router.navigate(['/']);
        },
        (error) => {
          this.apiService.alert('Failed to update user account', 'error');
          console.error('Error:', error);
        }
      );
    }
  }
}
