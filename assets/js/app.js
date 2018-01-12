$(document).ready(function(){
    $('.carousel').carousel();
    $('.modal').modal();
    $(".button-collapse").sideNav();
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
    $('#firstSection').hide();
    $('#secondSection').hide();
    $('#thirdSection').hide();
    $('#fourthSection').show();
    if ($('.modal1').modal) $('#modal1').modal('close'); 
  } else {
    $('#firstSection').show();
    $('#secondSection').show();
    $('#thirdSection').show();
    $('#fourthSection').hide();
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

    /////// MajoChat! Funcionando Falta estilos ///////

    var txtNombre = document.getElementById('nombre');
    var txtMensaje = document.getElementById('mensaje');
    var btnEnviar = document.getElementById('btnEnviar');
    var chatUL = document.getElementById('chatUL')

    btnEnviar.addEventListener("click",function(){
       var nombre = txtNombre.value; //toma el valor del nombre que se ingresa en el input
       var mensaje = txtMensaje.value; //toma el valor del text area;

       firebase.database().ref('chat').push({
           name: userEmail,
           message : mensaje,
       });
    });
    //esta  funcion hara que firebase nos notifique de algun cambio, a todos los que esten conectados
    firebase.database().ref('chat')
    .on('value',function(snapshot){
       var html ='';
       snapshot.forEach(function(e){
           var element = e.val(); //toma el valor real del elemento snapshot
           var nombre = element.name;
           var mensaje = element.message;
          html += '<li><div class="miniImg" style="background-image:url(' + userImg + ')"></div><b>' + nombre + ': </b>' + mensaje + '</li>'

       });
       chatUL.innerHTML = html;
    });
    /////// Fin MajoChat! ///////
  } else {
    console.log("not logged");
  }
});


/*var user = firebase.auth().currentUser;
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
  
})*/