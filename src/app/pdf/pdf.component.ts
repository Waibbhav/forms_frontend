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
  constructor(private DataTransferService: DataTransferService) {}

  ngOnInit(): void {
    this.DataTransferService.currentData.subscribe((item: any) => {
      console.log(item);
      this.generatePDF();
      
    });
  }

  generatePDF() {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('User Information', 10, 10);

    autoTable(doc, {
      head: [['Name', 'Phone', 'Email', 'Address']],
      body: [
        ['Mark', 'mark.otto@example.com', '1234567890', '123 Main St'],
        ['Jacob', 'jacob.thornton@example.com', '0987654321', '456 Elm St'],
        ['Larry', 'larry.thebird@example.com', '1112223333', '789 Pine St'],
      ],
    });

    // Convert the PDF to a data URL
    this.pdfSrc = doc.output('datauristring');

    // Optional: Log the data URL for testing
    console.log(this.pdfSrc);
  }
}
