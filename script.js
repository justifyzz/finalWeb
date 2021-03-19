function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail.com)|(mail.ru)|(yahoo.com)|(yandex.ru)$/
    return regex.test(email);
};

function validatePassword(password) {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regex.test(password);
};

function signUp() {
    var email = $('#InputEmail1').val();
    var password1 = $('#InputPassword1').val();
    var password2 = $('#InputPassword2').val();

    if (validateEmail(email)) {
        console.log('Valid Email');
        if (validatePassword(password1)) {
            if (password1 == password2) {
                if (!$("input[name='inlineRadioOptions']").is(':checked')) {
                    alert('Nothing is checked!');
                }
                else {
                    if (document.getElementById('exampleCheck1').checked) {
                        var obj = {
                            "email": email,
                            "pass": password1
                        }

                        postRegister(obj);
                    }
                    else {
                        alert('Accept Terms and Conditions of Use');
                    }

                }

            }
            else {
                alert('Passwords don\'t match');
            }
        }
        else {
            alert("Password should contain at least one Capital letter, one Special symbol and contain a minimum of 8 characters in length");
        }
    }
    else {
        alert("Invalid Email");
    }
};

function getResource(resource) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status == 200) {
                var json = JSON.parse(this.responseText);
                createTable(json);
            }
            else {
                console.log("Operation failed");
            }
        }
    }
    http.open("GET", 'https://jsonplaceholder.typicode.com/' + resource, true);
    http.send();
};

function postRegister(obj) {
    var http = new XMLHttpRequest();
    http.open("POST", 'https://jsonplaceholder.typicode.com/posts', true);
    var stringObj = JSON.stringify(obj);
    http.send(stringObj);
    http.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status == 201) {
                console.log(stringObj);
                console.log(this.response);
                var json = jQuery.parseJSON(this.response);

                alert("Signed IN! Your user ID: " + json.id);
                //redirect to main page
                //window.location.href = "index.html"
            }
            else {
                console.log("Post Failed");
            }
        }
    };
};

$('#selectRes').on('change', function () {
    getResource(this.value);
});



function createTable(json) {
    var col = [];
    for (var i = 0; i < json.length; i++) {
        for (var key in json[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-bordered")

    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < json.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json[i][col[j]];
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
};

$("#table").on('click', '.deleteRow', function () {
    $(this).closest('tr').remove();
});

$(".addRow").click(function () {
    var markup = '<tr><th class="changeRow"></th><td class="changeRow"></td><td><button class="btn btn-danger deleteRow">Delete</button></td></tr>';
    $("#tbody").append(markup);
});

$("#tbody").on('click', '.changeRow', function () {
    $(this).text(prompt("Enter data:"));
});