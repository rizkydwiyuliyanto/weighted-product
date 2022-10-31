const hitungBobotKriteria = (nilai, namaKategori) => {
    let bobot;
    let matkul = ["bahasaIndonesia", "matematika", "bahasaInggris","ipa", "tpa"]
    if (matkul.includes(namaKategori)) {
            if ((nilai >= 0) && (nilai <= 29)) {
                bobot = 0.30;
            }else if ((nilai >= 30) && (nilai <= 49)){
                bobot = 0.50;
            }else if ((nilai >= 50) && (nilai <= 69)){
                bobot = 0.70;
            }else if ((nilai >= 70) && (nilai <= 89)){
                bobot = 0.90;
            }else if ((nilai >= 90) && (nilai <= 100)) {
                bobot = 1;
            }else;
        }else if (namaKategori === "wawancara") {
            if (nilai.toLowerCase() === "sb"){
                bobot = 1
            }else if (nilai.toLowerCase() === "b") {
                bobot = 0.80
            }else if (nilai.toLowerCase() === "cb"){
                bobot = 0.60
            }else if (nilai.toLowerCase() === "kb") {
                bobot = 0.30
            }else;
        }else if (namaKategori === "prestasi") {
            if (nilai.toLowerCase() === "internasional"){
                bobot = 1
            }else if (nilai.toLowerCase() === "nasional") {
                bobot = 0.80
            }else if (nilai.toLowerCase() === "provinsi"){
                bobot = 0.60
            }else if (nilai.toLowerCase() === "kabupaten") {
                bobot = 0.40
            }else{
                bobot = 0.20
            }
        }
return bobot;
}

module.exports = {
    hitungBobotKriteria
}