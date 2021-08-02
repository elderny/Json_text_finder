// Author: elderny
// Date: 02-08-2021 (DD-MM-YYYY)

let chkBtn = document.getElementById('chkBtn');
chkBtn.addEventListener('click', chkBtnfunctionOld);


let chkTxt = document.getElementById('chkTxt');
let responseTxt = document.getElementById('responseTxt');

function chkBtnfunctionOld() {
    responseTxt.innerText = 'Checking';
    responseTxt.style.backgroundColor = `rgb(255, 166, 0)`;
    responseTxt.style.color = 'black';
    setTimeout(() => {
        responseTxt.innerText = 'Checking.';
    }, 400);
    setTimeout(() => {
        responseTxt.innerText = 'Checking..';
    }, 800);
    setTimeout(() => {
        responseTxt.innerText = 'Checking.';
    }, 1200);
    setTimeout(() => {
        responseTxt.innerText = 'Checking';
    }, 1600);
    setTimeout(() => {
        chkBtnfunction();
    }, 2000);
}
function chkBtnfunction() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/ex_5.json', true);
    xhr.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let str = [];
            let results = document.getElementById('results');
            var index = 0;
            for (key in obj) {
                str.push(`<li id="${index++}">${obj[key].description}</li>`);
            }
            let Txt_includes = String(str.includes(chkTxt.value));
            let Txt_noIncludes = str.filter(item => !str.includes(item));
            if (chkTxt.value === "") {
                results.innerHTML = "";
                responseTxt.style.color = 'white';
                responseTxt.innerText = 'No Input!';
                responseTxt.style.backgroundColor = 'red';
            } else {
                if (Txt_includes) {
                    for (let i = 0; i < index; i++) {
                        if (str[i].includes(chkTxt.value)) {
                            if (results.innerHTML.includes(str[i])) {
                            } else {
                                results.innerHTML += str[i];
                                responseTxt.innerText = 'Found!';
                                responseTxt.style.backgroundColor = 'green';
                                responseTxt.style.color = 'white';
                                responseTxt.style.padding = 'padding: 17px 0px;';
                                return;
                            }
                        }
                    }
                }
                if (Txt_noIncludes) {
                    results.innerHTML = "";
                    responseTxt.style.color = 'white';
                    responseTxt.innerText = 'Not found!';
                    responseTxt.style.backgroundColor = 'red';
                }
            }

        } else {
            console.error("Request Failed");
        }
    }
    xhr.send();
    // console.log("request has been send");
    setTimeout(() => {
        document.getElementById('chkTxt').value = '';
    }, 1000);
}