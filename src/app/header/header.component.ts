import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

export type routeType = 'r' | 'sl';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  constructor(private dataStorageService: DataStorageService) {}
  ngOnInit(): void {}
  onDataSave() {
    this.dataStorageService.storeRecipes();
  }
  onDataFetch() {
    this.dataStorageService.loadRecipes().subscribe();
  }
}
