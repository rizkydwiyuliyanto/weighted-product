const fs = require("fs")
const wp = require("./wieghtedProduct");
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
            let a = wp.hitungBobotKriteria(answer, data, "bahasaIndonesia")
            resolve(a)
          });
    })
}

const q2 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai matematika? ', (answer) => {
            // TODO: Log the answer in a database
            let a = wp.hitungBobotKriteria(answer,data, "matematika")
            resolve(a)
          });
    })
}

const q3 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai bahasa bahasa inggris? ', (answer) => {
            // TODO: Log the answer in a database
            let a = wp.hitungBobotKriteria(answer,data, "bahasaInggris")
            resolve(a)
          });
    })
}

const q4 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai IPA? ', (answer) => {
            // TODO: Log the answer in a database
            let a = wp.hitungBobotKriteria(answer,data, "ipa")
            resolve(a)
          });
    }) 
}

const q5 = (data) => {
    return new Promise(resolve => {
        rl.question('Nilai TPA? ', (answer) => {
            // TODO: Log the answer in a database
            let a = wp.hitungBobotKriteria(answer,data, "tpa")
            // rl.close()
            resolve(a)
          });
    })
}

const q6 = (data) => {
    return new Promise(resolve => {
        rl.question('Wawancara? ', (answer) => {
            // TODO: Log the answer in a database
            let a = wp.hitungBobotKriteria(answer, data, "wawancara")
            resolve(a)
          });
    })
}

const q7 = (data) => {
    return new Promise(resolve => {
        rl.question('Prestasi? ', (answer) => {
            // TODO: Log the answer in a database
            let a = wp.hitungBobotKriteria(answer, data, "prestasi")
            resolve(a)
          });
        })
}

const q8 = () => {
    return new Promise(resolve => {
        rl.question('Pilihan jurusan ke-1? ', (answer) => {
            // TODO: Log the answer in a database
            resolve(answer)
          });
    })
}

const q9 = () => {
    return new Promise(resolve => {
        rl.question('Pilihan jurusan ke-2? ', (answer) => {
            // TODO: Log the answer in a database
            rl.close()
            resolve(answer)
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
        let myArr = [];
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
            myArr.push(hasil)
        }
        w = {
                ...w,
                [jurusan] : myArr
        }
        // console.log(w)
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
       let hasilBobotKriteria = await bobotKriteria();
       let jurusan1 = await q8();
       let jurusan2 = await q9();
       let Sjurusan1 = wp.vektorS(hasilBobotKriteria, w, jurusan1);
       let Sjurusan2 = wp.vektorS(hasilBobotKriteria, w, jurusan2);
    //    console.log(hasilBobotKriteria);
       let total = parseFloat(Sjurusan1) + parseFloat(Sjurusan2);
       total = total.toFixed(4);
       let v1 = parseFloat(Sjurusan1) / parseFloat(total);
       let v2 = parseFloat(Sjurusan2) / parseFloat(total);
       console.log(`S = ${Sjurusan1} + ${Sjurusan2} = ${total}`);
       console.log(`V1 = ${Sjurusan1} / ${total} = ${(v1).toFixed(4)}`);
       console.log(`V2 = ${Sjurusan2} / ${total} = ${(v2).toFixed(4)}`);
       if (v1 >= v2){
        console.log(`hasil : ${jurusan1} > ${jurusan2}`)
       }else{
        console.log(`hasil : ${jurusan2} > ${jurusan1}`)
       }
   } 
   vektor()
})
