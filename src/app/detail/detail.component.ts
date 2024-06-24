import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
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
      });
    });
  }

  edit(id: any) {
    this.apiService
      .alertModal('Your sure you want to edit.', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([`/edit/${id}`]);
        }
      });
  }
}
