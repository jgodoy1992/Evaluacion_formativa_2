document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function(){
        if(window.scrollY>40){
            document.getElementById('nav-top').classList.add('fixed-top');
            navbar_height=document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop=navbar_height+'px';
        }else{
            document.getElementById('nav-top').classList.remove('fixed-top');
            document.body.style.paddingTop=0;
        }
    })
});

let integrantes=document.getElementById("integrantes");
let servicios=document.getElementById("servicio");

function generarIntegrantes(){
    return (integrantes.innerHTML=infoIntegrantes.map(function(x){
        let { img, nombre, rut, mail}=x;
        return `
        <div class="item">
            <img class="profile-img" width="200" src=${img} alt="">
            <div class="detalle">
                <h3>${nombre}</h3>
                <h6>${rut}</h6>
                <h6>${mail}</h6>
            </div>
        </div>
        `
    }).join(""))
};

generarIntegrantes();

function generarServicios(){
    return (servicios.innerHTML=infoServicios.map(function(x){
        let {idMod,idCol,url,nombre,img,desc,nino,adole,adulto}=x;
        return `
        <div class="item">
            <img width="300" src=${img} alt="">
            <div class="detalles"> 
                <h4 class="text-color">${nombre}</h4>
                <div class="precio">
                    <h5 class="text-color">Precios</h5>
                    <ul>
                        <li class="text-color">Niño: $${nino}</li>
                        <li class="text-color">Adolecente: $${adole}</li>
                        <li class="text-color">Adulto $${adulto}</li>
                    </ul>
                </div> 
                <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#modalMap-${idMod}">
                    Mas Información
                </button>          
            </div>
        </div>

        <div class="modal fade" id="modalMap-${idMod}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalMap-${idMod}" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">${nombre}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <iframe src="${url}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ></iframe>
                        <br />
                        <a class="btn btn-light" data-bs-toggle="collapse" href="#collapseInfo-${idCol}" role="button" aria-expanded="false" aria-controls="collapseInfo-${idCol}">
                            Descripción
                        </a>
                        <div class="collapse" id="collapseInfo-${idCol}">
                            ${desc}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join(""));
};

generarServicios();

let paisOps=document.getElementById("selector-opciones");

const url="https://restcountries.com/v3.1/all";

fetch(url).then(response=>response.json()).then(data=>{
    let nomPais="";
    data.forEach(pais=>{
        nomPais+=`<option>${pais.name.common}</option>`;
    })
    paisOps.innerHTML=nomPais;
}).catch(error=>console.log(error));






