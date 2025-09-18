
  function calculateTotals() {
    const prices = document.querySelectorAll(".price");
    let subtotal = 0;
    prices.forEach(input => {
      subtotal += parseFloat(input.value) || 0;
    });

    document.getElementById("subtotal").value = subtotal.toFixed(2);

    const gstPercent = parseFloat(document.getElementById("gstPercent").value) || 0;
    const gstValue = (subtotal * gstPercent) / 100;
    document.getElementById("gstValue").value = gstValue.toFixed(2);

    const grandTotal = subtotal + gstValue;
    document.getElementById("grandTotal").value = grandTotal.toFixed(2);
  }

  document.querySelectorAll(".price, #gstPercent").forEach(input => {
    input.addEventListener("input", calculateTotals);
  });

  calculateTotals();

  async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const invoiceElement = document.querySelector('body');

    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save('invoice.pdf');
  }

  function downloadExcel() {
    const table = document.querySelector("table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Invoice" });
    XLSX.writeFile(wb, "invoice.xlsx");
  }
