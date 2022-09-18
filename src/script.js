
const initialiser = document.querySelectorAll('input');
const indexList = document.querySelectorAll('.notes');
const minimalList = document.querySelectorAll('.minimals');
const desirerList = document.querySelectorAll('.desires');
const result = document.querySelector('.result');
const decision = document.querySelector('.decision');
let controles = 0;
let moyenne = 0;


// initialiser les valeurs a 0-------------------------------------------------------------------------------------
initialiser.forEach(element => {
    element.value=0;
});

// index.html-------------------------------------------------------------------------------------
if (indexList != null || indexList !=undefined) {

    indexList.forEach(item => {

        item.addEventListener('change',()=>{

            // premiere semestre + deuxieme semestre
            controles = ( parseFloat(indexList[0].value) + parseFloat(indexList[1].value) )/2;
            // moyenne generale
            moyenne = ( parseFloat(indexList[3].value)*0.50 ) + ( parseFloat(indexList[2].value)*0.25 ) + (controles * 0.25);
            // affichage resultat
            result.innerHTML= moyenne + " /20";
            // affichage decision (pas obligatoire)
            if (moyenne < 10) {
                decision.innerHTML="Doublon";
            } else if(moyenne < 12) {
                decision.innerHTML="Passable";
            } else if(moyenne < 13) {
                decision.innerHTML="Assez bien";
            } else if(moyenne < 16) {
                decision.innerHTML="bien";
            }

        });
    });
}


// minimal.html-------------------------------------------------------------------------------------
if (minimalList != null || minimalList != undefined) {
    
    minimalList.forEach(element=>{

        element.addEventListener('change',()=>{

            // premiere semestre + deuxieme semestre
            controles = ( parseFloat(minimalList[0].value) + parseFloat(minimalList[1].value) )/2;
            // moyenne generale
            moyenne = (10 - (0.25 * (controles + parseFloat(minimalList[2].value)))) / 0.5;
            result.innerHTML = moyenne + " /20";

        });
    });
}

// desirer.html-------------------------------------------------------------------------------------
if (desirerList != null || desirerList != undefined) {

    desirerList.forEach(element=>{

        element.addEventListener('change',()=>{

            // premiere semestre + deuxieme semestre
            controles = ( parseFloat(desirerList[0].value) + parseFloat(desirerList[1].value) )/2;
            // moyenne generale
            moyenne = (parseFloat(desirerList[3].value) - (0.25 * (controles + parseFloat(desirerList[2].value)))) / 0.5;
            result.innerHTML = moyenne + " /20";
            
        });
    });
}