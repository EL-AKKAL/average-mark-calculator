/*
Notes to remember :
     firstOrLast => it's a variable to check if we are currently working on the first semestre table or the second
     fisrtOrLast is only needed in the advanced.html

     initialiser :
     after every load we initialise all the inputs of type text to "" and inputs of type number to 0

     PreventStringValue :
     this function works only on the marks inputs to prevent getting string or negative integers

     PreventCoefValue :
     this function works only on the coefficient inputs to prevent getting string or negative integers

     decisionQuote : 
     this function tells the user if he failed or passed

     forceFailure :
     this function automatically fail if any of the passed array elements has the value 0 =>
     0 on one module means failure

     DeleteModule :
     this function is only for advanced.html
     this function depends on the passed parameter which is a button , each button in the first table 
     has the first-table class , so the function check if this class exists to target the wanted table, then
     the function deletes the row that have the same id as the passed button parameter

     CreateModuleConstant :
     this function is only for advanced.html
     this function create an entire row with its elements then call a methode to fill each element with its 
     specific classes
     the parameter is just an integeer which will be replaced by the current id depends on which table

     appendChildrenFunction
     this function is only for advanced.html
     this function construct and nest the created elements to make a full new row ready to be used and shown

     addClassesFunction
     this function is only for advanced.html
     this function only for adding classes to each element of the created row then 
     it calls the appendChildrenFunction to finish the job

     CreateNewModule
     this function is only for advanced.html
     this function checks which table we are working on ,then
     it calls the CreateModuleConstant to create new list of elements then calls  addClassesFunction to add classes on
     every element

     calculateNote
     this function is only for advanced.html
     this function only calculate the final note of first 2 tables


     last table calculations is directly made on the input event listener

*/

const initialiser = document.querySelectorAll("input");
const indexList = document.querySelectorAll(".notes");
const finalList = document.querySelectorAll(".final");
const minimalList = document.querySelectorAll(".minimals");
const desirerList = document.querySelectorAll(".desires");
const result = document.querySelectorAll(".result");
const result2 = document.querySelectorAll(".result2");
const decision = document.querySelector(".decision");
let controles = 0;
let moyenne = 0;
let ids = 2;
let ids2 = 2;
// initialiser les valeurs a 0-------------------------------------------------------------------------------------
initialiser.forEach((element) => {
     element.type == "text" ? (element.value = "") : (element.value = "0");
});

const PreventStringValue = (stringToCheck) => {
     if (!parseInt(stringToCheck.value) || stringToCheck.value > 20) {
          stringToCheck.value = 0;
     }
};
const PreventCoef = (stringToCheck) => {
     if (!parseInt(stringToCheck.value) || stringToCheck.value > 9) {
          stringToCheck.value = 0;
     }
};
const decisionQuote = (noteToCheck) => {
     let textToShow = "";
     if (noteToCheck < 10 || isNaN(noteToCheck)) {
          textToShow = "Doublon";
     } else if (noteToCheck < 12) {
          textToShow = "Passable";
     } else if (noteToCheck < 13) {
          textToShow = "Assez bien";
     } else if (noteToCheck < 16) {
          textToShow = "bien";
     }
     return textToShow;
};
const forceFailure = (arrayToCheck) => {
     for (let i = 0; i < arrayToCheck.length; i++) {
          if (arrayToCheck[i].value == 0 || isNaN(arrayToCheck[i].value)) {
               return "failed";
          }
     }
     return "succeed";
};
// index.html-------------------------------------------------------------------------------------
if (indexList != null || indexList != undefined) {
     indexList.forEach((item) => {
          item.addEventListener("input", () => {
               if (forceFailure(indexList) == "failed") {
                    decision.innerHTML = "Doublon";
                    result[0].innerHTML = "Vous Avez 0 sur un module";
               } else {
                    // premiere semestre + deuxieme semestre
                    controles =
                         (parseFloat(indexList[0].value) +
                              parseFloat(indexList[1].value)) /
                         2;
                    // moyenne generale
                    moyenne =
                         parseFloat(indexList[3].value) * 0.5 +
                         parseFloat(indexList[2].value) * 0.25 +
                         controles * 0.25;
                    // affichage resultat
                    result[0].innerHTML = moyenne + " /20";
                    // affichage decision (pas obligatoire)
                    decision.innerHTML = decisionQuote(moyenne);
               }
          });
     });
}

// minimal.html-------------------------------------------------------------------------------------
if (minimalList != null || minimalList != undefined) {
     minimalList.forEach((element) => {
          element.addEventListener("input", () => {
               if (forceFailure(minimalList) == "failed") {
                    result[0].innerHTML = "Vous Avez 0 sur un Module";
               } else {
                    // premiere semestre + deuxieme semestre
                    controles =
                         (parseFloat(minimalList[0].value) +
                              parseFloat(minimalList[1].value)) /
                         2;
                    // moyenne generale
                    moyenne =
                         (10 -
                              0.25 *
                                   (controles +
                                        parseFloat(minimalList[2].value))) /
                         0.5;
                    if (moyenne < 20) {
                         // affichage resultat
                         result[0].innerHTML = moyenne + " /20";
                    } else {
                         result[0].innerHTML = "Pas Suffisant";
                    }
               }
          });
     });
}

// desirer.html-------------------------------------------------------------------------------------
if (desirerList != null || desirerList != undefined) {
     desirerList.forEach((element) => {
          element.addEventListener("input", () => {
               if (forceFailure(desirerList) == "failed") {
                    result[0].innerHTML = "Vous Avez 0 sur un module";
               } else {
                    // premiere semestre + deuxieme semestre
                    controles =
                         (parseFloat(desirerList[0].value) +
                              parseFloat(desirerList[1].value)) /
                         2;
                    // moyenne generale
                    moyenne =
                         (parseFloat(desirerList[3].value) -
                              0.25 *
                                   (controles +
                                        parseFloat(desirerList[2].value))) /
                         0.5;
                    if (moyenne > 19)
                         result[0].innerHTML = "Impossible d'avoir cette Note";
                    else result[0].innerHTML = moyenne + " /20";
               }
          });
     });
}

// advanced.html-------------------------------------------------------------------------------------
const DeleteModule = (e) => {
     let targetRow = "";
     e.target.classList.contains("first-table")
          ? (targetRow = ".tbody tr")
          : (targetRow = ".tbody2 tr");
     const RowsCount = document.querySelectorAll(targetRow);

     RowsCount.forEach((row) => {
          if (row.id == e.target.id) {
               row.remove();
          }
     });
};

const CreateModuleConstant = (CurrentId) => {
     // the table row
     const tableRow = document.createElement("tr");
     tableRow.setAttribute("id", CurrentId);
     // -------------------------------------------------------
     // first td with children
     const moduleNameTd = document.createElement("td");
     const moduleNameInput = document.createElement("input");
     moduleNameInput.setAttribute("type", "text");
     moduleNameInput.setAttribute("placeHolder", "Module name");
     // -------------------------------------------------------
     // second td with children
     const noteTd = document.createElement("td");
     const noteInput = document.createElement("input");
     noteInput.setAttribute("type", "number");
     noteInput.setAttribute("id", CurrentId);
     noteInput.setAttribute("min", 0);
     noteInput.setAttribute("max", 20);
     noteInput.setAttribute("value", 0);
     noteInput.setAttribute("oninput", "PreventStringValue(this)");
     // ---------------------------------------------------------
     // third td with children
     const coefficientTd = document.createElement("td");
     // -------------input
     const coefficientInput = document.createElement("input");
     coefficientInput.setAttribute("type", "number");
     coefficientInput.setAttribute("id", CurrentId);
     coefficientInput.setAttribute("min", 0);
     coefficientInput.setAttribute("max", 9);
     coefficientInput.setAttribute("value", 0);
     coefficientInput.setAttribute("oninput", "PreventCoef(this)");
     // ------------button
     const buttonDelete = document.createElement("button");
     buttonDelete.setAttribute("id", CurrentId);
     buttonDelete.innerHTML = "-";
     buttonDelete.addEventListener("click", DeleteModule);
     // ------------
     return [
          tableRow,
          moduleNameTd,
          moduleNameInput,
          noteTd,
          noteInput,
          coefficientTd,
          coefficientInput,
          buttonDelete,
     ];
};
const appendChildrenFunction = (elements, firstOrLast) => {
     let targetTable = "";
     firstOrLast == "first"
          ? (targetTable = ".tbody")
          : (targetTable = ".tbody2");
     const tbody = document.querySelector(targetTable);
     tbody.appendChild(elements[0]);
     elements[0].appendChild(elements[1]);
     elements[1].appendChild(elements[2]);
     elements[0].appendChild(elements[3]);
     elements[3].appendChild(elements[4]);
     elements[0].appendChild(elements[5]);
     elements[5].appendChild(elements[6]);
     elements[5].appendChild(elements[7]);
};
// add classes to all elements
const addClassesFunction = (elements, firstOrLast) => {
     let notesInputClasses = "";
     let coefInputClasses = "";
     let deleteButtonMayBeInFirstTable = "";
     if (firstOrLast == "first") {
          notesInputClasses =
               "premiereNote w-full border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0";
          coefInputClasses =
               "premiereCoef !w-16 border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0";
          deleteButtonMayBeInFirstTable =
               "first-table bg-white border-2 border-solid border-purple-500 text-purple-500 p-1 px-2 ml-5 rounded-full !font-bold transition ease-in duration-75 hover:bg-purple-500 hover:text-white text-lg leading-4";
     } else {
          notesInputClasses =
               "deuxiemeNote w-full border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0";
          coefInputClasses =
               "deuxiemeCoef !w-16 border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0";
          deleteButtonMayBeInFirstTable =
               "bg-white border-2 border-solid border-purple-500 text-purple-500 p-1 px-2 ml-5 rounded-full !font-bold transition ease-in duration-75 hover:bg-purple-500 hover:text-white text-lg leading-4";
     }
     const classes = [
          "",
          "pl-3 border-l-0 border-r-0 py-4 text-sm font-semibold",
          "module w-5/6 border border-solid border-gray-600 text-lg font-bold text-gray-600 px-2 py-0",
          "border-l-0 border-r-0",
          notesInputClasses,
          "pl-3 border-l-0 border-r-0 py-4 text-sm font-semibold",
          coefInputClasses,
          deleteButtonMayBeInFirstTable,
     ];
     // add classes
     for (let index = 0; index < elements.length; index++) {
          elements[index].className = classes[index];
     }
     // call to show elements function
     appendChildrenFunction(elements, firstOrLast);
};

// create Module items function
const CreateNewModule = (currentButton) => {
     let currentId = null;
     if (currentButton == "first") {
          currentId = ids;
          ids++;
     } else {
          currentId = ids2;
          ids2++;
     }
     const elements = CreateModuleConstant(currentId);
     addClassesFunction(elements, currentButton);
};

// main function to calculate note in advanced.html==========================================================================================

const calculateNote = (firstOrLast) => {
     // declaring vars
     let currentNotesText = "";
     let currentCoefText = "";
     let totalCoef = 0;
     let totalNotes = 0;
     if (firstOrLast == "first") {
          currentNotesText = ".premiereNote";
          currentCoefText = ".premiereCoef";
     } else {
          currentNotesText = ".deuxiemeNote";
          currentCoefText = ".deuxiemeCoef";
     }

     let currentNotes = document.querySelectorAll(currentNotesText);
     let currentCoef = document.querySelectorAll(currentCoefText);

     // calculating coefficient total by parcing every element
     currentCoef.forEach((element) => {
          totalCoef += parseInt(element.value);
     });

     // calculating notes
     currentNotes.forEach((note) => {
          // if the coef input is the same as note input we do math
          let currentTotal = 0;
          currentCoef.forEach((coef) => {
               if (coef.id == note.id) {
                    currentTotal =
                         parseFloat(coef.value) * parseFloat(note.value);
               }
          });
          totalNotes += currentTotal;

          // showing the final note
          let finalNote = parseFloat(totalNotes) / parseFloat(totalCoef);
          let finalNoteAfterCheck = "";
          if (forceFailure(currentNotes) == "failed") {
               finalNoteAfterCheck = "Vous avec 0 sur un Module";
          } else if (isNaN(finalNote)) {
               finalNoteAfterCheck = "";
          } else {
               finalNoteAfterCheck = finalNote;
          }
          if (firstOrLast == "first") {
               result[0].innerHTML = finalNoteAfterCheck;
               result[1].innerHTML = finalNoteAfterCheck;
          } else {
               result2[0].innerHTML = finalNoteAfterCheck;
               result2[1].innerHTML = finalNoteAfterCheck;
          }
     });
};

// total note / advanced.html
if (finalList != null || finalList != undefined) {
     finalList.forEach((item) => {
          item.addEventListener("input", () => {
               // premiere semestre + deuxieme semestre
               controles =
                    (parseFloat(result[1].innerHTML) +
                         parseFloat(result2[1].innerHTML)) /
                    2;
               // moyenne generale
               moyenne =
                    parseFloat(finalList[1].value) * 0.5 +
                    parseFloat(finalList[0].value) * 0.25 +
                    controles * 0.25;
               // affichage resultat

               if (forceFailure(finalList) == "failed") {
                    result2[2].innerHTML = "";
               } else {
                    result2[2].innerHTML = moyenne + " /20";
               }
               decision.innerHTML = decisionQuote(moyenne);
               // affichage decision (pas obligatoire)
          });
     });
}
