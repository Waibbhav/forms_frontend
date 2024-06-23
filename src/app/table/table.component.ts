import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  title: String = 'User List';
  userData: any;
  searchTerm: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
 this.fetchUser()
  }

  fetchUser() {
       this.apiService.get('/user/get').subscribe((res: any) => {
         console.log(res.data.docs);
         this.userData = res.data.docs;
         this.apiService.alert(res.message, 'success');
       });
  }

  filterUsers() {}

  editUser(id: any) {}

  deleteUser(id: any) {
    this.apiService.delete(`/user/delete/${id}`).subscribe((res: any) => {
    
      
      this.apiService.alert('User Deleted successfully', 'success');
      this.fetchUser();
    })
  }



  detail(id:any) {
    
  }
}
