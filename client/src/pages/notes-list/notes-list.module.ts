import { MenuComponent } from './../../components/menu/menu';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesListPage } from './notes-list';


@NgModule({
  declarations: [
    NotesListPage,
    MenuComponent,
  ],
  imports: [
    IonicPageModule.forChild(NotesListPage),
  ],
})
export class NotesListPageModule {}
