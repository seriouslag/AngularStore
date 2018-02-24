import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home/home.page.component';
import {Four04PageComponent} from './pages/four04/four04.page.component';
import {AboutPageComponent} from './pages/about/about.page.component';
import {GalleryPageComponent} from './pages/gallery/gallery.page.component';
import {ContactPageComponent} from './pages/contact/contact.page.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'gallery', component: GalleryPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Four04PageComponent}
];

export const routing = RouterModule.forRoot(routes);
