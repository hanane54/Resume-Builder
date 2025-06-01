import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (element, filename) => {
  try {
    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false, // Disable logging
      allowTaint: true, // Allow cross-origin images
      backgroundColor: '#ffffff', // White background
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let firstPage = true;

    // Add pages as needed
    while (heightLeft >= 0) {
      const contentDataURL = canvas.toDataURL('image/png');
      
      if (firstPage) {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        firstPage = false;
      } else {
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      }

      heightLeft -= pageHeight;
      position -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${filename || 'resume'}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}; 