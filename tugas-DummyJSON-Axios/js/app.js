let tampil = document.querySelector("#isi");
let tampilpelanggan = document.querySelector("#isidata");
let cart = document.querySelector("#coba");

function getData() {
    axios.get("https://dummyjson.com/products").then(function (response) {
        let produk = response.data.products;
        let out = '<table class="table "><thead><tr><th>No</th><th>Nama Barang</th><th>Deskripsi</th><th>Ubah</th><th>Hapus</th><th>Beli</th></tr></thead><tbody>';
        produk.forEach(el => {
            out += `<tr>
                    <td>${el.id}</td>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td><button type="button" class="btn btn-light" onclick="selectUpdateData(${el.id})" data-bs-toggle="modal" data-bs-target="#update-modal">UPDATE</button></td>
                    <td><button type="button" class="btn btn-secondary" onclick="deleteData(${el.id})">DELETE</button></td>
                    <td><button type="button" class="btn btn-dark" onclick="cartData(${el.id})">CART</button></td>
            </tr>`;
        });
        out += '</tbody></table>';
        tampil.innerHTML = out;
    })

}


function showData() {
    axios.get("https://dummyjson.com/products/categories").then(function (response) {
        out = "";
        let kategori = response.data;
        kategori.forEach(el => {
            out += `<button type="button" class="btn btn-dark m-1" id="filter" onclick="filterData('${el}')">${el}</button>`;
        });
        tampil.innerHTML = out;
    });
}


function filterData(el) {
axios.get("https://dummyjson.com/products/category/" + el).then(function (response) {
        let produk = response.data.products
        out = `<table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>PRODUCTS</th>
                <th>DESCRIPTION</th>
            </tr>
        </thead>
        <tbody>`
        produk.forEach(el => {
            out += `<tr>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
            </tr>`;
        });
        out += `</tbody></table>`;
        tampil.innerHTML = out;
    })
}


function addData() {
    let data = {
        title: document.getElementById("tit").value,
        description: document.getElementById("des").value,
        category: document.getElementById("cat").value
    };

    axios.post("https://dummyjson.com/products/add", JSON.stringify(data)).then(function (response) {
        console.log(data);
    })
}


function selectUpdateData(id) {

    axios.get("https://dummyjson.com/products/" + id).then(function (response) {
        document.querySelector("#idproduk").value = response.data.id;
        document.querySelector("#title").value = response.data.title;
        document.querySelector("#deskripsi").value = response.data.description;
    })
}


function updateData() {

    let id = document.getElementById("idproduk").value;
    let data = {
        id: document.getElementById("idproduk").value,
        produk: document.getElementById("title").value,
        deskripsi: document.getElementById("deskripsi").value
    };

    axios.put("https://dummyjson.com/products/" + id, JSON.stringify(data)).then(function (response) {
        console.log(data);
    })
}


function deleteData(id) {

    let data = {
        id: id
    };
    axios.delete("https://dummyjson.com/products/" + id, JSON.stringify(data)).then(function (response) {
        console.log("id " + id + " sudah dihapus");
    })
}


function selectData() {

        axios.get("http://localhost/tugas-DummyJSON/php/select.php").then(function (response) {
        let produk = response.data;
        let no = 1;
        let out = "";

        out += `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Pelanggan</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Telp</th>
                    <th scope="col">Hapus</th>
                    <th scope="col">Update</th>
                    <th scope="col">Cart</th>
                </tr>
            </thead><tbody>`;

        produk.forEach(el => {
            out += `
            <tr>
                <td>${no++}</td>
                <td>${el.pelanggan}</td>
                <td>${el.alamat}</td>
                <td>${el.telp}</td>
                <td><button type="button" class="btn btn-light" onclick="selectUpdate(${el.idpelanggan})" data-bs-toggle="modal" data-bs-target="#tambah1-pelanggan">UPDATE</button></td>
                <td><button type="button" class="btn btn-secondary" onclick="deleteData(${el.idpelanggan})">DELETE</button></td>
                <td><button type="button" class="btn btn-dark" onclick="showPelanggan(${el.idpelanggan})">CART</button></td>
            </tr>`;
        });
        out += `</tbody></table>`;
            tampilpelanggan.innerHTML = out;
        })
    }

function insertData() {

        let data = {
            pelanggan: document.getElementById("pelanggan").value,
            alamat: document.getElementById("alamat").value,
            telp: document.getElementById("telp").value
        };
        axios.post("http://localhost/tugas-DummyJSON/php/insert.php", JSON.stringify(data)).then(function (response) {
            alert(response.data);
            selectData();
        })
    }

function deleteData(idpelangggan) {

        let data = {
            idpelanggan : idpelangggan 
        };

        axios.post('http://localhost/tugas-DummyJSON/php/delete.php', JSON.stringify(data)).then(function (response) {
            alert(response.data);
            selectData();
        })
    }


function selectUpdate(idpelanggan) {

        let data = {
            idpelanggan : idpelanggan
        };

        axios.post("http://localhost/tugas-DummyJSON/php/selectupdate.php", JSON.stringify(data)).then(function (response) {
            document.getElementById("idupdate").value = response.data.idpelanggan;
            document.getElementById("pelangganupdate").value = response.data.pelanggan;
            document.getElementById("alamatupdate").value = response.data.alamat;
            document.getElementById("telpupdate").value = response.data.telp;
            
        })
    }


function updatePelanggan() {

        let datapelanggan = {
            idpelanggan: document.getElementById("idupdate").value,
            pelanggan : document.getElementById("pelangganupdate").value,
            alamat : document.getElementById("alamatupdate").value,
            telp : document.getElementById("telpupdate").value
        };

        axios.post('http://localhost/tugas-DummyJSON/php/update.php',JSON.stringify(datapelanggan)).then(function (response) {
            alert(response.data)
            selectData();
        })
    }


function cartData(id) {

    axios.get("https://dummyjson.com/products/" + id).then(function (response) {
        let produk = response.data;
        let out = `<table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>ORDER BY</th>
                <th>JUMLAH</th>
            </tr>
        </thead>
        <tbody>`

        out += `<tr>
            <td>${produk.id}</td>
            <td>${produk.title}</td>
            <td>${produk.price}</td>
            <td id="ordered"></td>
            <td><input type="number" id="harga"></td>
            <td><button class="btn btn-dark" onclick="finalCheckout('${produk.id}','${produk.title}','${produk.price}')">CHECKOUT</button></td>
        </tr>`;
        out += `</tbody></table>`
        cart.innerHTML = out;
    })
}


let idpel = "";
let namapel ="";
let alamatpel ="";
function showPelanggan(id) {
    axios.get('http://localhost/tugas-DummyJSON/php/selectwhere.php/?id=' + id).then(function (response) {
        idpel = response.data.idpelanggan;
        namapel = response.data.pelanggan;
        alamatpel = response.data.alamat;

        let out = `<tr>
            <td>${idpel}</td>
            <td>${namapel}</td>
            <td>${alamatpel}</td>
        </tr>`
        document.querySelector("#ordered").innerHTML = out;
    })
}


function finalCheckout(idproduct, price, product) {
    let idorder = 1;
    let jumlah = document.getElementById("harga").value;
    let data = {
        idorder: idorder,
        idbarang: idproduct,
        jumlah: jumlah,
        harga: price,
        barang: product,
        idpelanggan: idpel,
        pelanggan: namapel,
        alamat: alamatpel,
    };
    axios.post('http://localhost/tugas-DummyJSON/php/addtocart.php', JSON.stringify(data)).then(function (response) {
        console.log(response);
    })
}