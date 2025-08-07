const PDFDocument = require('pdfkit');
const { Op } = require('sequelize');
const Product = require('../models/Product');
const StockHistory = require('../models/StockHistory');

// GET /api/reports/stock-history?type=in&start=YYYY-MM-DD&end=YYYY-MM-DD
exports.getStockHistoryReport = async (req, res) => {
  const { type, start, end } = req.query;

  try {
    const records = await StockHistory.findAll({
      where: {
        type: type || { [Op.in]: ['in', 'out'] },
        createdAt: {
          [Op.between]: [new Date(start), new Date(end)]
        }
      },
      include: [{ model: Product }],
      order: [['createdAt', 'ASC']]
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock history', error });
  }
};

// GET /api/reports/stock-history/pdf?type=in&start=YYYY-MM-DD&end=YYYY-MM-DD
exports.downloadStockHistoryPDF = async (req, res) => {
  const { type, start, end } = req.query;

  try {
    const records = await StockHistory.findAll({
      where: {
        type: type || { [Op.in]: ['in', 'out'] },
        createdAt: {
          [Op.between]: [new Date(start), new Date(end)]
        }
      },
      include: [{ model: Product }],
      order: [['createdAt', 'ASC']]
    });

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const filename = `Stock_${type}_Report_${start}_to_${end}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    // ======================
    // Colors matching your CSS
    const colors = {
      title: '#1e293b',        // .report-title
      headerBg: '#caccce',     // thead background
      headerText: '#1f2937',   // thead text color
      rowAlt: '#f9fafb',       // tbody tr:hover / .host bg
      border: '#e5e7eb',       // td/th border
      quantityIn: '#2e7d32',   // green
      quantityOut: '#b91c1c',  // red
    };

    // ===== TITLE =====
    doc.font('Helvetica-Bold')
      .fontSize(22)
      .fillColor(colors.title)
      .text('Inventory Management System', { align: 'center' });

    doc.moveDown(0.5);

    doc.fontSize(16)
      .fillColor(colors.title)
      .text(`Stock ${type === 'in' ? 'In' : 'Out'} Report`, {
        align: 'center',
        underline: true
      });

    doc.moveDown(1);

    // ===== TABLE =====
    const headers = ['Date', 'Product', 'Brand', 'Model', 'Color', 'Storage', 'Quantity'];
    const data = records.map(record => {
      const p = record.Product;
      return [
        new Date(record.createdAt).toISOString().slice(0, 10),
        p.name,
        p.brand,
        p.model,
        p.color,
        p.storage,
        record.quantity.toString()
      ];
    });

    const columnWidths = [65, 120, 70, 75, 85, 75, 50];
    const startX = 30;
    let y = doc.y;

    // ===== HEADER ROW =====
    doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.headerText);
    doc.rect(startX, y - 5, columnWidths.reduce((a, b) => a + b, 0), 18).fill(colors.headerBg);

    headers.forEach((header, i) => {
      doc.fillColor(colors.headerText).text(header, startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), y, {
        width: columnWidths[i],
        align: 'center'
      });
    });

    y += 20;

    // ===== ROWS =====
    doc.font('Helvetica').fontSize(10);
    let rowColor;

    data.forEach((row, index) => {
      let rowHeight = 0;

      // Calculate height for this row
      row.forEach((cell, i) => {
        const height = doc.heightOfString(cell, { width: columnWidths[i] });
        if (height > rowHeight) rowHeight = height;
      });

      // Add page if needed
      if (y + rowHeight > doc.page.height - 50) {
        doc.addPage();
        y = 30;
      }

      // Alternate background
      rowColor = index % 2 === 0 ? '#ffffff' : colors.rowAlt;
      doc.rect(startX, y - 5, columnWidths.reduce((a, b) => a + b, 0), rowHeight + 10).fill(rowColor);

      // Draw text
      row.forEach((cell, i) => {
        const isQuantity = i === 6;
        const color = isQuantity
          ? (type === 'in' ? colors.quantityIn : colors.quantityOut)
          : '#333333';

        doc.fillColor(color).text(cell, startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), y, {
          width: columnWidths[i],
          align: 'center'
        });
      });

      y += rowHeight + 12;
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating PDF', error });
  }
};
