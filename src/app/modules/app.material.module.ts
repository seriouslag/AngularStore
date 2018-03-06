import {
  MatButtonModule, MatDividerModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule, MatAutocompleteModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatIconModule, MatInputModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatTooltipModule, MatToolbarModule, MatDividerModule,
    BrowserAnimationsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatIconModule, MatInputModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatTooltipModule, MatToolbarModule, MatDividerModule,
    BrowserAnimationsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule
  ]
})

export class MaterialModule {
}


