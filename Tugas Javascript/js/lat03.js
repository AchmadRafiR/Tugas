let isi = document.querySelector("#isi");
isi.innerHTML = '<h1>soto</h1>' + '<p>Deskripsi Soto</p>' + '<img src="images/g.jpg">';
isi.innerHTML = '<h1>Rawon</h1>';
isi.innerHTML += '<p>Deskripsi Rawon</p>';
isi.innerHTML += '<img src="images/g.jpg">';

for (let i = 0; i < 10; i++) {
    // console.log(index);
    document.querySelector("#paragraf").innerHTML += "<h1>" + i + "</h1>";
}


// let  tabel = document.querySelector("#tabel");
// tabel.innerHTML = "<table>" 
//                 + "<thead><tr><th>No</th></tr></thead>"
//                 +"<tbody>"
//                 +"<tr><td>1</td></tr>"
//                 +"<tr><td>2</td></tr>"
//                 +"<tr><td>3</td></tr>"
//                 +"<tr><td>4</td></tr>"
//                 +"<tr><td>5</td></tr>"
//                 +"</tbody>"
//                 +"</table>"

let  tabel = document.querySelector("#tabel");
tabel.innerHTML = "<table><thead><tr>No</tr></thead><tbody>"
// tabel.innerHTML += "<tr><td>1</td></tr>"
// tabel.innerHTML += "<tr><td>2</td></tr>"
// tabel.innerHTML += "<tr><td>3</td></tr>"


for (let index = 0; index <= 8; index++) {
    tabel.innerHTML += "<tr><td>" + index + "</tr></td>"
}

tabel.innerHTML += "</tbody></table>";