const baseUrl = "https://dummyjson.com";

function getData() {
    let out = "";
    $.ajax({
        type: "get",
        url: baseUrl + "/products",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            console.log(response);
            
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
            console.log(response)

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
            console.log(response)

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
    fetch(baseUrl + "/products/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        title: data["title"],
        description: data["description"],
        category: data["category"]
        /* other product data */
        })
    })
    .then(res => res.json())
    .then(console.log(data))
    .then(alert(data["title"] +  " Berhasil diTambahkan"))
}

$("#save").click(function (e) { 
    e.preventDefault();
    title = $("#title").val();
    description = $("#des").val();
    category = $("#cat").val();

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
    }
    fetch(baseUrl + "/products/" + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
        })
    })
    .then(res => res.json())
    .then(console.log)
    .then(alert(data["title"] + " Berhasil diUbah"))

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