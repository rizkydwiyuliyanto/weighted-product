const fs = require("fs")
const kriteria = require("./criteria");
const file = "bobotKriteria.json";
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const q1 = () => {
    return new Promise(resolve => {
        rl.question('Nilai bahasa Indonesia? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "bahasaIndonesia")
            resolve(a)
          });
    })
}

const q2 = () => {
    return new Promise(resolve => {
        rl.question('Nilai matematika? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "matematika")
            resolve(a)
          });
    })
}

const q3 = () => {
    return new Promise(resolve => {
        rl.question('Nilai bahasa bahasa inggris? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "bahasaInggris")
            resolve(a)
          });
    })
}

const q4 = () => {
    return new Promise(resolve => {
        rl.question('Nilai IPA? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "ipa")
            resolve(a)
          });
    }) 
}

const q5 = () => {
    return new Promise(resolve => {
        rl.question('Nilai TPA? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "tpa")
            resolve(a)
          });
    })
}

const q6 = () => {
    return new Promise(resolve => {
        rl.question('Wawancara? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "wawancara")
            resolve(a)
          });
    })
}

const q7 = () => {
    return new Promise(resolve => {
        rl.question('Prestasi? ', (answer) => {
            // TODO: Log the answer in a database
            let a = kriteria.hitungBobotKriteria(answer, "prestasi")
            rl.close()
            resolve(a)
          });
        })
}

fs.readFile(file, "utf-8", (err, data) => {
    if (err) throw err;
    let dataJSON = JSON.parse(data).jurusan;
    let kategori = JSON.parse(data).kategori;
    let w = {}
    // console.log(dataJSON)
    let lengt_jurusan= Object.keys(dataJSON).length;
    for (let i = 0;i < lengt_jurusan;i++) {
        let criteriaTotal = 0;
        let jurusan = Object.keys(dataJSON)[i]
        let criteria = dataJSON[jurusan].criteria;
        let criteriaLength = Object.keys(criteria).length;
        // hitung total bobot
        for (j = 0; j < criteriaLength;j++){
            let c = Object.keys(criteria)[j];
            criteriaTotal += criteria[c]
        }
        for (j = 0; j < criteriaLength;j++){
            let c = Object.keys(criteria)[j];
            hasil = criteria[c] / criteriaTotal;
            w = {
                    ...w,
                    [jurusan] : {
                        criteria: {
                            ...w?.[jurusan]?.["criteria"],
                            [c]: hasil
                        }
                    }
                
            }
        }
    }
    // console.log(w)
    const bobotKriteria = async () => {
        let bahasaIndonesia = await q1();
        let matematika = await q2();
        let bahasaInggris = await q3();
        let ipa = await q4();
        let tpa = await q5();
        let wawancara = await q6();
        let prestasi = await q7();
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
