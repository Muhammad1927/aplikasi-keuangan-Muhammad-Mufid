document.addEventListener("DOMContentLoaded", () => {
  const inputForm = document.getElementById("inputForm");
  const pengeluaranList = document.getElementById("pengeluaranList");

  inputForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const namaBarang = document.getElementById("namaBarang").value;
    const hargaBarang = parseFloat(
      document.getElementById("hargaBarang").value
    );
    const tanggalPembelian = document.getElementById("tanggalPembelian").value;

    const pengeluaran = { namaBarang, hargaBarang, tanggalPembelian };

    try {
      const response = await fetch("/api/pengeluaran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pengeluaran),
      });

      if (response.status === 201) {
        alert("Pengeluaran berhasil dicatat.");
        inputForm.reset();
        fetchAndDisplayPengeluaran();
      } else {
        alert("Gagal menyimpan pengeluaran.");
      }
    } catch (error) {
      console.error(error);
    }
  });

 function fetchAndDisplayPengeluaran() {
   fetch("/api/pengeluaran")
     .then((response) => response.json())
     .then((data) => {
       const daftarBarang = document.getElementById("daftarBarang");
       daftarBarang.innerHTML = ""; // Hapus isi sebelumnya

       data.forEach((pengeluaran) => {
         const listItem = document.createElement("li");
         listItem.innerHTML = `<strong>Nama Barang:</strong> ${
           pengeluaran.namaBarang
         }, <strong>Harga Barang:</strong> ${
           pengeluaran.hargaBarang
         }, <strong>Tanggal Pembelian:</strong> ${new Date(
           pengeluaran.tanggalPembelian
         ).toLocaleDateString()}`;
         daftarBarang.appendChild(listItem);
       });
     });
 }

  fetchAndDisplayPengeluaran();
});