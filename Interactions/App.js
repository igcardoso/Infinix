
// constantemente com o caminho para os botões de transição de pagina do menu lateral
const allSideMenu = document.querySelectorAll('#sidebar .side-menu li .options');
/* adição e remoção da class de estilo por meio do
metodo forEach. ao clicar em uma option,
ela vai adiquirir uma class de ativa, uma
solução bem melhor do q a q eu tava usando*/
allSideMenu.forEach(item=> {
  const li = item.parentElement;

  item.addEventListener('click', function () {
    allSideMenu.forEach(i=> {
      i.parentElement.classList.remove('active');
    })
    // removendo nome active do atributo class
    li.classList.add('active');
  })
});


// abrir e fechar menu lateral

// botão de abrir menu
const menuBar = document.querySelector('#content nav .bx.bx-menu-alt-left');
// menu
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
  // criando uma class com o valor hide para fechar o menu

  // se eu estiver em um celular, ao clicar em expandir ele vai espadir normal e vai fechar completamente

  // se não ele vai abrir normal e fechar só ate 60px
  if (window.innerWidth < 768) {
    sidebar.classList.toggle('mobileHide');
  } else {
    sidebar.classList.toggle('hide');
    sidebar.classList.remove('mobileHide');
  }
})




// campo de busca

// botão de submit da pesquisa
const searchButton = document.querySelector('#content nav form .form-input button');
// icone do botão submit
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
// form da busca
const searchForm = document.querySelector('#content nav form');

// se o botão de pesquisa for clicado e o width da tela for menor q 576px, então o formulário vai ter uma class show
searchButton.addEventListener('click', function (e) {
  if (window.innerWidth < 768) {
    e.preventDefault();
    searchForm.classList.toggle('show');
    // se o formulário tiver uma class show
    if (searchForm.classList.contains('show')) {
      // então o icone do campo de busca vai ser um "x"
      searchButtonIcon.classList.replace('bx-search', 'bx-0');
      searchButtonIcon.innerHTML = "Cancelar"
    } else {
      // se não vai ser uma lupa
      searchButtonIcon.classList.replace('bx-0', 'bx-search');
      searchButtonIcon.innerHTML = ""
    }
  }
})




// comportamento dos menus ao tamanho da tela

// quando o width for menor q 768 o menu vai ser fechado

if (window.innerWidth < 768) {
  sidebar.classList.add('mobileHide');
} else if (window.innerWidth > 768) {
  sidebar.classList.remove('mobileHide')
  searchButtonIcon.classList.replace('bx-x', 'bx-search');
  searchForm.classList.remove('show');
}

// quando ouver um redimensionamento da pagina para um width maior, as configurações serão alteradas sem carregadar a pagina novamente
window.addEventListener('resize', function () {if (window.innerHeight > window.innerWidth) document.getElementById('app').className = 'retrato';
      else document.getElementById('wrapper').className = 'paisagem';
    });

    window.addEventListener('load', function() {
      document.getElementById('app').className = 'retrato';
    });
  
})

// ação de mudança de página ao clicar em uma opção no menu lateral
// página painel
document.querySelector("#sidebar .op1").addEventListener("click", function() {
  document.querySelector("main .home").classList.add("active");
  document.querySelector("main .page2").classList.remove("active");
  document.querySelector("main .page3").classList.remove("active");
  document.querySelector("main .page4").classList.remove("active");
  document.querySelector("main .page5").classList.remove("active");
  document.querySelector("main .page6").classList.remove("active");
  document.querySelector(".notification").classList.remove("active");
  document.querySelector("main .page7").classList.remove("active");
});

// página dados
document.querySelector("#sidebar .op2").addEventListener("click", function() {
  document.querySelector("main .home").classList.remove("active");
  document.querySelector("main .page2").classList.add("active");
  document.querySelector("main .page3").classList.remove("active");
  document.querySelector("main .page4").classList.remove("active");
  document.querySelector("main .page5").classList.remove("active");
  document.querySelector("main .page6").classList.remove("active");
  document.querySelector(".notification").classList.remove("active");
  document.querySelector("main .page7").classList.remove("active");
});

// página visitantes
document.querySelector("#sidebar .op3").addEventListener("click", function() {
  document.querySelector("main .home").classList.remove("active");
  document.querySelector("main .page2").classList.remove("active");
  document.querySelector("main .page3").classList.add("active");
  document.querySelector("main .page4").classList.remove("active");
  document.querySelector("main .page5").classList.remove("active");
  document.querySelector("main .page6").classList.remove("active");
  document.querySelector(".notification").classList.remove("active");
  document.querySelector("main .page7").classList.remove("active");
});

// página controle do app
document.querySelector("#sidebar .op4").addEventListener("click", function() {
  document.querySelector("main .home").classList.remove("active");
  document.querySelector("main .page2").classList.remove("active");
  document.querySelector("main .page3").classList.remove("active");
  document.querySelector("main .page4").classList.add("active");
  document.querySelector("main .page5").classList.remove("active");
  document.querySelector("main .page6").classList.remove("active");
  document.querySelector(".notification").classList.remove("active");
  document.querySelector("main .page7").classList.remove("active");
});

// página equipe de acesso
document.querySelector("#sidebar .op5").addEventListener("click", function() {
  document.querySelector("main .home").classList.remove("active");
  document.querySelector("main .page2").classList.remove("active");
  document.querySelector("main .page3").classList.remove("active");
  document.querySelector("main .page4").classList.remove("active");
  document.querySelector("main .page5").classList.add("active");
  document.querySelector("main .page6").classList.remove("active");
  document.querySelector(".notification").classList.remove("active");
  document.querySelector("main .page7").classList.remove("active");
});

// página de configurações
document.querySelector("nav .op6").addEventListener("click", function() {
  document.querySelector("main .home").classList.remove("active");
  document.querySelector("main .page2").classList.remove("active");
  document.querySelector("main .page3").classList.remove("active");
  document.querySelector("main .page4").classList.remove("active");
  document.querySelector("main .page5").classList.remove("active");
  document.querySelector("main .page6").classList.add("active");
  document.querySelector(".notification").classList.remove("active");
  document.querySelector("main .page7").classList.remove("active");
  document.querySelector("#sidebar .side-menu .active").classList.remove("active");
});

// página de notificações
document.querySelector("nav .op7").addEventListener("click", function() {
  document.querySelector("main .home").classList.remove("active");
  document.querySelector("main .page2").classList.remove("active");
  document.querySelector("main .page3").classList.remove("active");
  document.querySelector("main .page4").classList.remove("active");
  document.querySelector("main .page5").classList.remove("active");
  document.querySelector("main .page6").classList.remove("active");
  document.querySelector(".notification").classList.add("active");
  document.querySelector("main .page7").classList.add("active");
  document.querySelector("#sidebar .side-menu .active").classList.remove("active");
});

// botão de logout

document.querySelector("#logout").addEventListener("click", function() {
  document.querySelector("#confirmation"). style.display = "block";
})

document.querySelector("#cancel").addEventListener("click", function() {
  document.querySelector("#confirmation"). style.display = "none";
})

document.querySelector("#ok").addEventListener("click", function() {
  window.location = "logout";
})


// Interações básicas

var developer1 = document.querySelector("#content .home .containment-support .block-info .img1");
var developer2 = document.querySelector("#content .home .containment-support .block-info .img2");
var developer3 = document.querySelector("#content .home .containment-support .block-info .img3");
var developer4 = document.querySelector("#content .home .containment-support .block-info .img4");
var label = document.querySelector("#content .home .containment-support label");

developer1.addEventListener("mouseup", function() {
  label.innerHTML = "@Igor O. Cardoso | developer"
  label.style.opacity = "1"
})

developer1.addEventListener("mouseout", function() {
  label.innerHTML = ""
  label.style.opacity = "0"
})
 
// img2

developer2.addEventListener("mouseup", function() {
  label.innerHTML = "@Sarah | adm"
  label.style.opacity = "1"
})

developer2.addEventListener("mouseout", function() {
  label.innerHTML = ""
  label.style.opacity = "0"
})

// img3 

developer3.addEventListener("mouseup", function() {
  label.innerHTML = "@Clara | adm"
  label.style.opacity = "1"
})

developer3.addEventListener("mouseout", function() {
  label.innerHTML = ""
  label.style.opacity = "0"
})

// img4

developer4.addEventListener("mouseup", function() {
  label.innerHTML = "@Bruno Rios | developer"
  label.style.opacity = "1"
})

developer4.addEventListener("mouseout", function() {
  label.innerHTML = ""
  label.style.opacity = "0"
})