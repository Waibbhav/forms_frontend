import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  userForm!: FormGroup;
  userId: string | null = null;
  userData: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.apiService.get(`/user/get/${this.userId}`).subscribe((res: any) => {
        this.userData = res.data;
        console.log(this.userData);
        this.formInit();
      });
    });
  }

  formInit() {
    this.userForm = new FormGroup({
      fullName: new FormControl(this.userData?.fullName || '', [
        Validators.required,
      ]),
      email: new FormControl(this.userData?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl(this.userData?.address || '', [
        Validators.required,
      ]),
      phone: new FormControl(this.userData?.phone || '', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.userForm.value.id = this.userId;
      this.apiService.post('/user/update', this.userForm.value).subscribe(
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
