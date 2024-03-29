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
          document.querySelector("#loading .name-uiFace").innerHTML = "Bem Vindo, " + "<br />" + user.displayName
          document.querySelector("#loading .lds-spinner").style.display = "none"
          document.querySelector("#Loading_check").style.display = "block"
          
          setTimeout(function() {
            document.querySelector(".loading").style.left = "-1000%";
          }, 2200);
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
          document.querySelector("#update").style.display = "none";
          document.querySelector("main").style.opacity = "1";
          document.querySelector("nav").style.opacity = "1";
        } else {
          document.querySelector("#update").style.display = "block";
          document.querySelector("main").style.opacity = "0.1";
          document.querySelector("nav").style.opacity = "0.1";
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
            case doc.data().sixthAdmin:
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
            <span class="text">
            <h3>${doc.data().name}</h3>
            <p>
            <label>Site:</label> Oficial
            </p>
            </span>
            <i class='bx'><svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.63 7.1499C18.67 7.7599 18.62 8.4499 18.5 9.2199L17.77 13.9099C17.15 17.8199 15.34 19.1399 11.43 18.5299L6.73999 17.7899C5.38999 17.5799 4.34999 17.2199 3.58999 16.6799C2.13999 15.6699 1.71999 14.0099 2.11999 11.4499L2.85999 6.7599C3.47999 2.8499 5.28999 1.5299 9.19999 2.1399L13.89 2.8799C17.03 3.3699 18.5 4.6499 18.63 7.1499Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.5 13.4699L19 17.9799C17.75 21.7399 15.75 22.7399 11.99 21.4899L7.48003 19.9899C5.21003 19.2399 3.95003 18.1999 3.59003 16.6799C4.35003 17.2199 5.39003 17.5799 6.74003 17.7899L11.43 18.5299C15.34 19.1399 17.15 17.8199 17.77 13.9099L18.5 9.2199C18.62 8.4499 18.67 7.7599 18.63 7.1499C21.02 8.4199 21.54 10.3399 20.5 13.4699Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.24 8.98C9.20098 8.98 9.98 8.20098 9.98 7.24C9.98 6.27902 9.20098 5.5 8.24 5.5C7.27902 5.5 6.5 6.27902 6.5 7.24C6.5 8.20098 7.27902 8.98 8.24 8.98Z" stroke="var(--grey)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg></i>`;

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
            <span class="text">
            <img style="border-radius: 8em; " width="30px" height="30px" src="images/logo.jpg" />
            <p class="administration">ADMINISTRAÇÃO</p>
            <h3>${doc.data().name}</h3>
            <p>
            <label>Atualizado:</label> ${doc.data().update_date}
            </p>
            </span>
            <i class='bx_home_tools bx'> ${doc.data().icon}</i>
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

        db.collection('affairs').orderBy("day", "asc").onSnapshot((data)=> {

          data.docs.map(doc => {
            console.log("objeto:",
              doc.data());
            var Affairs = document.createElement("div");
            var shar7 = doc.data().day + doc.data().month + doc.data().year

            Affairs.innerHTML = `
            <ul>
            <li class="matter_name">${doc.data().name}</li>
            <li class="posting_date">Entrega: ${doc.data().day}/0${doc.data().month}/${doc.data().year}</li>
            <li class="more" onclick="
            var display = document.getElementById('${shar7}${doc.data().name}affairs').style.display;

            if (display == 'none') {
            document.getElementById('${shar7}${doc.data().name}affairs').style.display = 'block';
            } else {
            document.getElementById('${shar7}${doc.data().name}affairs').style.display = 'none';
            }
            " class="plus"><i>mais...</i>
            </li>
            <ul id="${shar7}${doc.data().name}affairs">
            <li style="text-align: justify;" class="${doc.data().description}" >${doc.data().description}</li>
            <li style="background: var(--dark); color: var(--grey); border: none; border-radius: var(--border-radius); padding:7px; font-weight: 700;"  class="${doc.data().indexing_files}" onclick="window.location = '${doc.data().indexing_files}'">Visualizar arquivos</li>
            <li class="${doc.data().photograph}" onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}"/></li>
            <li class="${doc.data().stitches}" >Nota: ${doc.data().stitches}</li>
            </ul>
            </ul>`;

            // *******************************

            document.querySelector("#affairs").appendChild(Affairs);

            var page2 = document.querySelector("#page2 .contant_day");

            var day = document.createElement("div");
            day.classList.add('my_week');

            var matter = document.createElement("div");
            matter.classList.add('matter');
            day.appendChild(matter);
            var name_container = document.createElement("p");
            name_container.classList.add('name_container');
            matter.appendChild(name_container);

            var day_date = document.createElement("div");
            day_date.classList.add('day_date');
            day.appendChild(day_date);
            var name_containerDayDate = document.createElement("p");
            name_containerDayDate.classList.add('name_container');
            day_date.appendChild(name_containerDayDate);


            var dSemana = doc.data().year + "-0" + doc.data().month + "-" + doc.data().day

            var Xmas95 = new Date(`0${doc.data().month} ${doc.data().day}, ${doc.data().year} 00:00:00`);
            var weekday = Xmas95.getDay();

            var data = new Date();
            var dayAtual = String(data.getDate()).padStart(2,
              '0');
            var tomorrow = String(data.getDate() + 1).padStart(2,
              '0');
            var monthAtual = String(data.getMonth() + 1).padStart(2,
              '0');
            var yearAtual = data.getFullYear();
            // dataAtual = dayAtual + '/' + monthAtual + '/' + yearAtual;

            var dHoje = new Date(`${monthAtual} ${dayAtual}, ${yearAtual} 01:00:00`)
            var dyHoje = dHoje.getDay();



            switch (weekday) {
              case 1:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Segunda: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;
              case 2:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Terça: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;
              case 3:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Quarta: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;
              case 4:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Quinta: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;
              case 5:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Sexta: "  + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;
              case 6:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Sábado: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;
              case 7:
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Domingo: "  + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
                break;

              default:
                console.log("error")
              }

              if (doc.data().day == dayAtual) {
                day.style.background = "#fa3400";
                day.style.color = "var(--light)";
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Hoje: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
              } else if (doc.data().day == tomorrow) {
                day.style.background = "var(--blue-ios)";
                day.style.color = "var(--light)";
                name_container.innerHTML = doc.data().name
                name_containerDayDate.innerHTML = "Amanhã: " + doc.data().day + "/" + doc.data().month + "/" + doc.data().year
              } else if (doc.data().day < dayAtual) {
                day.style.display = "none";
              } else if (0 + doc.data().month < monthAtual) {
                day.style.display = "none";
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
              <li style="text-align: justify;" class="${doc.data().description}">${doc.data().description}</li>
              <li style="background: var(--dark); color: var(--grey); border: none; border-radius: var(--border-radius); padding:7px; font-weight: 700;" class="${doc.data().indexing_files}" onclick="window.location = '${doc.data().indexing_files}'">Visualizar arquivos</li>
             <li class="${doc.data().photograph}" onclick="window.location = '${doc.data().photograph}'" ><img src="${doc.data().photograph}" /></li>
              <li class="${doc.data().stitches}" >Nota: ${doc.data().stitches}</li>
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
              var dayWork = document.querySelector('[name=dayWork]').value;
              var monthWork = document.querySelector('[name=monthWork]').value;
              var yearWork = document.querySelector('[name=yearWork]').value;
              var indexing_filesWork = document.querySelector('[name=indexing_filesWork]').value;
              var photographWork = document.querySelector('[name=photographWork]').value;
              var stitchesWork = document.querySelector('[name=stitchesWork]').value;
              var descriptionWork = document.querySelector('[name=descriptionWork]').value;


              db.collection('affairs').add({
                day: dayWork,
                month: monthWork,
                year: yearWork,
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
            clear_mode.style.display = "none";
            dark_mode.style.display = "flex";
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
            dark_mode.style.display = "none";
            clear_mode.style.display = "flex";
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