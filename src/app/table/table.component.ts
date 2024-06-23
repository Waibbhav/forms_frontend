import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

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
    this.apiService.get('/user/get').subscribe((res: any) => {
      console.log(res.data.docs);
      this.userData = res.data.docs;
    });
  }

  filterUsers() {
    
  }
}
