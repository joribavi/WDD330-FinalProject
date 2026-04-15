import { loadHeaderFooter, getForumData, getMedia, getEvents, getResources } from "./utils.mjs";
import { searchInput } from "./search.mjs";
//import { addNewProject, loadSavedProjects } from "./studyPlan.mjs";
import {createNewProject, renderAllProjects} from "./studyPlan.mjs";


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
/*
const studyPlanForm = document.getElementById("studyForm");
studyPlanForm.addEventListener("submit", addNewProject);
*/
if(currentPage.includes("study-plan")){
  createNewProject("Study Plan");
  renderAllProjects();
  
}


if(currentPage.includes("events")){
await getEvents();  
}

if(currentPage.includes("others")){
 await getResources(); 
}
/*
if(currentPage.includes("study-plan")){
loadSavedProjects();
}
*/
