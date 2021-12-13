import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceStorageService } from 'src/app/services/resource-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  constructor(private serviceResource: ResourceStorageService, private router: Router,) { }

  ngOnInit(): void {
  }

  clearResourceList() {
    this.serviceResource.clearResourceList();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/home"]);
    });
  }



  exportTerraformFiles() {

  }

}
