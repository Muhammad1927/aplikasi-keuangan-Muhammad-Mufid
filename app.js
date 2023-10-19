const express = require("express");
const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

app.use(express.static("public")); 
app.use(express.json());

// Koneksi ke MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://root:root@ppqitadb.nytneum.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model MongoDB
const pengeluaranSchema = new mongoose.Schema({
  namaBarang: String,
  hargaBarang: Number,
  tanggalPembelian: Date,
});

const Pengeluaran = mongoose.model("Pengeluaran", pengeluaranSchema);

// Endpoint untuk input pengeluaran
app.post("/api/pengeluaran", async (req, res) => {
  try {
    const pengeluaranData = req.body;

    // Buat objek Date untuk tanggal dan waktu saat ini dalam UTC
    const tanggalSaatIni = new Date().toUTCString();
    pengeluaranData.tanggalPembelian = tanggalSaatIni;

    const pengeluaran = new Pengeluaran(pengeluaranData);
    await pengeluaran.save();
    res.status(201).json(pengeluaran);
  } catch (error) {
    res.status(400).json({ error: "Gagal menyimpan pengeluaran." });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
