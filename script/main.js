'use strict';

window.addEventListener("load", ajouterClasseAuClickMenu);
window.addEventListener("load", ajouterUneClassAuScroll);
window.addEventListener("load", ajouterClasseAuClickPlus);
window.addEventListener("load", ajouterClasseAuClickMenuResp);
window.addEventListener("load", enleverLesPopups);
window.addEventListener("load", shadowSurLesRonds);
window.addEventListener("load", ajouterClasseAuSurvolCarte);
window.addEventListener("load", filtreProjets);
window.addEventListener("load", gestionCompetences);
window.addEventListener("load", afficherDiv);
window.addEventListener("load", compteurDiv);


window.addEventListener("load", ajouterClasseAuClickNav);
window.addEventListener("click", ajouterClasseAuClickProjets);

function compteurDiv() {
  const liens = document.querySelectorAll('.carte .liens');

  liens.forEach(lien => {
    const imgTxts = lien.querySelectorAll('.imgTxt');
    const eye = lien.querySelector('a');
    const lastA = document.querySelector('.video');

    if (imgTxts.length === 1) {
      lien.style.gridTemplateColumns = 'repeat(1, 1fr)'
    }
    else if (imgTxts.length === 2) {
      lien.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    else if (imgTxts.length === 3) {
      lien.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
    else if (imgTxts.length === 4) {
      if (lien.querySelectorAll('a').length > 1) {
        eye.style.gridArea = '3 / 5 / 2 / 2';
        lastA.style.gridArea = '3 / 2 / 2 / 2';
      }
    }
    else if (imgTxts.length === 5) {
      lien.style.gridRowGap = '10px';
      if (lien.querySelectorAll('a').length === 1) {
        eye.style.gridArea = '3 / 5 / 3 / 1';
      }
      if (lien.querySelectorAll('a').length === 2) {
        eye.style.gridArea = '3 / 3 / 3 / 2';
        lastA.style.gridArea = '3 / 3 / 3 / 3';
      }
    }


  });
}

function afficherDiv() {
  const divs = document.querySelectorAll('.pro');
  const indexAffiche = parseInt(localStorage.getItem("indexAffiche")) || 0;

  for (let i = 0; i < divs.length; i++) {
    if (i === indexAffiche) {
      divs[i].style.display = "flex";
    } else {
      divs[i].style.display = "none";
    }
  }

  localStorage.setItem("indexAffiche", (indexAffiche + 1) % divs.length);
}




function ajouterClasseAuClickProjets(e) {
  const categories = document.querySelectorAll('.categorie');

  if (e.target.classList.contains("categorie")) {
    categories.forEach(element => element.classList.remove('select'));
    e.target.classList.add('select');
  }
}

function filtreProjets() {
  const categories = document.querySelectorAll('.categorie');
  const cartes = document.querySelectorAll('.carte');

  for (let categorie of categories) {
    categorie.addEventListener('click', () => {
      for (let carte of cartes) {
        if (categorie.textContent.toLowerCase() === 'tous') {
          carte.style.display = 'flex';
        } else {
          carte.style.display = 'none';
          if (carte.classList.contains(categorie.textContent.toLowerCase())) {
            carte.style.display = 'flex';
          }
        }
      }
    });
  }
}


function ajouterClasseAuClickNav(e) {
  if (e.target.classList.contains("point")) {
    const elementsActifs = document.querySelectorAll('.point.active');
    elementsActifs.forEach(element => element.classList.remove('active'));
    e.target.classList.add("active");
  }
}

// Fonction qui ajoute la classe "active" aux éléments de navigation en fonction
// de l'élément sélectionné par l'utilisateur dans le menu
function ajouterClasseAuClickMenu(e) {
  // Sélection de tous les éléments de navigation
  const sections = document.querySelectorAll('nav a');
  // Sélection de tous les éléments de navigation spéciaux
  const points = document.querySelectorAll('.point-spe');
  // Sélection de l'élément de navigation non spécial
  const pointNonSpe = document.querySelector('.point');

  // Pour chaque élément de navigation
  sections.forEach((section, index) => {
    // Écoute de l'événement "click" sur cet élément
    section.addEventListener('click', () => {
      // Enlèvement de la classe "active" à chaque élément de navigation spécial
      points.forEach(point => point.classList.remove('active'));
      // Enlèvement de la classe "active" à l'élément de navigation non spécial
      pointNonSpe.classList.remove('active');
      // Ajout de la classe "active" à l'élément de navigation spécial correspondant
      // à l'élément de navigation sélectionné par l'utilisateur
      points[index].classList.add('active');
    });
  });
}



function ajouterUneClassAuScroll() {
  const points = document.querySelectorAll(".point");
  const sections = document.querySelectorAll("section");


  window.addEventListener("scroll", () => {
    points.forEach((point, index) => {
      let scrollValues = [0];
      sections.forEach(section => {
        scrollValues.push(section.offsetTop + section.offsetHeight / 2);
      });
      if (window.scrollY === scrollValues[0]) {
        scrollValues = [-1];
      }
      if (window.scrollY > scrollValues[index] && (window.scrollY < scrollValues[index + 1] || index === scrollValues.length - 1)) {
        point.classList.add("active");
      } else {
        point.classList.remove("active");
      }
    });
  });
}



function ajouterClasseAuClickPlus(e) {
  const pplus = document.querySelector('.plus p');
  const resp_pplus = document.querySelector('.resp-plus p');

  pplus.addEventListener('click', function () {
    const plus = document.querySelector('.plus');
    const plus_cont = document.querySelector('.plus .container');
    if (plus.classList.contains('active')) {
      plus_cont.style.opacity = 0;
      plus.classList.remove('active');
      setTimeout(() => {
        plus_cont.classList.add('display-none');
      }, 250);
    } else {
      plus.classList.add('active');
      setTimeout(() => {
        plus_cont.style.opacity = 1;
      }, 250);
      plus_cont.classList.remove('display-none');

    }
  });

  resp_pplus.addEventListener('click', function () {
    const resp_plus = document.querySelector('.resp-plus');
    const resp_plus_cont = document.querySelector('.resp-plus .container');
    if (resp_plus.classList.contains('active')) {
      resp_plus.classList.remove('active');
      resp_plus_cont.style.opacity = 0;
      setTimeout(() => {
        resp_plus_cont.classList.add('display-none');
      }, 250);
    } else {
      resp_plus.classList.add('active');
      resp_plus_cont.classList.remove('display-none');
      resp_plus_cont.style.opacity = 1;
    }
  });
}


function ajouterClasseAuClickMenuResp(e) {
  const menu = document.querySelector('.menu');
  menu.addEventListener('click', function () {
    const menu_block = document.querySelector('.block');
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      menu.src = "./images/menu.svg"
      menu_block.style.width = '0';
    } else {
      menu.classList.add('active');
      menu_block.style.width = '70vw';
      menu.src = "./images/cross.svg"
    }
  })
}

function shadowSurLesRonds() {
  const lesCouleurs = document.querySelectorAll('.couleur');
  // Pour chaque couleur, ajoute un écouteur d'événement de type "click"
  lesCouleurs.forEach(couleur => {
    couleur.addEventListener('click', function () {
      // Pour chaque div de classe 'couleur', retire la classe 'actif'
      lesCouleurs.forEach(couleur => {
        couleur.classList.remove('actif');
        couleur.style.borderWidth = '1px';

      });
      // Ajoute la classe 'actif' à la div de classe 'couleur' qui a été cliquée
      couleur.classList.add('actif');
      couleur.style.borderWidth = '3px';
    });
  });
}

function ajouterClasseAuSurvolCarte(e) {
  const lesCartes = document.querySelectorAll('.carte');


  lesCartes.forEach((carte) => {
    carte.addEventListener('mouseover', function () {
      this.querySelector('.liens').classList.add('hover');
    });
    carte.addEventListener('mouseout', function () {
      this.querySelector('.liens').classList.remove('hover');
    });
  });


}

function enleverLesPopups(e) {
  const main = document.querySelector('main');
  main.addEventListener('click', () => {
    const menu_block = document.querySelector('.block');
    const menu = document.querySelector('.menu');
    const plus_cont = document.querySelector('.plus .container');
    const plus = document.querySelector('.plus');
    menu.classList.remove('active');
    setTimeout(() => {
      plus_cont.classList.add('display-none');
    }, 250);
    menu_block.style.width = '0';
    menu.src = "./images/menu.svg";
    plus.classList.remove('active');
    plus_cont.style.opacity = 0;
  });

}


function gestionCompetences() {
  const flecheGauche = document.querySelector('.arrow-left');
  const flecheDroite = document.querySelector('.arrow-right');
  const sousTitre = document.querySelector('.catLogi h3');
  const elements = [
    document.querySelectorAll('.imgTxt.front'),
    document.querySelectorAll('.imgTxt.back'),
    document.querySelectorAll('.imgTxt.autre')
  ];
  const paragraphe = document.querySelector('.tri p');



  let compteur = 0;

  function afficherElements() {
    elements.forEach((element, index) => {
      if (index === compteur) {
        element.forEach((el) => {
          el.style.display = 'flex';
        });
      } else {
        element.forEach((el) => {
          el.style.display = 'none';
        });
      }
    });
  }

  function changerText() {
    if (paragraphe.innerHTML === '1 / 3') {
      sousTitre.innerHTML = 'Frontend';
      sousTitre.style.color = '#ffdd00'
    }
    if (paragraphe.innerHTML === '2 / 3') {
      sousTitre.innerHTML = 'Backend'
      sousTitre.style.color = '#433B90'
    }
    if (paragraphe.innerHTML === '3 / 3') {
      sousTitre.innerHTML = 'Autre'
      sousTitre.style.color = '#ffa500'
    }
  }


  flecheGauche.addEventListener('click', () => {
    compteur -= 1;
    if (compteur <= 0) {
      flecheGauche.style.display = 'none';
    }
    if (compteur >= 0) {
      flecheDroite.style.display = 'block';
    }
    paragraphe.textContent = `${compteur + 1} / 3`;
    afficherElements();
    changerText();

  });

  flecheDroite.addEventListener('click', () => {
    compteur += 1;
    if (compteur >= 0) {
      flecheGauche.style.display = 'block';
    }
    if (compteur >= 2) {
      flecheDroite.style.display = 'none';
    }
    paragraphe.textContent = `${compteur + 1} / 3`;
    afficherElements();
    changerText();

  });

  afficherElements();
  changerText();



  // A FAIRE 

  const images = document.querySelectorAll('.imgTxt .image');
  const imgTxtPlus = document.querySelector('.imgTxtPlus p');
  const imgPlus = document.querySelector('.imgTxtPlus img');
  const imgTxtPlusImg = document.querySelector('.imgTxtPlus .image');
  

  images.forEach(image => {

    image.addEventListener('click', () => {
      const imgTxt = image.parentElement.querySelector('p');
      const img = image.parentElement.querySelector('img');

      imgTxtPlus.innerHTML = imgTxt.innerHTML
      imgPlus.src = img.src
      if (image.classList[1] === "front") {
        imgTxtPlusImg.style.backgroundColor = '#ffdd0026'
      }
      if (image.classList[1] === "back") {
        imgTxtPlusImg.style.backgroundColor = '#0000ff26'
      }
      if (image.classList[1] === "autre") {
        imgTxtPlusImg.style.backgroundColor = '#ffa50026'
      }
      const descriptionText = document.querySelector('.description p');
      const text = {
        "Javascript": "Le JavaScript est mon langage préféré. Depuis ma première utilisation en première année de MMI, j'ai acquis une solide expérience dans la création de sites web interactifs et dynamiques. J'ai eu l'occasion de l'utiliser à plusieurs reprises dans des projets personnels, universitaires ou encore lors de mon alternance chez MMA. Ce que j'apprécie particulièrement avec JavaScript, c'est son large écosystème avec React comme framework et Node.js pour son environnement côté serveur.",
        "HTML": "Avec une expérience de près de 5 ans, j'ai acquis une expertise avancée dans l'utilisation du langage HTML. Cela m'a notamment permis de développer une solide compréhension des concepts clé liés à l'accessibilité, la performance, le référencement, entre autres. En effet, je travaille quotidiennement avec ce langage, que ce soit pour des projets personnels, universitaires ou professionnels. Cet usage m'a permis de maîtriser de manière avancée le HTML5 et de créer des sites toujours plus riches, interactifs et accessibles.",
        "CSS": "Comme pour le HTML, j'utilise le CSS quotidiennement pour sublimer les sites web que je crée. Ma maîtrise s'étend également aux techniques avancées de mise en page, me permettant de répondre aux besoins de tout type de projet. Grâce à mes études, je possède une solide compréhension des principes fondamentaux de la conception responsive. Enfin, mes expériences en alternance, m'ont permis d'accentuer mes connaissances de l'accessibilité web.",
        "Tailwind": "Tailwind est un framework CSS que j'ai étudié et utilisé au cours de ma deuxième année de BUT MMI. Grâce à une compréhension approfondie de ses différents concepts et des avantages qu'il présente par rapport à Bootstrap, Tailwind est mon framework CSS préféré.",
        "UIKit": "Le framework frontend UIKit a été largement utilisé au cours de ma période d'alternance en MMA. En effet, ce framework est l'option idéale pour la création d'interfaces utilisateur modernes et interactives.",
        "React": "React est une bibliothèque JavaScript connue pour la création d'interfaces utilisateur dynamiques et performantes. Ayant commencé récemment à l'apprendre, je suscite un grand intérêt pour ce langage et je souhaite l'utiliser dans mes futurs projets personnels.",
        "Bootstrap": "Bootstrap, tout comme Tailwind, est un framework CSS qui a été étudié en profondeur lors de mes cours de développement.",
        "SASS": "Permettant de simplifier l'écriture des feuilles de style puis d'être compilé en CSS standard, cette technologie est utilisé au sein de l'équipe Documentation Réseaux chez MMA. Ainsi, pendant mon alternance, j'ai eu l'occasion d'utiliser le code SASS.",
        "D3.js": "D3.js est une bibliothèque Javascript permettant la création de visualisations de données de manière interactive. J'ai pu utiliser cette technologies lors de la réalisation d'un projet en 2e année d'étude.",
        "PHP": "Côté serveur, PHP est le langage que j'ai le plus fréquemment utilisé. En effet, lors de ma première année en MMI, j'ai conçu un forum de discussion sur la sobriété numérique à l'aide de ce langage. Tout au long de l'année, la réalisation de ce projet ainsi que tous les autres travaux réalisés m'ont permis d'acquérir une solide compréhension de nombreux concepts de développement côté serveur.",
        "Node.js": "Afin d'améliorer mes compétences en développement côté serveur, j'ai commencé l'apprentissage un nouveau langage à savoir Node.js. En plus de chercher à faire évoluer mes compétences, le côté moderne et innovant de cette technologie me permet également de me tenir à jour des évolutions actuelles. Dans le cadre, de mieux comprendre ce langage, j'ai réalisé quelques projets personnels.",
        "MySQL": "J'ai fréquemment utilisé la technologie MySql durant ma formation universitaire, que ce soit pour des projets ou des cours standards. En combinaison avec le langage côté serveur PHP, j'ai pu, a de nombreuses occasions l'utiliser.",
        "Symfony": "Cette année, dans le cadre de ma formation, j'ai commencé à étudier le framework Symfony. Je suis très content de pouvoir renforcer mes compétences dans ce langage qui offre des avantages significatifs par rapport au langage natif de PHP.",
        "Figma": "Parmi les nombreux logiciels de maquettage de sites web disponibles, Figma est de loin mon préféré. Non seulement, il est très complet, mais il est également adapté à toutes sortes d'utilisations. Wireframes, Flow Chart, mais surtout de nombreux maquettages, j'ai eu l'occasion d'utiliser Figma à l'université, pour mes projets personnels, ainsi qu'en alternance, et je m'en sers très fréquemment.",
        "Adobe XD": "De mon côté, j'ai personnellement testé le logiciel Adobe XD. Dans le but de développer mes compétences en matière de webdesign et de découvrir le fonctionnement d'un nouvel outil, je n'ai pas hésité à faire quelques maquettes dessus",
        "Penpot": "Utilisé comme alternative à Figma par l'université, ce logiciel m'a aidé à m'adapter à d'autres outils.",
        "PlayCanvas": "PlayCanvas est un logiciel permettant qui offre la possibilité de concevoir des jeux en 3D. J'ai pris en main cet outil pendant plusieurs heures dans le cadre d'un projet universitaire.",
        "Suite Adobe": "Au cours de ma période d'alternance au sein de l'entreprise MMA, j'ai eu l'opportunité de travailler fréquemment avec la suite Adobe pour la création d'illustrations variées.",
        "Suite Affinity": "Tout au long de ma formation, j'ai utilisé la suite Affinity en tant qu'alternative à la suite Adobe. Affinity offre une grande variété d'outils de qualité.",
        "MongoDB": "Lors de notre projet de fin d'études, l'utilisation de MongoDB nous a permis d'établir une base de données très adaptable, parfaitement alignée sur les besoins de notre projet.",
        "Express": "Pendant notre projet de fin d'études, l'utilisation d'Express.js nous a offert l'opportunité de développer un serveur web robuste et très performant. Avant tout, étant passionné par ce framework, j'ai eu l'occasion de l'explorer à travers de petits projets personnels.",
        "Docker": "Au cours de ma troisième année d'études, nous avons eu recours à Docker à travers des ressources pédagogiques, ainsi que lors de la réalisation de notre projet de fin d'études.",
        "Github/GitLab": "Au cours de ma deuxième et troisième année d'études, Git a été utilisé pour le versionnage dans le cadre de projets scolaires.",
      };
      const imgText = image.nextElementSibling.innerHTML;
      descriptionText.innerHTML = text[imgText];

    });
  });





}