const baseUrl = "https://dummyjson.com";

function getData() {
    let out = "";
    $.ajax({
        type: "get",
        url: baseUrl + "/products",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log("berhasil");
            
            out += `<tr>
            <th>Title</th>
            <th>Description</th>
            </tr>`;

            $.each(response.products, function (key, val) { 
                out += `<tr>
                <td>${val.title}</td>
                <td>${val.description}</td>
                <td>
                    <button type="button" class="btn btn-dark" id="cart" value="${val.id}">Cart</button>
                </td>
                </tr>`
            });
            document.querySelector('#table').innerHTML = out
        }
    });
}
document.querySelector("#get").addEventListener('click', getData);


function showData() {
    let out= "";
    $.ajax({
        type: "get",
        url: baseUrl + "/products/categories",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response)

            $.each(response, function (key, val) { 
                out += `<button type="button" class="btn btn-dark m-1" id="filter" value='${val}'>${val}</button>`;
            });
            document.querySelector('#isi').innerHTML = out
        }
    });
}
document.querySelector('#show').addEventListener('click', showData);


function filterData(cat) {
    let out="";
    $.ajax({
        type: "get",
        url: baseUrl + "/products/category/" + cat,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response)

            $.each(response.products, function (key, val) { 
                out += `<tr>
                <td>${val.title}</td>
                <td>${val.description}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="update" data-bs-toggle="modal" data-bs-target="#exampleModal" value="${val.id}">Update</button>
                </td>
                <td>
                    <button type="button" class="btn btn-info" id="delete" value="${val.id}">Delete</button>
                </td>
                </tr>`;
            });
            document.querySelector("#table").innerHTML = out;
        }
    });
}

$(document).on("click", "#filter", function (e) { 
    let cat = $(this).attr("value");
    filterData(cat);
});


function form() {
    let out = `<option selected>Chose...</option>`;
    $.ajax({
        type: "get",
        url: baseUrl + "/products/categories",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response, function (key, val) { 
                out += `<option value="${val}">${val}</option>`;
            });
            $('#cat').html(out);
        }
    });
}

$("#post").click(function (e) { 
    e.preventDefault();
    form();    
});



function addData() {
    let data = {
        title: title,
        description: description,
        category: category,
    };
    $.ajax({
        type: "post",
        url: baseUrl + "/products/add",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
            }),
        success: function (response) {
            console.log(response);
            console.log(data);
            alert(data["title" ] + "insert");
        }
    });
}

$("#save").click(function (e) { 
    e.preventDefault();
    id = $("#id").val();
    title = $("#title").val();
    description = $("#des").val();
    category = $("#cat").val();

    // if (id != null) {
    //     updateData(id);
    // } else {
    //     addData();
    // }
    if (id != null) {
        addData();
    } else {
        upadateData();
    }
    
});


function selectUpdateData(id) {
    $.ajax({
        type: "get",
        url: baseUrl + "/products/" + id,
        cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {

            $("#id").val(response.id);
            $("#title").val(response.title);
            $("#des").val(response.description);
            $("#cat").val(response.category);

        }
    });
    
}


function cartData(id) {
    out ="";
    $.ajax({
        type: "get",
        url: baseUrl + "/products/" + id,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response.title);
            out += `
            <table class="table">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Order By</th>
                </tr>
                <tr>
                    <td id="data-idbarang">${response.id}</td>
                    <td id="data-barang">${response.title}</td>
                    <td id="data-harga">${response.price}</td>
                    <td id="pel"></td>
                </tr>
                <tr>
                    <td>
                        <button class="btn btn-light" id="addtocart">Add To Cart</button>
                    </td>
                </tr>
            </table>
            `;
            $("#isi").html(out);
        }
    });    
}

$(document).on("click", "#cart", function () {
    let id =  $(this).attr("value");
    cartData(id);
    // alert("tessss");
})



function updateData(id) {
    let data = {
        title: title,
        description: description,
        category: category,
    };
    $.ajax({
        type: "PATCH",
        url: baseUrl + "/products/" + id,
        contentType: "application/json",
        data: "json",
        dataType: JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
            }),
        success: function (response) {
            // console.log(response);
            console.log(data);
            alert(data["title" ] + " update");
        }
    });
    // fetch(baseUrl + "/products/" + id, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         title: data["title"],
    //         description: data["description"],
    //         category: data["category"]
    //     })
    // })
    // .then(res => res.json())
    // .then(console.log)
    // .then(alert(data["title"] + " Berhasil diUbah"))

}

$(document).on("click", "#update", function (e) {
    let id =  $(this).attr("value");
    $("#exampleModalLabel").html("Update Data");
    form(id);
    selectUpdateData(id);
})


function deleteData(id) {
    fetch( baseUrl + "/products/" + id, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log)
    .then(alert("Data Berhasil Dihapus"));
}

$(document).on("click", "#delete", function (e) {
    let id = $(this).attr("value");
    deleteData(id);
})

$("#delete").click(function (e) { 
    e.preventDefault();
    alert("DELETE");
});

getData()




// DATA PELANGGAN

$(document).ready(function () {
    let id ="";
    let pelanggan ="";
    let alamat = "";
    let telp ="";

    $("#submit").click(function (e) { 
        e.preventDefault();
        id = $("#id").val();
        pelanggan = $("#pelanggan").val();
        alamat = $("#alamat").val();
        telp = $("#telp").val();

        if (id == "") {
            insertData();
        } else {
            updateData();
        }

        $("#id").val("");
        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");
    });

    $("#btn-tambah").click(function (e) { 
        e.preventDefault();

        $("#title").html("Tambah Data");

        $("#id").val("");
        $("#pelanggan").val("");
        $("#alamat").val("");
        $("#telp").val("");

    });

    $("tbody").on("click",".btn-del", function () {
        let id = $(this).attr("data-id");
        if (confirm("Yakin Akan Menghapus ?")) {
            deleteData(id);
        }
    });

    $("tbody").on("click",".btn-ubah", function () {
        let id = $(this).attr("data-id");
        $("#title").html("Ubah Data");
        selectUpdate(id);
    });

    function selectUpdate(id) {
        let idpelanggan = {
            idpelanggan : id
        }

        $.ajax({
            type: "pos",
            url: "http://localhost/tugas-DummyJSON/php/selectupdate.php",
            caches: false,
            data: JSON.stringify(idpelanggan),
            // dataType: "dataType",
            success: function (response) {
                let data = JSON.parse(response)
                
                $("#id").val(data.idpelanggan);
                $("#pelanggan").val(data.pelanggan);
                $("#alamat").val(data.alamat);
                $("#telp").val(data.telp);
            }
        });
    }

    function cartPelanggan(id) {
        let out ="";
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-DummyJSON/php/selectwhere.php?id=" + id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                console.log(response);
                out += `
                <table class="table">
                    
                    <tr>
                        <th>id</th>
                        <th>pelanggan</th>
                        <th>alamat</th>
                        <th>telp</th>
                    </tr>
                    <tr>
                        <td id="data-idpelanggan">${response.idpelanggan}</td>
                        <td id="data-pelanggan">${response.pelanggan}</td>
                        <td id="data-alamat">${response.alamat}</td>
                        <td>${response.telp}</td>
                    </tr>
                </table>
                `;
                $("#pembeli").html(out);
            }
        });
    }

    function showPelanggan(id) {
        let out = "";
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-DummyJSON/php/selectwhere.php?id=" + id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                console.log(response);
                out += `<td>${response.pelanggan}</td>`
                $("#pel").html(out);
            }
        });
    }

    $(document).on("click","#btn-pembeli", function () {
        let id =  $(this).attr("data-id");
        cartPelanggan(id);
        // alert("ertyui");
    });

    $(document).on("click","#btn-pembeli", function () {
        let id =  $(this).attr("data-id");
        showPelanggan(id);
        // alert("1234");
    });


    $(document).on("click","#addtocart", function () {
        idbarang = $("#data-idbarang").text();
        barang = $("#data-barang").text();
        harga = $("#data-harga").text();
        idpelanggan = $("#data-idpelanggan").text();
        pelanggan = $("#data-pelanggan").text();
        alamat = $("#data-alamat").text();

        console.log(idbarang,barang,harga,idpelanggan,pelanggan,alamat);
        addToCart();
    });

    function addToCart() {
        let idorder =1;
        let jumlah = 1;
        let data = {
            idorder: idorder,
            idbarang: idbarang,
            jumlah: jumlah,
            harga: harga,
            barang: barang,
            idpelanggan: idpelanggan,
            pelanggan: pelanggan,
            alamat: alamat,
        }
        $.ajax({
            type: "post",
            url: "http://localhost/tugas-DummyJSON/php/addtocart.php",
            data: JSON.stringify(data),
            success: function (response) {
                console.log(response);
                alert(response);
            }
        });
    }




    function selectData() {
        $.ajax({
            type: "get",
            url: "http://localhost/tugas-DummyJSON/php/select.php",
            dataType: "json",
            success: function (response) {
                let out = "";
                let No = 1;
                $.each(response, function (key, val) { 
                    out += `<tr>
                        <td>${No++}</td>
                        <td>${val.pelanggan}</td>
                        <td>${val.alamat}</td>
                        <td>${val.telp}</td>
                        <td><button type="button" class="btn btn-primary btn-del" data-id=${val.idpelanggan}>Hapus</button></td>
                        <td><button type="button" class="btn btn-info btn-ubah" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${val.idpelanggan}>Ubah</button></td>
                        <td><button type="button" class="btn btn-info" id="btn-pembeli"  data-id=${val.idpelanggan}>Cart</button></td>
                    </tr>`;
                });
                $("#isidata").html(out);
            }
        });
    }

    function insertData() {
        let dataPelanggan = {
            pelanggan : pelanggan,
            alamat : alamat,
            telp : telp
        }

        $.ajax({
            type: "post",
            url: "http://localhost/tugas-DummyJSON/php/insert.php",
            caches: false,
            data: JSON.stringify(dataPelanggan),
            // dataType: "dataType",
            success: function (response) {
                let out = `<p>${response}</p>`
                $("#msg").html(out);
            }
        });

        selectData();
    }

    function deleteData(id) {
        let idpelanggan = {
            idpelanggan : id
        }

        $.ajax({
            type: "pos",
            url: "http://localhost/tugas-DummyJSON/php/delete.php",
            caches: false,
            data: JSON.stringify(idpelanggan),
            // dataType: "dataType",
            success: function (response) {
                let out = `<p>${response}</p>`
                $("#msg").html(out);
            }
        });

        selectData();
    }

    function updateData() {
        let dataPelanggan = {
            idpelanggan : id,
            pelanggan : pelanggan,
            alamat : alamat,
            telp : telp
        }

        $.ajax({
            type: "post",
            url: "http://localhost/tugas-DummyJSON/php/update.php",
            caches: false,
            data: JSON.stringify(dataPelanggan),
            // dataType: "dataType",
            success: function (response) {
                let out = `<p>${response}</p>`
                $("#msg").html(out);
            }
        });

        selectData();
    }

    selectData();

});