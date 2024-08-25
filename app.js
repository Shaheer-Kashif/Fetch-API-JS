const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let MOD_URL;
const dropdownSelect = document.querySelectorAll(".dropdown select");
let fromFlag,toFlag,country,fromCurr,toCurr;
let submit = document.querySelector("form button");
let msgBox = document.querySelector("form .msg");


dropdownSelect.forEach(select => {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.value = code;

        if (select.name === "from" && option.value === "USD") {
            option.selected = true;
        }
        else if (select.name === "to" && option.value === "PKR") {
            option.selected = true;
        }

        option.innerText = code;
        select.append(option);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
});

const updateFlag = (select) => {
    fromFlag = document.querySelector(".from img");
    toFlag = document.querySelector(".to img");
    country = countryList[select.value];

    if (select.name==="from") {
        fromFlag.src = `https://flagsapi.com/${country}/flat/64.png`;
    }
    else {
        toFlag.src = `https://flagsapi.com/${country}/flat/64.png`;
    }
};

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const amountBox = document.querySelector("form input");
    const amount = amountBox.value;
    console.log(amount);
    if(amount === "" || amount < 0) {
        alert("Please enter a valid amount!");
        amountBox.focus();
        msgBox.innerText = "Enter A Valid Amount!";
    }
    else {
        fromCurr = document.querySelector(".from select")
        toCurr = document.querySelector(".to select")

        const fromCurrVal = fromCurr.value.toLowerCase();
        const toCurrVal = toCurr.value.toLowerCase();

        MOD_URL = `${BASE_URL}${fromCurrVal}.json`;

        let rate = fetchData(MOD_URL,fromCurrVal,toCurrVal);
        console.log(rate);

        rate.then((data) => {
            let total = (amount * data).toFixed(2);
            msgBox.innerText = `${amount} ${fromCurrVal.toUpperCase()} = ${total} ${toCurrVal.toUpperCase()}`;
        });
        rate.catch((err) => {
            msgBox.innerText = err;
        })
    }

});

const fetchData = async (MOD_URL,fromCurrVal,toCurrVal) => {
    let response = await fetch(MOD_URL)
    let data = await response.json();

    let rate = data[fromCurrVal][toCurrVal];
    return rate;
}

