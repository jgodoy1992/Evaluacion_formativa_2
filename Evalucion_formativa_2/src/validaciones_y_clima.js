let form_cont = document.getElementById('formulario-contacto');
let nombre=document.getElementById('nombre');
let apellido=document.getElementById('apellido');
let email = document.getElementById('mail');
let tel= document.getElementById('telefono');
let pais=document.getElementById('buscador-selector');
let ciudad=document.getElementById('ciudad');
let mensaje=document.getElementById('mensaje');
let error_contacto = document.getElementById('error-contacto');

let rxMail = /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+\.[a-zA-Z]+$/;
let rxTel = /^([0-9]+){8}$/;

form_cont.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    let mensajeError=[];

    if(nombre.value===""){
        mensajeError.push("Debe ingresar un nombre");
    }

    if(apellido.value===""){
        mensajeError.push("Debe ingresar un apellido");
    }

    if (!email.value.match(rxMail)) {
        mensajeError.push('Email inválido');
      }

    if (!tel.value.match(rxTel)) {
        mensajeError.push('Nº de telefono inválido');
    }

    if(pais.value===""){
        mensajeError.push("Debe ingresar un país");
    }

    if(ciudad.value===""){
        mensajeError.push("Debe ingresar una ciudad");
    }

    if(mensaje.value===""){
        mensajeError.push("Debe incluir un mensaje");
    }

    if (mensajeError.length === 0) {
        ev.target.submit();
        console.log('submitted');
      } else {
        error_contacto.innerHTML = mensajeError.join(', ');
      }
});

const apiKey = '34ab8c5c37e3171402fd392b1a4fe743';
const lugar = 'Punta Arenas';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${lugar}&appid=${apiKey}&lang=es`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const dailyData = {};
    data.list.forEach(datum => {
      const date = datum.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          maxTemp: -Infinity,
          minTemp: Infinity,
          weatherIcon: datum.weather[0].icon,
          weatherDesc: datum.weather[0].description
        };
      }
      const temp = datum.main.temp - 273.15;
      if (temp > dailyData[date].maxTemp) {
        dailyData[date].maxTemp = temp;
      }
      if(temp < dailyData[date].minTemp){
        dailyData[date].minTemp=temp
      }
      dailyData[date].weatherIcon = datum.weather[0].icon;
      dailyData[date].weatherDesc = datum.weather[0].description;
    });
    let forecastHtml = '';
    Object.keys(dailyData).forEach(date => {
      const maxTemp = dailyData[date].maxTemp.toFixed(1);
      const minTemp = dailyData[date].minTemp.toFixed(1);
      const weatherIcon = dailyData[date].weatherIcon;
      const weatherDesc = dailyData[date].weatherDesc;
      forecastHtml += `
        <div class="dia">
          <p class="fecha">${date}</p>
          <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherDesc}" class="icono">
          <p class="max-temp">Max:${maxTemp}&deg;C</p>
          <p class="max-temp">Min:${minTemp}&deg;C</p>
          <p class="desc">${weatherDesc}</p>
        </div>
      `;
    });
    document.getElementById('pronostico').innerHTML = forecastHtml;
  })
  .catch(error => console.error(error));