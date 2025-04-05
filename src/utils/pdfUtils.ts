import { PDFDocument } from 'pdf-lib';

// Function to convert file to ArrayBuffer
export const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Function to merge multiple PDF files into one
export const mergePDFs = async (files: File[]): Promise<Blob> => {
  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Process each file
    for (const file of files) {
      const arrayBuffer = await fileToArrayBuffer(file);
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      
      // Add each page to the new document
      for (const page of pages) {
        mergedPdf.addPage(page);
      }
    }
    
    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    return new Blob([mergedPdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw new Error('Failed to merge PDF files');
  }
};

// Function to split a PDF into multiple files (one per page)
export const splitPDF = async (file: File): Promise<Blob[]> => {
  try {
    const arrayBuffer = await fileToArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    const splitPdfs: Blob[] = [];
    
    // Create a separate PDF for each page
    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(page);
      
      const newPdfBytes = await newPdf.save();
      splitPdfs.push(new Blob([newPdfBytes], { type: 'application/pdf' }));
    }
    
    return splitPdfs;
  } catch (error) {
    console.error('Error splitting PDF:', error);
    throw new Error('Failed to split PDF file');
  }
};

// Function to remove specific pages from a PDF
export const removePages = async (file: File, pagesToRemove: number[]): Promise<Blob> => {
  try {
    const arrayBuffer = await fileToArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();
    
    // Create a new PDF with only the pages we want to keep
    const newPdf = await PDFDocument.create();
    const pagesToKeep = Array.from(
      { length: pageCount }, 
      (_, i) => i + 1
    ).filter(pageNum => !pagesToRemove.includes(pageNum));
    
    // Adjust page indices (0-based)
    const pageIndices = pagesToKeep.map(pageNum => pageNum - 1);
    
    // Copy the pages we want to keep
    const pages = await newPdf.copyPages(pdfDoc, pageIndices);
    
    // Add each page to the new document
    for (const page of pages) {
      newPdf.addPage(page);
    }
    
    // Save the new PDF
    const newPdfBytes = await newPdf.save();
    return new Blob([newPdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error removing pages:', error);
    throw new Error('Failed to remove pages from PDF');
  }
};

// Function to extract specific pages from a PDF
export const extractPages = async (file: File, pagesToExtract: number[]): Promise<Blob> => {
  try {
    const arrayBuffer = await fileToArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Create a new PDF with only the extracted pages
    const newPdf = await PDFDocument.create();
    
    // Adjust page indices (0-based)
    const pageIndices = pagesToExtract.map(pageNum => pageNum - 1);
    
    // Copy the pages we want to extract
    const pages = await newPdf.copyPages(pdfDoc, pageIndices);
    
    // Add each page to the new document
    for (const page of pages) {
      newPdf.addPage(page);
    }
    
    // Save the new PDF
    const newPdfBytes = await newPdf.save();
    return new Blob([newPdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error extracting pages:', error);
    throw new Error('Failed to extract pages from PDF');
  }
};

// Function to convert image(s) to PDF
export const imagesToPDF = async (files: File[]): Promise<Blob> => {
  try {
    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      // Convert image file to array buffer
      const arrayBuffer = await fileToArrayBuffer(file);
      
      // Determine image type
      let image;
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        throw new Error(`Unsupported image type: ${file.type}`);
      }
      
      // Create a page with the image dimensions
      const { width, height } = image;
      
      // Create a page with appropriate dimensions
      const page = pdfDoc.addPage([width, height]);
      
      // Draw the image on the page
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error converting images to PDF:', error);
    throw new Error('Failed to convert images to PDF');
  }
};

// Function to compress a PDF (this is a simulation since browser-based true PDF compression is limited)
export const compressPDF = async (file: File, compressionLevel: 'low' | 'medium' | 'high'): Promise<Blob> => {
  try {
    const arrayBuffer = await fileToArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // In a real implementation, you would apply actual compression techniques here
    // For example:
    // 1. Image downsampling
    // 2. Font subsetting
    // 3. Remove unnecessary metadata
    // 4. Compress stream objects
    
    // For this demo, we're just saving the PDF with default settings
    // In a production app, you'd use a proper PDF compression library
    
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw new Error('Failed to compress PDF file');
  }
};

// Function to generate a download link for a blob
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
