var config = {
  apiKey: "AIzaSyDZmkmi8qstIfuJ6il-uAfM8wqPFGNeQOI",
  authDomain: "playflix-os.firebaseapp.com",
  projectId: "playflix-os",
  storageBucket: "playflix-os.appspot.com",
  messagingSenderId: "974391976020",
  appId: "1:974391976020:web:f4d56ca28c548c452e0dc1",
  measurementId: "G-M1BGZ38TDV"
};

firebase.initializeApp(config);
// Apenas para remover um warning
firebase.firestore().settings({
  timestampsInSnapshots: true,

});

const db = firebase.firestore()
const auth = firebase.auth()

function logout() {
  // Faço um logout do meu usuário (saio da aplicação).
  firebase.auth().signOut().then(() => {
    alert('Usuário deslogou');
  })
}

/**
* Listener de dom ready
*/
/*
document.addEventListener("DOMContentLoaded", function () {
})
*/
window.onload = function() {

  auth.onAuthStateChanged(user => {
    if (user) {
      var profile = document.querySelector("nav .containerUser .profile .user img");
      var nameOfTheStartMarker = document.querySelector(".home .elementsOfHome .head-title .left .breadcrumb li .name");

      profile.src = user.photoURL
      nameOfTheStartMarker.innerHTML = "Olá, " + user.displayName
/*

      db.collection('comunicados').onSnapshot((data)=> {
        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var cards = document.createElement("div");
          cards.className = 'cards';
          cards.innerHTML = `
          <div class="container">
          <div class="topEl user">
          <img class="imgUser" src="${doc.data().photograph}" />
          </div>


          <div class="topEl text">
          <h1 class="name">${doc.data().name}</h1>
          <p class="date">
          ${doc.data().date}
          </p>
          </div>
          <div class="topEl icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" style="transform: ;msFilter:;"><circle cx="18" cy="6" r="3"></circle><path d="M18 19H5V6h8c0-.712.153-1.387.422-2H5c-1.103 0-2 .897-2 2v13c0 1.103.897 2 2 2h13c1.103 0 2-.897 2-2v-8.422A4.962 4.962 0 0 1 18 11v8z"></path></svg>
          </div>
          </div>
          <div class="message">
          ${doc.data().message}
          </div>
          <div class="adms">
          <img class="img1" src="images/user_01.jpg" />
          <img class="img2" src="images/user_02.jpg" />
          <img class="img3" src="images/user_03.jpg" />
          <img class="img4" src="images/user_04.jpg" />
          <a style="text-decoration: none;" href="https://wa.me/55${doc.data().contact}?text=Oi,%20gostaria%20de%20reportar%20um%20erro%20ou%20fazer uma sugestão" class="text" id="support">
          responder a ${doc.data().name}
          </a>
          </div>`;


          // *******************************

          document.querySelector("#containment-card-notifications").appendChild(cards);

          return doc.data();
        });
      }) 
      */

    } else {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(provider).then(resposta => {
        if (resposta.credential) {
          const token = resposta.credential.accessToken;
        }
        const user = resposta.user;
      }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
    }
  });
};