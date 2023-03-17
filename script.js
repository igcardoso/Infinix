var config = {
  apiKey: "AIzaSyAfYYbhdqzTZnD4gaPjOfYC1F-m6SNgiLg",
  authDomain: "infinix-d200d.firebaseapp.com",
  projectId: "infinix-d200d",
  storageBucket: "infinix-d200d.appspot.com",
  messagingSenderId: "618474026565",
  appId: "1:618474026565:web:2db11006169e62d5cd952c",
  measurementId: "G-Q6K70V3GBZ"
};

firebase.initializeApp(config);
// Apenas para remover um warning
firebase.firestore().settings({
  timestampsInSnapshots: true,

});

const db = firebase.firestore();
const auth = firebase.auth();

document.querySelector("#logout").addEventListener("click", function() {
  // Faço um logout do meu usuário (saio da aplicação).
  firebase.auth().signOut().then(() => {
    alert('Usuário deslogou');
  });
})
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
      const userLogin = user.email;

      if (userLogin == "ioliveiracardoso76@gmail.com") {
        document.querySelector(".side-menu .control").style.display = "flex";
      } else if (userLogin == "aprogrammer155@gmail.com") {
        document.querySelector(".side-menu .control").style.display = "flex";

      } else {
        document.querySelector(".side-menu .control").style.display = "none";
      }
      /*
function getIp(callback) {
  function response(s) {
    callback(window.userip);

    s.onload = s.onerror = null;
    document.body.removeChild(s);
  }

  function trigger() {
    window.userip = false;

    var s = document.createElement("script");
    s.async = true;
    s.onload = function() {
      response(s);
    };
    s.onerror = function() {
      response(s);
    };

    s.src = "https://l2.io/ip.js?var=userip";
    document.body.appendChild(s);
  }

  if (/^(interactive|complete)$/i.test(document.readyState)) {
    trigger();
  } else {
    document.addEventListener('DOMContentLoaded', trigger);
  }
}


db.collection('authorizedDevices').onSnapshot((data)=> {
  data.docs.map(doc => {
    console.log("objeto:", doc.data());
    getIp(function (ip) {
      if (`${doc.data().devices}` == ip) {
        window.alert("bem vindo")
    } else if (`${doc.data().devices}` < ip) {
        alert("vaza!")
      } else {
        alert("vaza!")
      }
    });

    return doc.data();
  });
})
*/
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

      db.collection('websites').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var website = document.createElement("li");
          website.className = 'website';
          website.innerHTML = `<div class="marcador">
          <div></div>
          <div></div>
          </div>
          <i class='${doc.data().icon}'></i>
          <span class="text">
          <h3>${doc.data().name}</h3>
          <p>
          <label>Site:</label> Oficial
          </p>
          </span>`;

          website.addEventListener("click",
            function() {
              console.log("Executed successfully")
              window.location = `${doc.data().link}`
            })

          // *******************************

          document.querySelector("#tools").appendChild(website);

          return doc.data();
        });
      })

      db.collection('highlights').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var highlights = document.createElement("li");
          highlights.innerHTML = `
          <div class="marcador">
          <div></div>
          <div></div>
          </div>
          <i class='${doc.data().icon}'></i>
          <span class="text">
          <h3>${doc.data().name}</h3>
          <p>
          <label>Atualizado:</label> ${doc.data().update_date}
          </p>
          </span>
          `;

          highlights.addEventListener("click", function() {
            console.log("Executed successfully")
            document.querySelector("main .elementsOfHome").style.display = "none"
            document.querySelector("main .back").style.display = "block"
            document.querySelector("#content nav").style.display = "none"
            document.querySelector("main .back").innerHTML = '<svg style="transform: rotate(180deg); margin-bottom:-3px;" height="20" viewBox="0 0 18 18" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12.2197 6.03033C11.9268 5.73744 11.9268 5.26256 12.2197 4.96967C12.5126 4.67678 12.9874 4.67678 13.2803 4.96967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L13.2803 15.0303C12.9874 15.3232 12.5126 15.3232 12.2197 15.0303C11.9268 14.7374 11.9268 14.2626 12.2197 13.9697L16.1893 10L12.2197 6.03033Z" fill="var(--blue-ios)"/>'

            document.querySelector("main .highlights").classList.add('adisappear')
            document.querySelector("main").classList.add('activEsuBpage')

            if (doc.data().type == "affairs") {
              document.querySelector("#affairs").style.display = "block"
              document.querySelector("#evaluation").style.display = "none"
              document.querySelector("#timetables").style.display = "none"

            } else if (doc.data().type == "evaluation") {
              document.querySelector("#affairs").style.display = "none"
              document.querySelector("#evaluation").style.display = "block"
              document.querySelector("#timetables").style.display = "none"

            } else if (doc.data().type == "timetables") {
              document.querySelector("#affairs").style.display = "none"
              document.querySelector("#evaluation").style.display = "none"
              document.querySelector("#timetables").style.display = "block"
            } else {
              document.querySelector("#affairs").style.display = "none"
              document.querySelector("#evaluation").style.display = "none"
              document.querySelector("#timetables").style.display = "none"
            }


            document.querySelector("main .home .back").addEventListener("click", function() {
              document.querySelector("main .elementsOfHome").style.display = "block"
              document.querySelector("main .back").style.display = "none"
              document.querySelector("#content nav").style.display = "flex"
              document.querySelector("main .highlights").classList.remove('adisappear')
              document.querySelector("main").classList.remove('activEsuBpage')
            })




          })

          // *******************************

          document.querySelector("#highlights").appendChild(highlights);

          return doc.data();
        });
      })

      db.collection('affairs').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var Affairs = document.createElement("div");

          Affairs.innerHTML = `

          <ul>
          <li class="matter_name">${doc.data().name}</li>
          <li class="posting_date">${doc.data().date}</li>
          <li class="more" onclick="
          var display = document.getElementById('${doc.data().name}affairs').style.display;

          if (display == 'none') {
          document.getElementById('${doc.data().name}affairs').style.display = 'block';
          } else {
          document.getElementById('${doc.data().name}affairs').style.display = 'none';
          }
          " class="plus"><i class="bx bx-plus"></i>
          </li>
          <ul id="${doc.data().name}affairs">
          <li onclick="window.location = '${doc.data().indexing_files}'">Arquivos</li>
          <li>${doc.data().description}</li>
          <li onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}" /></li>
          <li>${doc.data().stitches}</li>
          </ul>

          </ul>`

          // *******************************

          document.querySelector("#affairs").appendChild(Affairs);

          return doc.data();
        });
      })

      db.collection('evaluation').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var evaluation = document.createElement("div");
          evaluation.innerHTML = `<ul>
          <li class="matter_name">${doc.data().name}</li>
          <li class="posting_date">${doc.data().date}</li>
          <li class="more" onclick="
          var display = document.getElementById('${doc.data().name}evaluations').style.display;

          if (display == 'none') {
          document.getElementById('${doc.data().name}evaluations').style.display = 'block';
          } else {
          document.getElementById('${doc.data().name}evaluations').style.display = 'none';
          }
          "  class="plus"><i class="bx bx-plus"></i>
          </li>
          <ul id="${doc.data().name}evaluations">
          <li onclick="window.location = '${doc.data().indexing_files}'">Arquivos</li>
          <li>${doc.data().description}</li>
          <li onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}" /></li>
          <li>${doc.data().stitches}</li>
          </ul>

          </ul>`

          // *******************************

          document.querySelector("#evaluation").appendChild(evaluation);

          // Página de controle


          document.querySelector("#publish__notification").addEventListener("click",
            ()=> {
              var sender__notification = document.querySelector('[name=name]').value;
              var user__sender = document.querySelector('[name=user]').value;
              var sender__date = document.querySelector('[name=date]').value;
              var sender__tel = document.querySelector('[name=tel]').value;
              var message__sender = document.querySelector('[name=message]').value;
             
             
              db.collection('comunicados').add({
                name: sender__notification,
                photograph: "images/" + user__sender + ".jpg",
                contact: sender__tel,
                message: message__sender,
                date: sender__date
              })
            })

          return doc.data();
        });
      })

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
      })
    }
  })
}