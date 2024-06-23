import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DataTransferService } from '../services/datatransfer';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  title = 'USER DATA';
  pdfSrc: any;
  pdfData: any = [];

  constructor(private dataTransferService: DataTransferService) {}

  ngOnInit(): void {
    this.dataTransferService.currentData.subscribe((item: any) => {
      for (let data of item.userData) {
        let rowArray: any = [];
        for (const key in data) {
          if (
            key == 'name' ||
            key == 'phone' ||
            key == 'email' ||
            key == 'address'
          ) {
            rowArray.push(data[key]);
          }
        }
        this.pdfData.push(rowArray);
        rowArray = [];
      }

      console.log(this.pdfData);

      this.generatePDF();
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['Name', 'Phone', 'Email', 'Address']],
      body: this.pdfData,
    });
    this.pdfSrc = doc.output('datauristring');
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.text('User Information', 10, 10);

    autoTable(doc, {
      head: [['Name', 'Phone', 'Email', 'Address']],
      body: this.pdfData,
    });

    doc.save('user-information.pdf'); // Save the PDF with a desired file name
  }
}
