import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/app.material.module';
import {AccountComponent} from './components/account/account.component';
import {LoginComponent} from './components/login/login.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {ProductComponent} from './components/dialogs/product/product.component';
import {GalleryOpenComponent} from './components/gallery-open/gallery-open.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {TitleComponent} from './components/title/title.component';
import {HeaderComponent} from './components/header/header.component';
import {AuthService} from './services/auth.service';
import {HomePageComponent} from './pages/home/home.page.component';
import {Four04PageComponent} from './pages/four04/four04.page.component';
import {AboutPageComponent} from './pages/about/about.page.component';
import {GalleryPageComponent} from './pages/gallery/gallery.page.component';
import {ContactPageComponent} from './pages/contact/contact.page.component';
import {ApiService} from './services/api.service';
import {DialogService} from './services/dialog.service';
import {FirebaseService} from './services/firebase.service';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginDialogComponent} from './components/dialogs/login/login.dialog.component';
import {AccountDialogComponent} from './components/dialogs/account/account.dialog.component';
import {StateService} from './services/state.service';
import {LoginContainerComponent} from './components/login-container/login-container.component';
import {AdminPageComponent} from './pages/admin/admin.page.component';
import {AdminGuard} from './guards/admin.guard';
import { AddProductStepperComponent } from './components/admin/add-product-stepper/add-product-stepper.component';
import { AddProductProductListComponent } from './components/admin/add-product-product-list/add-product-product-list.component';
import { EditProductDialogComponent } from './components/admin/dialogs/edit-product/edit-product-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    Four04PageComponent,
    AboutPageComponent,
    GalleryPageComponent,
    ContactPageComponent,
    AdminPageComponent,

    HeaderComponent,
    TitleComponent,
    GalleryComponent,
    GalleryOpenComponent,
    ProductComponent,
    LoginFormComponent,
    LoginComponent,
    AccountComponent,
    LoginDialogComponent,
    AccountDialogComponent,
    LoginContainerComponent,
    AddProductStepperComponent,
    AddProductProductListComponent,
    EditProductDialogComponent,

  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [AuthService, ApiService, DialogService, FirebaseService, StateService, AdminGuard],
  entryComponents: [ProductComponent, LoginDialogComponent, AccountDialogComponent, EditProductDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
