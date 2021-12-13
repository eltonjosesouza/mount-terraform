import { TestBed } from '@angular/core/testing';

import { ResourceStorageService } from './resource-storage.service';

describe('ResourceStorageService', () => {
  let service: ResourceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
