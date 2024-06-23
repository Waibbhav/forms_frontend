import { Component } from '@angular/core';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DataTransferService } from '../services/datatransfer';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent {
  title = 'jsPDF Example';
  pdfSrc: any;
  pdfData:any=[]
  constructor(private DataTransferService: DataTransferService) {}

  ngOnInit(): void {
    this.DataTransferService.currentData.subscribe((item: any) => {

    
      for (let data of item.userData) {
        let rowArray: any = []
        for (const key in data) {

          if (key == "name" || key == "phone" || key == "email" || key == "address") {
             rowArray.push(data[key]);
          } 
        }
       this.pdfData.push(rowArray);
        rowArray=[]
      }

      console.log(this.pdfData);
      
      this.generatePDF();
      
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('User Information', 10, 10);

    autoTable(doc, {
      head: [['Name', 'Phone', 'Email', 'Address']],
      body: this.pdfData,
    });

    // Convert the PDF to a data URL
    this.pdfSrc = doc.output('datauristring');

    // Optional: Log the data URL for testing
    console.log(this.pdfSrc);
  }
}
