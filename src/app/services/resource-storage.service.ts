import { Injectable } from '@angular/core';
import { IResourceModel } from '../model/resource-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ResourceStorageService {
  private RESOURCE_STORAGE = "resourcesList"

  private resourcesList: IResourceModel[] = [];

  constructor(private localStorage: LocalStorageService) {
    this.refreshResourceList();
  }

  refreshResourceList() {
    this.resourcesList = Object.assign(this.resourcesList, this.localStorage.get(this.RESOURCE_STORAGE));
    if (this.resourcesList == null) {
      this.resourcesList = [];
    }
  }

  getResourceList(): IResourceModel[] {
    return this.resourcesList;
  }

  private setResource(resource: any) {
    this.localStorage.set(this.RESOURCE_STORAGE, resource);
  }

  pushResourceItem(resource: IResourceModel) {
    this.resourcesList.push(resource);
    this.setResource(this.resourcesList);
  }

  clearResourceList() {
    this.resourcesList = [];
    this.setResource(this.resourcesList);
  }

  popResourceItem(resource: IResourceModel) {
    this.resourcesList.splice(this.resourcesList.indexOf(resource), 1);
    this.setResource(this.resourcesList);
  }

  updateResourceItem(resource: IResourceModel) {
    this.resourcesList[this.resourcesList.indexOf(resource)] = resource;
    this.setResource(this.resourcesList);
  }

  getResourceItem(resource: IResourceModel) {
    return this.resourcesList[this.resourcesList.indexOf(resource)];
  }


}
