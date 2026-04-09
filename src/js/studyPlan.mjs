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




};

 
