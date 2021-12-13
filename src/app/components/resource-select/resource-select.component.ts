import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import resources from '../../../assets/aws-json/resources.json';

@Component({
  selector: 'app-resource-select',
  templateUrl: './resource-select.component.html',
  styleUrls: ['./resource-select.component.sass']
})
export class ResourceSelectComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    typesResources: new FormControl(''),
    resourcesBySubcategory: new FormControl(''),
  });


  resourcesList: any;
  typesResources: any[] = [];
  resourcesBySubcategory: any[] = [];
  selectedResource: any = null;
  resourceBySubcategory: string = "";
  exampleResource: string = "";
  editorMode = "editor";
  editorOptions = {
    showPreviewPanel: false,   // Show preview panel, Default is true
    showBorder: true,         // Show editor component's border. Default is true
    hideIcons: ['Bold', 'Italic', 'Heading', 'Reference', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen'],
    scrollPastEnd: 0,      // The option for ace editor. Default is 0
    resizable: false,           // Allow resize the editor
  }

  constructor(private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.resourcesList = this.resourcesToArray();
    this.typesResources = this.distinctSubCategory(this.resourcesList);



  }

  onSubmit() {
    console.log('submit');
  }

  resourcesToArray() {
    const resourcesArray: any[] = [];
    Object.values(resources).forEach(resource => {
      resourcesArray.push(resource);  // push each resource into the array
    });
    return resourcesArray;
  }

  distinctSubCategory(resourcesArray: any[]): any[] {
    const subCategories: any[] = [];
    resourcesArray.forEach(resource => {
      if (!subCategories.includes(resource.subcategory)) {
        subCategories.push(resource.subcategory);
      }
    });
    return subCategories;
  }

  selectResourceBySubcategory(typesResources: string): any {
    this.resourcesBySubcategory = [];
    this.resourceBySubcategory = "";
    this.resourcesList.forEach((resource: { subcategory: string; }) => {
      if (resource.subcategory === typesResources) {
        this.resourcesBySubcategory.push(resource);
      }
    });
  }


  selectResource(resource: string) {
    console.log(resource);
    this.selectedResource = this.resourcesList.find((res: { page_title: string; }) => res.page_title === resource);
    console.log(this.selectedResource);
    this.extractTerraformBlock();

  }

  extractTerraformBlock() {
    let firstTerraformBlock = this.selectedResource.content.split('```terraform')[1];
    firstTerraformBlock = firstTerraformBlock.split('```')[0];
    console.log(firstTerraformBlock);
    this.exampleResource = firstTerraformBlock;
  }

  saveResource() {
    console.log("exampleResource", this.exampleResource);
  }


}
