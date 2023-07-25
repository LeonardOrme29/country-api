function toggleMenu(menuId) { //Metodo para hacer reactivo la respuesta de cada boton
  const menus=document.getElementsByClassName('menu');
  for (const menu of menus) {
    menu.style.display='none';
  }
  const selectedMenu=document.getElementById('menu-' + menuId);
  selectedMenu.style.display='block';
}
function searchByCapital() { //API para la capital
  const capital=document.getElementById('capital').value;
  const apiUrl=`https://restcountries.com/v2/capital/${capital}`;
  fetchData(apiUrl);
}
function searchByCountry() { //API para los paises
  const country=document.getElementById('pais').value;
  const apiUrl=`https://restcountries.com/v2/name/${country}`;
  fetchData(apiUrl);
}
function searchByContinent() { //API para los continentes
  const continent=document.getElementById('continente').value;
  const apiUrl=`https://restcountries.com/v3.1/region/${continent}`;
  fetch(apiUrl).then(response=>response.json())//fetch
  .then(data=>displayContinentResults(data)).catch(error=>console.log('Error:',error));
}
function fetchData(apiUrl) {//fetch para capital y paises
  fetch(apiUrl).then(response=>response.json())
  .then(data=>displayCapitalCountriesResults(data)).catch(error=>console.log('Error:',error));
}
function displayCapitalCountriesResults(data) {//funcion para mostrar los datos de resultado para capitales y paises
  const resultsDiv=document.getElementById('results');
  resultsDiv.innerHTML='';
  console.log(data)
  if (data.status===404) {
    resultsDiv.innerHTML='No se encontró lo buscado. Revise los datos';
  } else{
    data.forEach(country=>{
      const countryName=country.name;
      const capitalName=country.capital;
      const countryElement=document.createElement('div');
      countryElement.innerHTML=`${countryName}-Capital: ${capitalName}`;
      resultsDiv.appendChild(countryElement);
    });
  }
}
function displayContinentResults(data) {//funcion para mostrar los datos de resultado para los continentes
  const resultsDiv=document.getElementById('results');
  resultsDiv.innerHTML='';
  if (data.status===404) {
    resultsDiv.innerHTML='No se encontraron países para este continente.';
  } else {
    data.forEach(country=>{
      const countryName=country.name.official;
      const capitalName=country.capital;
      const countryDiv=document.createElement('li');
      countryDiv.classList.add('result-item');
      countryDiv.innerHTML=`${countryName} - Capital: ${capitalName}`;
      resultsDiv.appendChild(countryDiv);
    });
  }
}