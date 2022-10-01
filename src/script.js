const initialiser = document.querySelectorAll("input");
const indexList = document.querySelectorAll(".notes");
const finalList = document.querySelectorAll(".final");
var premiereList = document.querySelectorAll(".premiereNote");
var deuxiemeList = document.querySelectorAll(".deuxiemeNote");
var premiereCoef = document.querySelectorAll(".premiereCoef");
var deuxiemeCoef = document.querySelectorAll(".deuxiemeCoef");
const buttonAdd = document.querySelector("#add-module");
const buttonAdd2 = document.querySelector("#add-module2");
const minimalList = document.querySelectorAll(".minimals");
const desirerList = document.querySelectorAll(".desires");
const result = document.querySelectorAll(".result");
const result2 = document.querySelectorAll(".result2");
const decision = document.querySelector(".decision");
const advancedNotes = document.querySelectorAll(".premiereNote");
const body2 = document.querySelector(".tbody2");
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
          stringToCheck.classList.remove("filled");
     } else if (stringToCheck.value > 0) {
          stringToCheck.classList.add("filled");
     }
};
const PreventCoef = (stringToCheck) => {
     if (!parseInt(stringToCheck.value) || stringToCheck.value > 9) {
          stringToCheck.value = 0;
          stringToCheck.classList.remove("filled");
     } else if (stringToCheck.value > 0) {
          stringToCheck.classList.add("filled");
     }
};
// index.html-------------------------------------------------------------------------------------
if (indexList != null || indexList != undefined) {
     indexList.forEach((item) => {
          item.addEventListener("input", () => {
               const FilledInputs = document.querySelectorAll(".filled");
               if (FilledInputs.length === 4) {
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
                    if (moyenne < 10) {
                         decision.innerHTML = "Doublon";
                    } else if (moyenne < 12) {
                         decision.innerHTML = "Passable";
                    } else if (moyenne < 13) {
                         decision.innerHTML = "Assez bien";
                    } else if (moyenne < 16) {
                         decision.innerHTML = "bien";
                    }
               } else {
                    decision.innerHTML = "Doublon";
                    result[0].innerHTML = "00 / 20";
               }
          });
     });
}

// minimal.html-------------------------------------------------------------------------------------
if (minimalList != null || minimalList != undefined) {
     minimalList.forEach((element) => {
          element.addEventListener("input", () => {
               const FilledInputs = document.querySelectorAll(".filled");

               if (FilledInputs.length === 3) {
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
                    result[0].innerHTML = moyenne + " /20";
               } else result[0].innerHTML = "";
          });
     });
}

// desirer.html-------------------------------------------------------------------------------------
if (desirerList != null || desirerList != undefined) {
     desirerList.forEach((element) => {
          element.addEventListener("input", () => {
               const FilledInputs = document.querySelectorAll(".filled");

               if (FilledInputs.length === 4) {
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
               } else result[0].innerHTML = "";
          });
     });
}

// advanced.html-------------------------------------------------------------------------------------

const appendChildrenFunction = (tableRow, td1, td2, td3, input1, input2) => {
     const tbody = document.querySelector(".tbody");
     tbody.appendChild(tableRow);
     tableRow.appendChild(td1);
     tableRow.appendChild(td2);
     tableRow.appendChild(td3);
     td2.appendChild(input1);
     td3.appendChild(input2);
     premiereList = document.querySelectorAll(".premiereNote");

     premiereList.forEach((element) => {
          if (!element.classList.contains("active")) {
               element.classList.add("active");
               element.addEventListener("change", calculateNote);
          }
     });

     premiereCoef.forEach((element) => {
          if (!element.classList.contains("active")) {
               element.classList.add("active");
               element.addEventListener("change", calculateNote);
          }
     });
};

const appendChildrenFunction2 = (
     tableRow2,
     td12,
     td22,
     td32,
     input12,
     input22
) => {
     const tbody2 = document.querySelector(".tbody2");
     tbody2.appendChild(tableRow2);
     tableRow2.appendChild(td12);
     tableRow2.appendChild(td22);
     tableRow2.appendChild(td32);
     td22.appendChild(input12);
     td32.appendChild(input22);
     deuxiemeList = document.querySelectorAll(".deuxiemeNote");

     deuxiemeList.forEach((element) => {
          if (!element.classList.contains("active")) {
               element.classList.add("active");
               element.addEventListener("change", calculateNote2);
          }
     });

     deuxiemeCoef.forEach((element) => {
          if (!element.classList.contains("active")) {
               element.classList.add("active");
               element.addEventListener("change", calculateNote2);
          }
     });
};

// add classes to all elements
const addClassesFunction = (tableRow, td1, td2, td3, input1, input2) => {
     // declaring all classes
     const classes = [
          "pl-3 border-l-0 border-r-0 py-4 text-sm font-semibold",
          "border-l-0 border-r-0",
          "pl-3 border-l-0 border-r-0 py-4 text-sm font-semibold",
          "premiereNote w-full border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0",
          "premiereCoef !w-16 border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0",
     ];

     // add classes
     td1.className = classes[0];
     td2.className = classes[1];
     td3.className = classes[2];
     input1.className = classes[3];
     input2.className = classes[4];

     // call to show elements function
     appendChildrenFunction(tableRow, td1, td2, td3, input1, input2);
};
// add classes to all elements
const addClassesFunction2 = (tableRow2, td12, td22, td32, input12, input22) => {
     // declaring all classes
     const classes2 = [
          "pl-3 border-l-0 border-r-0 py-4 text-sm font-semibold",
          "border-l-0 border-r-0",
          "pl-3 border-l-0 border-r-0 py-4 text-sm font-semibold",
          "deuxiemeNote w-full border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0",
          "deuxiemeCoef !w-16 border border-solid border-gray-600 text-lg font-bold text-gray-600 p-0",
     ];

     // add classes
     td12.className = classes2[0];
     td22.className = classes2[1];
     td32.className = classes2[2];
     input12.className = classes2[3];
     input22.className = classes2[4];

     // call to show elements function
     appendChildrenFunction2(tableRow2, td12, td22, td32, input12, input22);
};

// create Module items function
const CreateNewModule = () => {
     // creating elements :
     // the table row
     const tableRow = document.createElement("tr");
     // first td with children
     const modulename = document.createElement("td");
     modulename.innerHTML = "Note Module " + ids;

     // second td with children
     const note = document.createElement("td");
     const input = document.createElement("input");
     input.setAttribute("type", "number");
     input.setAttribute("id", ids);
     input.setAttribute("min", 0);
     input.setAttribute("max", 20);
     input.setAttribute("value", 0);

     // third td with children
     const coefficient = document.createElement("td");
     const secondInput = document.createElement("input");
     secondInput.setAttribute("type", "number");
     secondInput.setAttribute("id", ids);
     secondInput.setAttribute("min", 0);
     secondInput.setAttribute("max", 10);
     secondInput.setAttribute("value", 0);

     ids++;
     addClassesFunction(
          tableRow,
          modulename,
          note,
          coefficient,
          input,
          secondInput
     );
};

// create Module2 items function
const CreateNewModule2 = () => {
     // the table row
     const tableRow2 = document.createElement("tr");
     // first td with children
     const modulename2 = document.createElement("td");
     modulename2.innerHTML = "Note Module " + ids2;

     // second td with children
     const note2 = document.createElement("td");
     const input2 = document.createElement("input");
     input2.setAttribute("type", "number");
     input2.setAttribute("id", ids2);
     input2.setAttribute("min", 0);
     input2.setAttribute("max", 20);
     input2.setAttribute("value", 0);

     // third td with children
     const coefficient2 = document.createElement("td");
     const secondInput2 = document.createElement("input");
     secondInput2.setAttribute("type", "number");
     secondInput2.setAttribute("id", ids2);
     secondInput2.setAttribute("min", 0);
     secondInput2.setAttribute("max", 10);
     secondInput2.setAttribute("value", 0);

     ids2++;
     addClassesFunction2(
          tableRow2,
          modulename2,
          note2,
          coefficient2,
          input2,
          secondInput2
     );
};

// main function to calculate note in advanced.html==========================================================================================

const calculateNote = function name() {
     // declaring vars
     const firstListNote = document.querySelectorAll(".premiereNote");
     const firstListCoef = document.querySelectorAll(".premiereCoef");
     let totalCoef = 1;
     let totalNotes = 0;

     // calculating coefficient total by parcing every element
     firstListCoef.forEach((element) => {
          totalCoef += parseInt(element.value);
     });

     // calculating notes
     firstListNote.forEach((element) => {
          // if the coef input is the same as note input we do math
          let currentTotal = 0;
          firstListCoef.forEach((current) => {
               if (current.id == element.id) {
                    currentTotal =
                         parseFloat(current.value) * parseFloat(element.value);
               }
          });
          totalNotes += currentTotal;

          // showing the final note
          let finalNote = parseFloat(totalNotes) / parseFloat(totalCoef);
          result[0].innerHTML = finalNote;
          result[1].innerHTML = finalNote;
     });
};

const calculateNote2 = () => {
     // declaring vars
     const secondListNote = document.querySelectorAll(".deuxiemeNote");
     const secondListCoef = document.querySelectorAll(".deuxiemeCoef");
     let totalCoef2 = 1;
     let totalNotes2 = 0;

     // calculating coefficient total by parcing every element
     secondListCoef.forEach((element) => {
          totalCoef2 += parseInt(element.value);
     });

     // calculating notes
     secondListNote.forEach((element) => {
          // if the coef input is the same as note input we do math
          let currentTotal2 = 0;
          secondListCoef.forEach((current) => {
               if (current.id == element.id) {
                    currentTotal2 =
                         parseFloat(current.value) * parseFloat(element.value);
               }
          });
          totalNotes2 += currentTotal2;

          // showing the final note
          let finalNote2 = parseFloat(totalNotes2) / parseFloat(totalCoef2);
          result2[0].innerHTML = finalNote2;
          result2[1].innerHTML = finalNote2;
     });
};

// total note / advanced.html
if (finalList != null || finalList != undefined) {
     finalList.forEach((item) => {
          item.addEventListener("change", () => {
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
               result2[2].innerHTML = moyenne + " /20";
               // affichage decision (pas obligatoire)
               if (moyenne < 10) {
                    decision.innerHTML = "Doublon";
               } else if (moyenne < 12) {
                    decision.innerHTML = "Passable";
               } else if (moyenne < 13) {
                    decision.innerHTML = "Assez bien";
               } else if (moyenne < 16) {
                    decision.innerHTML = "bien";
               }
          });
     });
}

// button add click
if (buttonAdd != null || buttonAdd2 != null) {
     buttonAdd.addEventListener("click", CreateNewModule);
     buttonAdd2.addEventListener("click", CreateNewModule2);
}
