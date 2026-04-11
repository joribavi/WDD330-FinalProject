import { loadHeaderFooter, getForumData, getMedia } from "./utils.mjs";
import { searchInput } from "./search.mjs";
import { addNewProject } from "./studyPlan.mjs";




await loadHeaderFooter();

const currentPage = window.location.pathname; //locating current page to excecute functions according to page rendered

if (currentPage.includes("index")) {  

  await searchInput();

}

if (currentPage.includes("forum")) {
await getForumData();

}

if(currentPage.includes("media")){
  await getMedia();
}
const studyPlanForm = document.getElementById("studyForm");
studyPlanForm.addEventListener("submit", addNewProject);


/*
document.addEventListener("DOMContentLoaded", ()=>{
const studyPlanForm = document.querySelector("form");
const projectContainer = document.getElementById("projectContainer"); 
if (studyPlanForm && projectContainer) {
studyPlanForm.addEventListener("submit", addNewProject)
  

  /*
  const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  console.log("localStorage Content:", savedProjects);
  
  savedProjects.forEach(text => {
    const project = document.createElement("div");
    project.textContent = text;
    projectContainer.appendChild(project);
  });


};   

});

/*
 
document.addEventListener("DOMContentLoaded", ()=>{
const studyPlanForm = document.querySelector("form");
const projectContainer = document.getElementById("projectContainer"); 
if (studyPlanForm) {
studyPlanForm.addEventListener("submit", addNewProject)
}  

if (projectContainer) {
  
  const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  console.log("localStorage Content:", savedProjects);
  
  savedProjects.forEach(text => {
    const project = document.createElement("div");
    project.textContent = text;
    projectContainer.appendChild(project);
  });
}

}) ;   

*/
