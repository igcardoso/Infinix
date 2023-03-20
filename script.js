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

      // window.alert("Olá " + user.displayName + ", o app está em manutenção e pode apresentar falhas.");
      db.collection('loading').doc('global').onSnapshot((doc)=> {

        if (doc.data().status == 'true') {
          setTimeout(function() {
            document.querySelector(".loading").style.left = "-1000%";
          }, 1000);
        }
      });

      db.collection('users').doc(user.uid).onSnapshot((doc)=> {
        var body = document.querySelector("body");
        var style = document.createElement("div");
        style.innerHTML = `<style type="text/css" media="all">
        :root {

        --poppins: 'Raleway', sans-serif;
        --lato: 'Lato', sans-serif;

        --light: ${doc.data().light};
        --blue: ${doc.data().blue};
        --blue-ios: #329FFC;
        --light-blue: #CFE8FF;
        --grey: ${doc.data().grey};
        --dark-grey: ${doc.data().darkGrey};
        --dark: ${doc.data().dark};
        --inverse-dark: ${doc.data().inverseDark};
        --red: #DB504A;
        --yellow: #FFCE26;
        --light-yellow: #FFF2C6;
        --orange: #FD7238;
        --light-orange: #FFE0D3;
        --white: #FFFFFF;
        --box-shadow: 0px 0px 15px #8383833e;
        --border-radius: 1.5em;
        }

        svg {
        fill: var(--dark);
        }

        </style>`;
        body.appendChild(style);

        if (doc.data().update == 'true') {
          document.querySelector("#update ").style.display = "none";
          document.querySelector("main").style.opacity = "1";
          document.querySelector("nav").style.opacity = "1";
        } else {
          document.querySelector("#update ").style.display = "block";
          document.querySelector("main").style.opacity = ".3";
          document.querySelector("nav").style.opacity = ".3";
        }


        return doc.data();
      });

      document.querySelector("#start_update").addEventListener("click",
        ()=> {
          var users = firebase.firestore().collection('users');

          users.doc(user.uid).set({
            name: user.displayName,
            photograph: user.photoURL,
            light: '#EFEFEF',
            blue: '#ffffff',
            grey: '#F9F9F9',
            darkGrey: '#000000',
            dark: '#000000',
            inverseDark: '#c5c5c5',
            update: 'true'
          });
        });

      var profile = document.querySelector("nav .containerUser .profile .user");
      var settings_profile = document.querySelector(".page6 .profile");
      var settings_name = document.querySelector(".page6 .name");
      var settings_mail = document.querySelector(".page6 .mail");


      var nameOfTheStartMarker = document.querySelector(".home .elementsOfHome .head-title .left .breadcrumb li .name");

      profile.innerHTML = `<img style="background: var(--light); width: 100%;" src="${user.photoURL}" />`;
      settings_profile.innerHTML = `<img style="background: var(--light); width: 100%;" src="${user.photoURL}" />`;
      settings_name.innerHTML = user.displayName;
      settings_mail.innerHTML = user.email;
      nameOfTheStartMarker.innerHTML = "Olá, " + user.displayName;

      const userLogin = user.email;


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

*/
      db.collection('authorizedDevices').onSnapshot((data)=> {
        data.docs.map(doc => {
          switch (userLogin) {
            case doc.data().firstAdmin:
              document.querySelector(".side-menu .control").style.display = "flex";
              break;
            case doc.data().secondAdmin:
              document.querySelector(".side-menu .control").style.display = "flex";
              break;
            case doc.data().thirdAdmin:
              document.querySelector(".side-menu .control").style.display = "flex";
              break;
            case doc.data().fourthAdmin:
              document.querySelector(".side-menu .control").style.display = "flex";
              break;

            default:
              document.querySelector(".side-menu .control").style.display = "none";
            }
            return doc.data();
          });
        })

        db.collection("comunicados")
        .orderBy("date",
          "desc").onSnapshot((data)=> {
            data.docs.map(doc => {
              console.log("objeto:",
                doc.data());

              var cards = document.createElement("div");
              cards.className = 'cards';
              cards.innerHTML = `<div class="container">
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
              responder
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

            highlights.addEventListener("click",
              function() {
                console.log("Executed successfully");
                document.querySelector("main .elementsOfHome").style.display = "none";
                document.querySelector("main .back").style.display = "block";
                document.querySelector("#content nav").style.display = "none";
                document.querySelector("main .back").innerHTML = '<svg height="25" viewBox="0 0 18 18" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M12.2197 6.03033C11.9268 5.73744 11.9268 5.26256 12.2197 4.96967C12.5126 4.67678 12.9874 4.67678 13.2803 4.96967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L13.2803 15.0303C12.9874 15.3232 12.5126 15.3232 12.2197 15.0303C11.9268 14.7374 11.9268 14.2626 12.2197 13.9697L16.1893 10L12.2197 6.03033Z" fill="var(--blue-ios)"/></svg>'

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

        db.collection('affairs').orderBy("date", "asc").onSnapshot((data)=> {

          data.docs.map(doc => {
            console.log("objeto:",
              doc.data());
            var Affairs = document.createElement("div");

            Affairs.innerHTML = `
            <ul>
            <li class="matter_name">${doc.data().name}</li>
            <li class="posting_date">Entrega: ${doc.data().date}</li>
            <li class="more" onclick="
            var display = document.getElementById('${doc.data().date}${doc.data().name}affairs').style.display;

            if (display == 'none') {
            document.getElementById('${doc.data().date}${doc.data().name}affairs').style.display = 'block';
            } else {
            document.getElementById('${doc.data().date}${doc.data().name}affairs').style.display = 'none';
            }
            " class="plus"><i>mais...</i>
            </li>
            <ul id="${doc.data().date}${doc.data().name}affairs">
            <li class="${doc.data().indexing_files}" onclick="window.location = '${doc.data().indexing_files}'">Arquivos</li>
            <li class="${doc.data().description}" >${doc.data().description}</li>
            <li class="${doc.data().photograph}" onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}"/></li>
            <li class="${doc.data().stitches}" >${doc.data().stitches}</li>
            </ul>
            </ul>`;

            // *******************************

            document.querySelector("#affairs").appendChild(Affairs);

            var page2 = document.querySelector("#page2");

            var day = document.createElement("div");
            day.style.padding = "20px";
            day.style.width = "100%";
            day.style.borderRadius = "var(--border-radius)";
            day.style.marginTop = "20px";
            day.style.height = "60px";
            day.style.background = "var(--light)";
            day.style.color = "var(--dark)";

            switch (doc.data().date) {
              case '2023-03-19':
                day.innerHTML = "Segunda: " + doc.data().name
                break;
              case '2023-03-20':
                day.innerHTML = "Terça: " + doc.data().name
                break;
              case '2023-03-21':
                day.innerHTML = "Quinta: " + doc.data().name
                break;
              case '2023-03-22':
                day.innerHTML = "Sexta: " + doc.data().name
                break;
              case '2023-03-23':
                day.innerHTML = "Sábado: " + doc.data().name
                break;
              case '2023-03-24':
                day.innerHTML = "Domingo: " + doc.data().name
                break;
              case '2023-03-25':
                day.innerHTML = "Segunda: " + doc.data().name
                break;

              default:
                // code
              }

              page2.appendChild(day)

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
              var display = document.getElementById('${doc.data().date}${doc.data().name}evaluations').style.display;

              if (display == 'none') {
              document.getElementById('${doc.data().date}${doc.data().name}evaluations').style.display = 'block';
              } else {
              document.getElementById('${doc.data().date}${doc.data().name}evaluations').style.display = 'none';
              }
              "  class="plus"><i>mais...</i>
              </li>
              <ul id="${doc.data().date}${doc.data().name}evaluations">
              <li class="${doc.data().indexing_files}" onclick="window.location = '${doc.data().indexing_files}'">Arquivos</li>
              <li class="${doc.data().description}">${doc.data().description}</li>
              <li class="${doc.data().photograph}" onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}" /></li>
              <li class="${doc.data().stitches}" >${doc.data().stitches}</li>
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


          document.querySelector("#publish__notification").addEventListener("submit",
            (e)=> {
              e.preventDefault();
              window.alert("Adicionado com sucesso");

              var sender__date = document.querySelector('[name=dateNotifications]').value;
              var sender__tel = document.querySelector('[name=telNotifications]').value;
              var message__sender = document.querySelector('[name=messageNotifications]').value;


              db.collection('comunicados').add({
                name: user.displayName,
                photograph: user.photoURL,
                contact: sender__tel,
                message: message__sender,
                date: sender__date
              });
              alert("Adicionado com sucesso");
              form.reset()
            });


          // Página de ferramentas


          document.querySelector("#publish__tools").addEventListener("submit",
            (e)=> {
              e.preventDefault();
              window.alert("Adicionado com sucesso");
              var nameTools = document.querySelector('[name=nameTools]').value;
              var linkTools = document.querySelector('[name=linkTools]').value;


              db.collection('websites').add({
                name: nameTools,
                icon: "bx bx-link",
                link: linkTools
              });
              alert("Adicionado com sucesso");
              form.reset()
            });


          // Página de trabalhos


          document.querySelector("#publish__work").addEventListener("submit",
            (e)=> {
              e.preventDefault();
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
              alert("Adicionado com sucesso");
              form.reset()
            });

          // Página de prova


          document.querySelector("#publish__evaluations").addEventListener("submit",
            (e)=> {
              e.preventDefault();
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
              alert("Adicionado com sucesso");
              form.reset()
            });

          // página de ajustes

          var clear_mode = document.querySelector("#clear_mode");
          var dark_mode = document.querySelector("#dark_mode");

          clear_mode.addEventListener("click", ()=> {
            db.collection('users').doc(user.uid).update({
              light: '#EFEFEF',
              blue: '#ffffff',
              grey: '#F9F9F9',
              darkGrey: '##000000',
              dark: '#000000',
              inverseDark: '#c5c5c5'
            });
          });

          dark_mode.addEventListener("click", ()=> {
            db.collection('users').doc(user.uid).update({
              light: '#3838387c',
              blue: '#000000',
              grey: '#000000',
              darkGrey: '#ffffff',
              dark: '#ffffff',
              inverseDark: '#f8f8f87f'
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