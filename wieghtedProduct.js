const hitungBobotKriteria = (nilai,data, namaKategori) => {
    let matkul =  ["bahasaIndonesia", "matematika", "bahasaInggris","ipa", "tpa"];
    let matkul2 = ["wawancara", "prestasi"];
    let jurusan_length = Object.keys(data).length;
    for (let i = 0; i < jurusan_length;i++) {
        let namaJurusan = Object.keys(data)[i];
        let kriteria = data[namaJurusan]["criteria"];
        let kriteria_length = Object.keys(kriteria).length;

        if (matkul.includes(namaKategori)){
            for (let j = 0; i < kriteria_length;j++) {
                let a = Object.keys(kriteria)[j];
                let penilaian = kriteria[a]["penilaian"];
                if (kriteria[a]["idSubkit"] === namaKategori){
                    for (let k = 0; k < penilaian.length;k++) {
                        if ((nilai >= penilaian[k]["min"]) && (nilai <= penilaian[k]["max"])) {
                            return penilaian[k]["bobotSubKrit"]
                        }
                    }
                    return "error";
                }
            }
        }else if (matkul2.includes(namaKategori)) {
            for (let j = 0; i < kriteria_length;j++) {
                let a = Object.keys(kriteria)[j];
                let penilaian = kriteria[a]["penilaian"];
                if (kriteria[a]["idSubkit"] === namaKategori){
                    for (let k = 0; k < penilaian.length;k++) {
                        if ((nilai.toLowerCase() === penilaian[k]["text"])) {
                            return penilaian[k]["bobotSubKrit"]
                        }
                    }
                    return "error";
                }
            }
        }
    };
}
const vektorS = (hasilBobotKriteria, data, jurusan) => {
    let jurusanItems = Object.keys(data);
    let s = [];
    let hasil = 1;
    let jurusanItems_length = jurusanItems.length;
    for (let i = 0; i < jurusanItems_length;i++) {
        let namaJurusan = Object.keys(data)[i];
        if (namaJurusan === jurusan) {
            for (let i = 0;i < hasilBobotKriteria.length;i++) {
                s.push(`${hasilBobotKriteria[i]}^${data[namaJurusan][i]}`);
                hasil *= Math.pow(hasilBobotKriteria[i], data[namaJurusan][i]);
            }
        }
    }
    console.log(s);
    return hasil.toFixed(4);
}
module.exports = {
    hitungBobotKriteria,
    vektorS
}