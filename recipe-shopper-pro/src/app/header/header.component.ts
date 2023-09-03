import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() onFeatured = new EventEmitter<string>();

  onSelected(feature: string) {
    this.onFeatured.emit(feature);
  }
}
