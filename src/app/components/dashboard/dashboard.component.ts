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


  exampleResource: string = "";
  editorMode = "editor";
  editorOptions = {
    showPreviewPanel: false,   // Show preview panel, Default is true
    showBorder: true,         // Show editor component's border. Default is true
    hideIcons: ['Bold', 'Italic', 'Heading', 'Reference', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen'],
    scrollPastEnd: 0,      // The option for ace editor. Default is 0
    resizable: true,           // Allow resize the editor
  }

  constructor(private serviceResource: ResourceStorageService, private router: Router,) { }

  ngOnInit(): void {
    this.getOnlyContentOnResourceList();
  }

  clearResourceList() {
    this.serviceResource.clearResourceList();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/home"]);
    });
  }

  exportTerraformFiles() {
    this.writeContents(this.exampleResource, 'main' + '.tf', 'text/plain');
  }

  getOnlyContentOnResourceList() {
    this.exampleResource = this.escapeAllEspecialCharacters(
      this.transformMapInString(
        this.serviceResource.getResourceList().map(x => x.content)));
    return this.exampleResource;
  }

  transformMapInString(list: any[]): string {
    let string = "";
    list.forEach(element => {
      string += element + "\n";
    });
    return string;
  }

  escapeAllEspecialCharacters(string: string): string {
    return string;//.replace(/\n\r?/g, '').replace(/\"/g,"\'");
  }


  writeContents(content: BlobPart, fileName: string, contentType: string) {
    console.log(content);
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
