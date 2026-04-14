export function addNewProject (event){ 
event.preventDefault();
const projectContainer = document.getElementById("projectContainer");    

const {value} = event.target.elements["projectText"];
if (!value) return;
const project = document.createElement("div");
project.textContent = value;
projectContainer.appendChild(project);

const projects = JSON.parse(localStorage.getItem("projects")) || [];
projects.push(value);
localStorage.setItem("projects", JSON.stringify(projects));

event.target.reset();


//styling

 project.className = `text-indigo-700 font-bold m-2`;

};

 
export function loadSavedProjects(){

const projects = JSON.parse(localStorage.getItem("projects")) || [];    
const projectContainer = document.getElementById("projectContainer"); 
projectContainer.innerHTML = "";
    function renderProjects(projects){
        projects.forEach(project => {
        const singleProject = document.createElement("p")
        singleProject.innerHTML = project;
        singleProject.className = `text-indigo-700 font-bold m-2`;
        projectContainer.appendChild(singleProject) ;
        });
     
} renderProjects(projects);

}