const fs = require("fs")
const kriteria = require("./criteria");
const file = "bobotKriteria.json";
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const q1 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai bahasa Indonesia? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, data, "bahasaIndonesia")
            resolve(a)
          });
    })
}

const q2 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai matematika? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer,data, "matematika")
            resolve(a)
          });
    })
}

const q3 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai bahasa bahasa inggris? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer,data, "bahasaInggris")
            resolve(a)
          });
    })
}

const q4 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai IPA? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer,data, "ipa")
            resolve(a)
          });
    }) 
}

const q5 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai TPA? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer,data, "tpa")
            // rl.close()
            resolve(a)
          });
    })
}

const q6 = (data) => {
    return new Promise(resolve => {
        rl.question('Wawancara? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, data, "wawancara")
            resolve(a)
          });
    })
}

const q7 = (data) => {
    return new Promise(resolve => {
        rl.question('Prestasi? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, data, "prestasi")
            rl.close()
            resolve(a)
          });
        })
}

fs.readFile(file, "utf-8", (err, data) => {
    if (err) throw err;
    let dataJSON = JSON.parse(data).jurusan;
    let kategori = JSON.parse(data).kategori;
    let w = {};
    // console.log(data)
    let lengt_jurusan= Object.keys(dataJSON).length;
    for (let i = 0;i < lengt_jurusan;i++) {
        let criteriaTotal = 0;
        let jurusan = Object.keys(dataJSON)[i];
        let criteria = dataJSON[jurusan].criteria
        // console.log(criteria)
        let hasil = 0;
        let criteriaLength = Object.keys(criteria).length;
        // hitung total bobot
        for (j = 0; j < criteriaLength;j++){
            let criteriaItem = Object.keys(criteria)[j];
            criteriaTotal += criteria[criteriaItem]["bobot"]
        }
        for (j = 0; j < criteriaLength;j++){
            let criteriaItem= Object.keys(criteria)[j];
            hasil = criteria[criteriaItem]["bobot"] / criteriaTotal;
            w = {
                    ...w,
                    [jurusan] : {
                        criteria: {
                            ...w?.[jurusan]?.["criteria"],
                            [criteriaItem]: hasil
                        }
                    }
            }
        }
        console.log(w)
    }
    const bobotKriteria = async (data = dataJSON) => {
        let bahasaIndonesia = await q1(data);
        let matematika = await q2(data);
        let bahasaInggris = await q3(data);
        let ipa = await q4(data);
        let tpa = await q5(data);
        let wawancara = await q6(data);
        let prestasi = await q7(data);
        return[
          bahasaIndonesia,
          matematika,
          bahasaInggris,
          ipa,
          tpa,
          wawancara,
          prestasi,
        ];
    }
   const vektor = async () => {
       let a = await bobotKriteria();
       console.log(a)
   } 
   vektor()
})
