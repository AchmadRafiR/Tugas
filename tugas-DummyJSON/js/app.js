const baseUrl = "https://dummyjson.com";

function getData() {
    let out = "";
    $.ajax({
        type: "get",
        url: baseUrl + "/products",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response);
            
            out += `<tr>
            <th>Title</th>
            <th>Description</th>
            </tr>`;

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
            url: "php/selectupdate.php",
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

    function selectData() {
        $.ajax({
            type: "get",
            url: "php/select.php",
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
            url: "php/insert.php",
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
            url: "php/delete.php",
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
            url: "php/update.php",
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