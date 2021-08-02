// Author: elderny
// Date: 02-08-2021 (DD-MM-YYYY)

let chkBtn = document.getElementById('chkBtn');
chkBtn.addEventListener('click', chkBtnfunctionOld);


let chkTxt = document.getElementById('chkTxt');
let responseTxt = document.getElementById('responseTxt');

//We will make some animation of checking button that will run for 2 secs before showing us results
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
            
            //we will push the description value into our str array
            for (key in obj) {
                str.push(`<li id="${index++}">${obj[key].description}</li>`);
            }
            let Txt_includes = String(str.includes(chkTxt.value));

            //Don't worry about Txt_noIncludes code i got it from stackoverflow its not much it works as a not included function
            let Txt_noIncludes = str.filter(item => !str.includes(item));
            if (chkTxt.value === "") {
                results.innerHTML = "";
                responseTxt.style.color = 'white';
                responseTxt.innerText = 'No Input!';
                responseTxt.style.backgroundColor = 'red';
            } else {
                if (Txt_includes) {
                    for (let i = 0; i < index; i++) {
                        //We will check where in the array is our inserted value
                        if (str[i].includes(chkTxt.value)) {
                            
                            //This will help you get other values related to the keyword also otherwise you will repeatedly get the same value again and again
                            if (results.innerHTML.includes(str[i])) {
                            } else {
                                //We will add the str[i] to the HTML so that we can have more then 1 values in our result section
                                results.innerHTML += str[i];
                                responseTxt.innerText = 'Found!';
                                responseTxt.style.backgroundColor = 'green';
                                responseTxt.style.color = 'white';
                                responseTxt.style.padding = 'padding: 17px 0px;';
                                //We will return as soon as our value is found so that we don't waste time
                                return;
                            }
                        }
                    }
                }
                //I couldn't use the !Txt_includes so i needed to get a different true value code
                //else if won't work on this
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
