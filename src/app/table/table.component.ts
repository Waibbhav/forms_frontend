import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { DataTransferService } from '../services/datatransfer';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title: String = 'User List';
  userData: any;
  searchTerm: any;
  pageLength: any;
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
      this.pageLength = res.data.totalDocs;
      console.log(res.data.docs);
      this.userData = res.data.docs;
    });
  }

  filterUsers() {
    this.fetchUser(this.searchTerm);
  }

  deleteUser(id: any) {
    this.apiService
      .alertModal('Your sure you want to delete.', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          this.apiService.delete(`/user/delete/${id}`).subscribe((res: any) => {
            this.apiService.alert('User Deleted successfully', 'success');
            this.fetchUser('');
          });
        }
      });
  }

  edit(id: any) {
    this.apiService
      .alertModal('Your sure you want to delete.', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([`/edit/${id}`]);
        }
      });
  }

  onPageChange(event: any) {
    this.apiService
      .get(`/user/get?page=${event?.pageIndex + 1}&length=${event.pageSize}`)
      .subscribe((res: any) => {
        this.pageLength = res.data.totalDocs;
        console.log(res.data.docs);
        this.userData = res.data.docs;
      });
  }

  detail(id: any) {}
}
