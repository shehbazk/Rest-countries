
const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");


async function getCountry (){
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    res.forEach(element => {
        showCountry(element);
    });
}

getCountry();

function showCountry(data){
   const country =  document.createElement("div");
    country.classList.add("country");
    country.innerHTML = `
    <div class="country-img">
        <img src="${data.flags.png}" alt="">
    </div>
    <div class="country-info">
        <h5 class = "countryName">${data.name.common}</h5>
        <p><strong>Population :</strong>${data.population}</p>
        <p class = "regionName"><strong>Region :</strong>${data.region}</p>
        <p><strong>Capital</strong>${data.capital}</p>

    </div>`
countriesElem.appendChild(country);
country.addEventListener('click', ()=>{
    showCountryDetails(data);
})
}

dropDown.addEventListener("click" , ()=>{
    dropElem.classList.toggle("showDropDown");

})
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

region.forEach(element => {
    element.addEventListener("click", ()=>{
        Array.from(regionName).forEach(elem =>{
            if(elem.innerText.includes(element.innerText) || element.innerText=='All' ){
                elem.parentElement.parentElement.style.display="grid";
            }else{
                elem.parentElement.parentElement.style.display="none";
            }
        })
    })
});

search.addEventListener("input" , ()=>{
    Array.from(countryName).forEach(elem =>{
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase()) ){
            elem.parentElement.parentElement.style.display="grid";
        }else{
            elem.parentElement.parentElement.style.display="none";
        }
    })
})
toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    moon.classList.toggle("fas");
});
const countryModal = document.querySelector('.countryModal');



function showCountryDetails(data){
    countryModal.classList.toggle('show');
    const obj1 = Object.keys(data.currencies);
    const obj2 = Object.keys(data.languages);
    countryModal.innerHTML=` <button class="back">Back</button>
    <div class="modal">
        <div class="leftModal">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="rightModal">
            <h1>${data.name.common}</h1>
            <div class="modalInfo">
                <div class="innerLeft inner">
                    <p><strong>Common Name :</strong>${data.name.common}</p>
                    <p><strong>Population :</strong>${data.population}</p>
                    <p><strong>Region </strong>${data.region}</p>
                    <p><strong>Subregion </strong>${data.subregion}</p>
                </div>
                <div class="innerRight inner">
                    <p><strong>Capital :</strong>${data.capital}</p>
                    <p><strong>Top Level Domain :</strong>${data.tld}</p>
                    <p><strong>Currencies </strong>${obj1.map(elem=>elem)}</p>
                    <p><strong>Languages </strong>${obj2.map(elem=>elem)}</p>
                </div>
            </div>
        </div>
    </div>`
const back = countryModal.querySelector('.back');

back.addEventListener('click', ()=>{
    countryModal.classList.toggle('show');
});

}