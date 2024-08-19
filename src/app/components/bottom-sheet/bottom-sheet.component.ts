import { Component, Inject, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ViewPocComponent } from '../view-poc/view-poc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.css'
})
export class BottomSheetComponent {
  website=''
  private _bottomSheetRef =
    inject<MatBottomSheetRef<ViewPocComponent>>(MatBottomSheetRef);
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public url: any) {
    this.website=url
    
   }
  cancel(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  proceed() {
    window.open(this.website, '_blank'); // Opens the live website in a new tab
  }


}
