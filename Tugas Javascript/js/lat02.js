// document.querySelector("#paragraf").innerHTML = "saya belajar javascript";
// document.querySelector("#content").innerHTML = "<h1>ganti isi</h1>";


let tanggal = 25;
let bulan = 12;
let hasil = "Salah";

if (tanggal > 0 && tanggal < 31 && bulan > 0 && bulan < 13) {
    hasil = "Zodiak belum dibuat";
    if (bulan == 1) {
        hasil = "Capricon"
        if ( tanggal < 20) {
            hasil = "Aquarius";
        }
    }

    if (bulan == 2) {
        hasil  = "Aquarius";
        if ( tanggal < 20) {
            hasil = "Pisces";
        }
    }

    if (bulan == 3) {
        hasil  = "Pisces";
        if ( tanggal < 20) {
            hasil = "Aries";
        }
    }

    if (bulan == 4) {
        hasil  = "Aries";
        if ( tanggal < 20) {
            hasil = "Taurus";
        }
    }

    if (bulan == 5) {
        if ( tanggal < 20) {
            hasil = "Taurus";
        }else {
            hasil  = "Gemini"
        }
    }

    if (bulan == 6) {
        if ( tanggal < 20) {
            hasil = "Gemini";
        }else {
            hasil  = "Cancer"
        }
    }

    if (bulan == 7) {
        if ( tanggal < 20) {
            hasil = "Cancer";
        }else {
            hasil  = "Leo"
        }
    }

    if (bulan == 8) {
        if ( tanggal < 20) {
            hasil = "Leo";
        }else {
            hasil  = "Virgo"
        }
    }

    if (bulan == 9) {
        if ( tanggal < 20) {
            hasil = "Virgo";
        }else {
            hasil  = "Libra"
        }
    }

    if (bulan == 10) {
        if ( tanggal < 20) {
            hasil = "Libra";
        }else {
            hasil  = "Scorpio"
        }
    }

    if (bulan == 11) {
        if ( tanggal < 20) {
            hasil = "Scorpio";
        }else {
            hasil  = "Sagitarius"
        }
    }

    if (bulan == 12) {
        if ( tanggal < 20) {
            hasil = "Sagitarius";
        }else {
            hasil  = "Capricorn"
        }
    }
}

console.log(hasil);
document.querySelector("#content").innerHTML = `<h1>${hasil}</h1>`;
// document.querySelector("#content").innerHTML = "<h1>" + hasil + "</h1>";