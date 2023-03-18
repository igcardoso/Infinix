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
});
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
      var profile = document.querySelector("nav .containerUser .profile .user");
      var nameOfTheStartMarker = document.querySelector(".home .elementsOfHome .head-title .left .breadcrumb li .name");

      profile.innerHTML = `<img style="background: var(--light); width: 100%;" src="${user.photoURL}" />`;
      nameOfTheStartMarker.innerHTML = "Olá, " + user.displayName;
      const userLogin = user.email;

      if (userLogin == "ioliveiracardoso76@gmail.com") {
        document.querySelector(".side-menu .control").style.display = "flex";
      } else if (userLogin == "aprogrammer155@gmail.com") {
        document.querySelector(".side-menu .control").style.display = "flex";

      } else if (userLogin == "anacllaralili@gmail.com") {
        document.querySelector(".side-menu .control").style.display = "flex";

      } else if (userLogin == "bimatosv@gmail.com") {
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
      db.collection("comunicados")
      .orderBy("date", "desc").onSnapshot((data)=> {
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
          <svg style="margin-bottom: -3px;" height="19.409px" id="Capa_1" style="enable-background:new 0 0 27.147 21.409;" version="1.1" viewBox="0 0 27.147 21.409" width="25.147px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M9.971,4.226c5.505,0,9.97,3.402,9.97,7.598   s-4.465,7.597-9.97,7.597c-0.972,0-1.91-0.106-2.798-0.303C6,21.244,3.872,21.716,1.969,21.238c1.147-0.984,2.137-1.916,2.88-2.896   C1.944,17.015,0,14.592,0,11.824C0,7.628,4.465,4.226,9.971,4.226z" /><path d="M17.178,0c-3.416,0-6.432,1.31-8.229,3.307   c4.46-1.197,15.345,3.597,11.237,11.604c1.173,2.126,3.089,2.578,4.993,2.1c-1.147-0.984-2.137-1.916-2.88-2.896   c2.903-1.328,4.848-3.75,4.848-6.519C27.147,3.402,22.683,0,17.178,0z" /></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
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
      });

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
              console.log("Executed successfully");
              window.location = `${doc.data().link}`;
            });

          // *******************************

          document.querySelector("#tools").appendChild(website);

          return doc.data();
        });
      });

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
            console.log("Executed successfully");
            document.querySelector("main .elementsOfHome").style.display = "none";
            document.querySelector("main .back").style.display = "block";
            document.querySelector("#content nav").style.display = "none";
            document.querySelector("main .back").innerHTML = '<svg style="transform: rotate(180deg); margin-bottom:-3px;" height="25" viewBox="0 0 18 18" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M12.2197 6.03033C11.9268 5.73744 11.9268 5.26256 12.2197 4.96967C12.5126 4.67678 12.9874 4.67678 13.2803 4.96967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L13.2803 15.0303C12.9874 15.3232 12.5126 15.3232 12.2197 15.0303C11.9268 14.7374 11.9268 14.2626 12.2197 13.9697L16.1893 10L12.2197 6.03033Z" fill="var(--blue-ios)"/></svg>'

            document.querySelector("main .highlights").classList.add('adisappear');
            document.querySelector("main").classList.add('activEsuBpage');

            if (doc.data().type == "affairs") {
              document.querySelector("#affairs").style.display = "block";
              document.querySelector("#evaluation").style.display = "none";
              document.querySelector("#timetables").style.display = "none";

            } else if (doc.data().type == "evaluation") {
              document.querySelector("#affairs").style.display = "none";
              document.querySelector("#evaluation").style.display = "block";
              document.querySelector("#timetables").style.display = "none";

            } else if (doc.data().type == "timetables") {
              document.querySelector("#affairs").style.display = "none";
              document.querySelector("#evaluation").style.display = "none";
              document.querySelector("#timetables").style.display = "block";
            } else {
              document.querySelector("#affairs").style.display = "none";
              document.querySelector("#evaluation").style.display = "none";
              document.querySelector("#timetables").style.display = "none";
            }


            document.querySelector("main .home .back").addEventListener("click", function() {
              document.querySelector("main .elementsOfHome").style.display = "block";
              document.querySelector("main .back").style.display = "none";
              document.querySelector("#content nav").style.display = "flex";
              document.querySelector("main .highlights").classList.remove('adisappear');
              document.querySelector("main").classList.remove('activEsuBpage');
            });




          });

          // *******************************

          document.querySelector("#highlights").appendChild(highlights);

          return doc.data();
        });
      });

      db.collection('affairs').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var Affairs = document.createElement("div");

          Affairs.innerHTML = `
          <ul>
          <li class="matter_name">${doc.data().name}</li>
          <li class="posting_date">Entrega: ${doc.data().date}</li>
          <li class="more" onclick="
          var display = document.getElementById('${doc.data().name}affairs').style.display;

          if (display == 'none') {
          document.getElementById('${doc.data().name}affairs').style.display = 'block';
          } else {
          document.getElementById('${doc.data().name}affairs').style.display = 'none';
          }
          " class="plus"><i>mais...</i>
          </li>
          <ul id="${doc.data().name}affairs">
          <li class="${doc.data().indexing_files}" onclick="window.location = '${doc.data().indexing_files}'">Arquivos</li>
          <li class="${doc.data().description}" >${doc.data().description}</li>
        <li class="${doc.data().photograph}" onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}"/></li>
          <li>${doc.data().stitches}</li>
          </ul>
          </ul>`;

          // *******************************

          document.querySelector("#affairs").appendChild(Affairs);

          return doc.data();
        });
      });

      db.collection('evaluation').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());
          var evaluation = document.createElement("div");
          evaluation.innerHTML = `<ul>
          <li class="matter_name">${doc.data().name}</li>
          <li class="posting_date">Entrega: ${doc.data().date}</li>
          <li class="more" onclick="
          var display = document.getElementById('${doc.data().name}evaluations').style.display;

          if (display == 'none') {
          document.getElementById('${doc.data().name}evaluations').style.display = 'block';
          } else {
          document.getElementById('${doc.data().name}evaluations').style.display = 'none';
          }
          "  class="plus"><i>mais...</i>
          </li>
          <ul id="${doc.data().name}evaluations">
          <li class="${doc.data().indexing_files}" onclick="window.location = '${doc.data().indexing_files}'">Arquivos</li>
          <li class="${doc.data().description}">${doc.data().description}</li>
          <li class="${doc.data().photograph}" onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}" /></li>
          <li>${doc.data().stitches}</li>
          </ul>
          </ul>`;

          // *******************************

          document.querySelector("#evaluation").appendChild(evaluation);

          return doc.data();
        });
      });

      db.collection('timetables').onSnapshot((data)=> {

        data.docs.map(doc => {
          console.log("objeto:",
            doc.data());

          document.querySelector("#timetables").innerHTML = `<img onclick="window.location.href = 'images/${doc.data().image}.jpg'" style="width: 100%; border-radius: var(--border-radius);" src="images/${doc.data().image}.jpg" alt="Horários" />`;

          return doc.data();
        });
      });


      // Página de controle


      document.querySelector("#publish__notification").addEventListener("click",
        ()=> {
          window.alert("Adicionado com sucesso");
          var sender__notification = document.querySelector('[name=nameNotifications]').value;
          var user__sender = document.querySelector('[name=userNotifications]').value;
          var sender__date = document.querySelector('[name=dateNotifications]').value;
          var sender__tel = document.querySelector('[name=telNotifications]').value;
          var message__sender = document.querySelector('[name=messageNotifications]').value;


          db.collection('comunicados').add({
            name: sender__notification,
            photograph: "images/" + user__sender + ".jpg",
            contact: sender__tel,
            message: message__sender,
            date: sender__date
          });
        });


      // Página de ferramentas


      document.querySelector("#publish__tools").addEventListener("click",
        ()=> {
          window.alert("Adicionado com sucesso");
          var nameTools = document.querySelector('[name=nameTools]').value;
          var linkTools = document.querySelector('[name=linkTools]').value;


          db.collection('websites').add({
            name: nameTools,
            icon: "bx bx-link",
            link: linkTools
          });
        });


      // Página de trabalhos


      document.querySelector("#publish__work").addEventListener("click",
        ()=> {
          window.alert("Adicionado com sucesso");
          var nameWork = document.querySelector('[name=nameWork]').value;
          var dateWork = document.querySelector('[name=dateWork]').value;
          var indexing_filesWork = document.querySelector('[name=indexing_filesWork]').value;
          var photographWork = document.querySelector('[name=photographWork]').value;
          var stitchesWork = document.querySelector('[name=stitchesWork]').value;
          var descriptionWork = document.querySelector('[name=descriptionWork]').value;


          db.collection('affairs').add({
            date: dateWork,
            description: descriptionWork,
            indexing_files: indexing_filesWork,
            name: nameWork,
            photograph: photographWork,
            stitches: stitchesWork
          });
        });

      // Página de provaa


      document.querySelector("#publish__evaluations").addEventListener("submit",
        ()=> {
          window.alert("Adicionado com sucesso");
          var nameEvaluation = document.querySelector('[name=nameEvaluation]').value;
          var dateEvaluation = document.querySelector('[name=dateEvaluation]').value;
          var indexing_filesEvaluation = document.querySelector('[name=indexing_filesEvaluation]').value;
          var photographEvaluation = document.querySelector('[name=photographEvaluation]').value;
          var stitchesEvaluation = document.querySelector('[name=stitchesEvaluation]').value;
          var descriptionEvaluation = document.querySelector('[name=descriptionEvaluation]').value;


          db.collection('evaluation').add({
            date: dateEvaluation,
            description: descriptionEvaluation,
            indexing_files: indexing_filesEvaluation,
            name: nameEvaluation,
            photograph: photographEvaluation,
            stitches: stitchesEvaluation
          });
        });

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