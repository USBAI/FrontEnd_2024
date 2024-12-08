import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface Customer {
  index: number;
  email: string;
  name: string;
  phone: string;
  location: string;
  lastOrder: string;
  orders: string;
  totalSpent: string;
}

export const exportToPDF = (customers: Customer[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Customer List', 14, 22);

  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Define the columns
  const columns = [
    'Name',
    'Email',
    'Phone',
    'Location',
    'Orders',
    'Total Spent',
    'Last Order'
  ];

  // Prepare the data
  const data = customers.map(customer => [
    customer.name,
    customer.email,
    customer.phone,
    customer.location,
    customer.orders,
    customer.totalSpent,
    customer.lastOrder
  ]);

  // Create the table
  autoTable(doc, {
    head: [columns],
    body: data,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [233, 30, 99] }, // Pink-500
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // Save the PDF
  doc.save('customers.pdf');
};

export const exportToExcel = (customers: Customer[]) => {
  // Prepare the data
  const data = customers.map(customer => ({
    'Customer ID': `CUST${String(customer.index).padStart(3, '0')}`,
    'Name': customer.name,
    'Email': customer.email,
    'Phone': customer.phone,
    'Location': customer.location,
    'Orders': customer.orders,
    'Total Spent': customer.totalSpent,
    'Last Order': customer.lastOrder
  }));

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Customers');

  // Generate the file
  XLSX.writeFile(wb, 'customers.xlsx');
};