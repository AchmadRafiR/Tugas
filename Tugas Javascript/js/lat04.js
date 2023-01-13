// (Bulan , Tanggal)
zodiak(11,28);

function zodiak(bln , tgl) {
    let hasil = "Salah";
    if (bln > 0 && bln < 13 && tgl > 0 && tgl < 32) {
        hasil = "zodiak belum dibuat";

        if (bln == 1 && tgl < 32) {
            hasil = "Capricon";
            if (tgl > 20) {
                hasil = "Aquarius";
            }
        }

        if (bln == 2 && tgl < 30) {
            hasil ="Aquarius";
            if (tgl > 19 ) {
                hasil = "pisces";
            }
        }

        if (bln == 3 && tgl < 32) {
            hasil ="Pisces";
            if (tgl > 20 ) {
                hasil = "Aries";
            }
        }

        if (bln == 4 && tgl < 31) {
            hasil = "Aries"
            if (tgl > 20 ) {
                hasil = "Taurus";
            }
        }

        if (bln == 5 && tgl < 32) {
            hasil = "Taurus"
            if (tgl > 21 && tgl < 31) {
                hasil = "Gemini";
            }
        }

        if (bln == 6 && tgl < 31) {
            hasil = "Gemini"
            if (tgl > 20 ) {
                hasil = "Cancer";
            }
        }

        if (bln == 7 && tgl < 32) {
            hasil = "Cancer"
            if (tgl > 23 ) {
                hasil = "Leo";
            }
        }

        if (bln == 8 && tgl < 31) {
            hasil = "Leo"
            if (tgl > 23 ) {
                hasil = "Virgo";
            }
        }

        if (bln == 9 && tgl < 32) {
            hasil = "Virgo"
            if (tgl > 23 ) {
                hasil = "Libra";
            }
        }

        if (bln == 10 && tgl < 31) {
            hasil = "Libra"
            if (tgl > 23 ) {
                hasil = "Scorpio";
            }
        }

        if (bln == 11 && tgl < 32) {
            hasil = "Scorpio"
            if (tgl > 22 ) {
                hasil = "Sagitarius";
            }
        }

        if (bln == 12 && tgl < 31) {
            hasil = "Sagitarius"
            if (tgl > 22 ) {
                hasil = "Capricorn";
            }
        }
        
    }
    console.log(hasil);
}



lulus(100);

function lulus(nilai) {
    let ket = "Nilai tidak valid";

    if (nilai > 0 && nilai <= 100) {
        ket = "TIDAK LULUS"
        if (nilai > 70) {
            ket = "LULUS"
        }
    }
    console.log(ket);

}



console.log(terbilang(28))

function terbilang(angka){
		var bilne=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];
		if(angka < 12){
			return bilne[angka];
		}else if(angka < 20){
			return terbilang(angka-10)+" belas";
		}else if(angka < 100){
			return terbilang(Math.floor(parseInt(angka)/10))+" puluh "+terbilang(parseInt(angka)%10);
		}else if(angka < 200){
			return "seratus "+terbilang(parseInt(angka)-100);
		}else if(angka < 1000){
			return terbilang(Math.floor(parseInt(angka)/100))+" ratus "+terbilang(parseInt(angka)%100);
		}else if(angka < 2000){
			return "seribu "+terbilang(parseInt(angka)-1000);
		}else if(angka < 1000000){
			return terbilang(Math.floor(parseInt(angka)/1000))+" ribu "+terbilang(parseInt(angka)%1000);
		}else if(angka < 1000000000){
			return terbilang(Math.floor(parseInt(angka)/1000000))+" juta "+terbilang(parseInt(angka)%1000000);
		}else if(angka < 1000000000000){
			return terbilang(Math.floor(parseInt(angka)/1000000000))+" milyar "+terbilang(parseInt(angka)%1000000000);
		}else if(angka < 1000000000000000){
			return terbilang(Math.floor(parseInt(angka)/1000000000000))+" trilyun "+terbilang(parseInt(angka)%1000000000000);
		}
	}



prima(2)
function prima(angka) {
    let keterangan = "nilai tidak valid";
    if (angka > 0) {
        
        let pembagi = 0;
        for (let index = 0; index <= angka; index++) {
            if (angka % index == 0) {
                pembagi++;
            }
        }
        keterangan = "Bukan Prima";
        if (pembagi == 2) {
            keterangan = "Prima";
        } 
    }
    console.log(keterangan);
}
