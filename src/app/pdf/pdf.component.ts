import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // 
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent {
  title = 'jsPDF Example';
  pdfSrc:any; // Variable to hold the PDF data URL

  generatePDF() {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('User Information', 10, 10);

    autoTable(doc, {
      head: [['Name', 'Email', 'Phone', 'Address']],
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
