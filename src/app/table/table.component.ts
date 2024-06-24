import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { DataTransferService } from '../services/datatransfer';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  title: String = 'User List';
  userData: any;
  searchTerm: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private dataService: DataTransferService
  ) {}

  ngOnInit(): void {
    this.fetchUser('');
  }

  onClick() {
    this.dataService.setData({ userData: this.userData });
    this.router.navigate(['/pdf']);
  }

  fetchUser(search: any) {
    this.apiService.get(`/user/get/?search=${search}`).subscribe((res: any) => {
      console.log(res.data.docs);
      this.userData = res.data.docs;
      this.apiService.alert(res.message, 'success');
    });
  }

  filterUsers() {
    this.fetchUser(this.searchTerm);
  }

  deleteUser(id: any) {
    this.apiService.delete(`/user/delete/${id}`).subscribe((res: any) => {
      this.apiService.alert('User Deleted successfully', 'success');
      this.fetchUser('');
    });
  }

  onPageChange(event:any) {
    
  }

  detail(id: any) {}
}
