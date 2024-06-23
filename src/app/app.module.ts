import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component'; 
import { ApiService } from './services/api.service';
import { PdfComponent } from './pdf/pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    PdfComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    RouterModule.forRoot([
      { path: '', component: TableComponent },
      { path: 'form', component: FormComponent },
      { path: 'pdf', component: PdfComponent },
      { path: 'edit/:id', component: EditComponent },

    ]),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
