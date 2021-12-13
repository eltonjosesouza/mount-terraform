import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ResourceStorageService } from 'src/app/services/resource-storage.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss'],

})
export class ResourceTableComponent implements OnInit {

  @ViewChild('myTable') table: any;


  columns = [{ name: 'type' }, { name: 'name' },];

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  ColumnMode = ColumnMode;

  editorMode = "editor";
  editorOptions = {
    showPreviewPanel: false,   // Show preview panel, Default is true
    showBorder: true,         // Show editor component's border. Default is true
    hideIcons: ['Bold', 'Italic', 'Heading', 'Reference', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen'],
    scrollPastEnd: 0,      // The option for ace editor. Default is 0
    resizable: true,           // Allow resize the editor
  }

  constructor(private resourceService: ResourceStorageService) {
    this.rows = this.resourceService.getResourceList();
  }

  getValueRow(row: any) {
    return row
  }

  onPage(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }


  ngOnInit(): void {
    this.rows = this.resourceService.getResourceList();
  }

  toggleExpandRow(row: any) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }


}
