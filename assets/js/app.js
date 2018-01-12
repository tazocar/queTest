$(document).ready(function(){
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
  $(".voteOneHover").hide();
  $(".voteTwoHover").hide();
});
// Botones Menu
$(".toVote").click(function(){
  $('html, body').animate({
    scrollTop: ($('.voteSection').offset().top)
  },1000);
});
$(".toSearch").click(function(){
  $('html, body').animate({
    scrollTop: ($('.searchSection').offset().top)
  },1000);
});
$(".toFindUs").click(function(){
  $('html, body').animate({
    scrollTop: ($('.mapSection').offset().top)
  },2000);
});
$(".toChat").click(function(){
  $('html, body').animate({
    scrollTop: ($('.chatContainer').offset().top)
  },2000);
});
(function (){ //iife una expresion de funcion invocada inmediatamente (function)
    var config = {
    apiKey: "AIzaSyCTeoLrG7nGNhWfXsHDeOuMInQ_8wcuJCM",
    authDomain: "testchat-903ab.firebaseapp.com",
    databaseURL: "https://testchat-903ab.firebaseio.com",
    projectId: "testchat-903ab",
    storageBucket: "testchat-903ab.appspot.com",
    messagingSenderId: "294776421466"
  };
  firebase.initializeApp(config);

//const: variable no va a cambiar , puedo agregar cosas // let: variable que si se puede cambiar

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtEmailReg = document.getElementById('txtEmailReg');
const txtPasswordReg = document.getElementById('txtPasswordReg');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnSalir = document.getElementById('btnSalir');
const btnVolver = document.getElementById('btnVolver');

//agregando evento al btnLogin
btnLogin.addEventListener('click', e => {
  //pasos para obtener correo y contraseña
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //para ingresar 
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch( e => console.log(e.menssage));
});

btnVolver.addEventListener('click', e => {
  $('#thirdSection').hide();
  $('#secondSection').show();
});

//pasos para poder afiliarte con correo y contraseña
btnSignUp.addEventListener("click", e => {
  const email = txtEmailReg.value;
  const pass = txtPasswordReg.value;
  const auth = firebase.auth();
  //signUp
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//funcion para activar el boton de salir

btnSalir.addEventListener('click', e => {
  firebase.auth().signOut();
})


// ojo Firebase no verifica si el correo es verdadero o exiiste, debemos hacer un objeto aparte
//agregando en tiempo real la autentificacion

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
    // $('#firstSection').hide();
    // $('#secondSection').hide();
    // $('#thirdSection').hide();
    // $('#fourthSection').show();
    if ($('.modal1').modal) $('#modal1').modal('close');
    if ($('.modal2').modal) $('#modal2').modal('close');
  } else {
    // $('#firstSection').show();
    // $('#secondSection').show();
    // $('#thirdSection').show();
    // $('#fourthSection').hide();
  }
});
}())

// Revisa el estado del usuario según cambios en el logeo
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  var currentUser = firebase.auth().currentUser;
  var userEmail = firebase.auth().currentUser.email;
  var userUId = firebase.auth().currentUser.uid;
  const dbRef = firebase.database().ref().child("users");
  var userImg = "";
    // set para editar y agregar data
    firebase.database().ref('users/' + userUId).set({
      username: "Nombre",
      email: userEmail,
      img: "https://s3.amazonaws.com/37assets/svn/1065-IMG_2529.jpg",
    });
    console.log(userUId)
    dbRef.on("value", function(snap){
      userImg = (snap.val()[userUId]).img;
      console.log(snap.val());
    });
    // Votaciones
    var btnCounter = document.getElementById('vote'); //variable primer boton
    var counter = document.getElementById('contar');  // variable segundo boton
    var btnSecndCounter = document.getElementById('vote2'); //primer contador
    var scndCounter = document.getElementById('contar2'); //segundo contador
    //valores pre-definidos.
    var optOneVote = 2340; 
    var optTwoVote = 2500;
    //funcion voto de la derecha

    btnCounter.addEventListener('click',function(){
       counter.value = optTwoVote++;
    });
    //funcion voto de la izquierda
    btnSecndCounter.addEventListener('click',function(){
       scndCounter.value = optOneVote++;
    });
    /////// Fin Votaciones //////

    /////// Chat ///////
    //var txtNombre = document.getElementById('nombre');
    var txtMensaje = document.getElementById('mensaje');
    var btnEnviar = document.getElementById('btnEnviar');
    var chatUL = document.getElementById('chatUL');

    btnEnviar.addEventListener("click",function(){
       // var nombre = txtNombre.value; //toma el valor del nombre que se ingresa en el input
       var mensaje = txtMensaje.value; //toma el valor del text area;
       if (document.getElementById('mensaje').value.length > 0) {
         firebase.database().ref('chat').push({
             name: userEmail,
             message : mensaje,
         });
         txtMensaje.value = "";
       }
       else {
         alert("Por favor ingrese un mensaje válido")
       }
    });
    //esta  funcion hara que firebase nos notifique de algun cambio, a todos los que esten conectados
    firebase.database().ref('chat')
    .on('value',function(snapshot){
       var html ='';
       snapshot.forEach(function(e){
          var element = e.val(); //toma el valor real del elemento snapshot
          var nombre = element.name;
          var mensaje = element.message;
          html += '<li class="chatTextBox"><div class="miniImg" style="background-image:url(' + userImg + ')"></div><div class="userChatInfo"><p p class="nameStyle">' + nombre + ':</p><p class="messageStyle">' + mensaje + '</p></div></li>'

       });
       chatUL.innerHTML = html;
    });

    $("#btnEnviar").click(function() {
      $("#chatSection").animate({ scrollTop: $("#chatUL li:first-child").position().top }, 3000);
    });
    /////// Fin MajoChat! ///////
  } else {
    console.log("not logged");
  }
});


var user = firebase.auth().currentUser;
if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}

$("#actualPhoto").click(function(){
  
})

var map;
var infowindow;

function initMap()
{
// Creamos un mapa con las coordenadas actuales
 navigator.geolocation.getCurrentPosition(function(pos) {

 lat = pos.coords.latitude;
 lon = pos.coords.longitude;

 var myLatlng = new google.maps.LatLng(lat, lon);

 var mapOptions = {
   center: myLatlng,
   zoom: 16,
 };

 map = new google.maps.Map(document.getElementById("map"),  mapOptions); //este es el mapa.

 // Creamos el infowindow que nos dara info del pin
 infowindow = new google.maps.InfoWindow();

 // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
 var request = {
   location: myLatlng,
   radius: 5000,
   types: ['museum','park']
 };

 // Creamos el servicio PlaceService y enviamos la petición.
 var service = new google.maps.places.PlacesService(map);

 service.nearbySearch(request, function(results, status) {
   if (status === google.maps.places.PlacesServiceStatus.OK) {
     for (var i = 0; i < results.length; i++) {
       crearMarcador(results[i]);
     }
   }
 });
});
}

function crearMarcador(place){
 // Creamos un marcador
 var marker = new google.maps.Marker({
   map: map,
   position: place.geometry.location
 });

// Asignamos el evento click del marcador para que nos muestre la info
 google.maps.event.addListener(marker, 'click', function() {
   infowindow.setContent(place.name);
   infowindow.open(map, this);
 });
 }

 var semanalVoteData = {
  kids: {
    option1: {
      name: "Toy Story ",
      photo: "assets/images/cont2.jpg",
    },
    option2: {
      name: "Harry Potter",
      photo: "assets/images/cont1.jpg",
    },
  },
  romantic: {
    option1: {
      name: "Love Rosie",
      photo: "assets/images/imageContenido7.jpg",
    },
    option2: {
      name: "The Holiday",
      photo: "assets/images/imageContenido8.jpg",
    },
  },
  classic: {
    option1: {
      name: "Casa Blanca",
      photo: "assets/images/imageContenido11.jpg",
    },
    option2: {
      name: "Lo que el viento se llevó",
      photo: "assets/images/imageContenido12.jpg",
    },
  },
  action: {
    option1: {
      name: "First Kill",
      photo: "assets/images/imageContenido9.jpg",
    },
    option2: {
      name: "The Foreigner",
      photo: "assets/images/imageContenido10.png",
    },
  },
 }

// Asignar imagenes segun data
$(".kidsVote div:first-child").css('background-image', 'url("' + semanalVoteData.kids.option1.photo + '")');
$(".kidsVote div:last-child").css('background-image', 'url("' + semanalVoteData.kids.option2.photo + '")');
$(".romanticVote div:first-child").css('background-image', 'url("' + semanalVoteData.romantic.option1.photo + '")');
$(".romanticVote div:last-child").css('background-image', 'url("' + semanalVoteData.romantic.option2.photo + '")');
$(".classicVote div:first-child").css('background-image', 'url("' + semanalVoteData.classic.option1.photo + '")');
$(".classicVote div:last-child").css('background-image', 'url("' + semanalVoteData.classic.option2.photo + '")');
$(".actionVote div:first-child").css('background-image', 'url("' + semanalVoteData.action.option1.photo + '")');
$(".actionVote div:last-child").css('background-image', 'url("' + semanalVoteData.action.option2.photo + '")');
// Asignar Variables Contenedor Imagenes Votación
var voteOne = $(".voteOne");
var voteTwo = $(".voteTwo");
// Asignar eventos
$(".kidsVote").click(function(){
  voteOne.css('background-image', 'url("' + semanalVoteData.kids.option1.photo + '")');
  voteTwo.css('background-image', 'url("' + semanalVoteData.kids.option2.photo + '")');
});
$(".romanticVote").click(function(){
  voteOne.css('background-image', 'url("' + semanalVoteData.romantic.option1.photo + '")');
  voteTwo.css('background-image', 'url("' + semanalVoteData.romantic.option2.photo + '")');
});
$(".classicVote").click(function(){
  voteOne.css('background-image', 'url("' + semanalVoteData.classic.option1.photo + '")');
  voteTwo.css('background-image', 'url("' + semanalVoteData.classic.option2.photo + '")');
});
$(".actionVote").click(function(){
  voteOne.css('background-image', 'url("' + semanalVoteData.action.option1.photo + '")');
  voteTwo.css('background-image', 'url("' + semanalVoteData.action.option2.photo + '")');
});
 var displayMovies = $("#displayMovies");
// Input Búsqueda y creación de contenido según resultados
var test = "";
$("#searchMovie").keyup( function(){
  var searching = $("#searchMovie").val();
  var displayMovies = $("#displayMovies");
  $.ajax({
    type: 'GET',
    url: 'http://www.omdbapi.com/?s=' + searching + '&apikey=3a181f1c',
    success: function(response) {
      if (!response.Error) {
        // console.log(response.Search)
        displayMovies.empty();
        for (var i = 0; i < response.Search.length; i++) {
          // var omdbData = $.getJSON( "http://www.omdbapi.com/?t=" + response.Search[i].Title + "&apikey=3a181f1c", function(chosenMovie) {
          // console.log(chosenMovie.Title, chosenMovie.Plot);
          // var test = chosenMovie.Plot;
          // });
          // console.log(response.Search[i].Title)
          // console.log(response.Search[i].Poster)
          if (response.Search[i].Poster != "N/A") {
            displayMovies.append("<div class='col s6 m3'><div class='movie'><div class='effectContainer'><div class='imageSearch' style='background-image:url(" + 
            response.Search[i].Poster + ")'></div></div><h4>" + 
            response.Search[i].Title + "</h4><p class='text'> Estrenada en: " + response.Search[i].Year + "</p></div></div>"
          );}
        }
      }
    }
  });
})

// Esconder Votos si cambias de película
$(".voteOne").hover(function(){
  $(".voteOneHover").toggle();
})
$(".voteTwo").hover(function(){
  $(".voteTwoHover").toggle();
})
$(".voteOne").click(function(){
  $(".voteTwoHover").hide();
  $(".voteOneHover").show();
})
$(".voteTwo").click(function(){
  $(".voteTwoHover").show();
  $(".voteOneHover").hide();
})
