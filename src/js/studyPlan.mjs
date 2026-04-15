export default class project {
  constructor(title,tasks=[]) {
    this.title = title;
    this.tasks = tasks || [] ;
    this.taskList = null; // ul element
     this.deleteTask = this.deleteTask.bind(this); //ensuring it will be always instance of project
  }
  
  initProjects(){
  const projectContainer = document.getElementById("projectContainer"); 
  if(!projectContainer) return; //validating html element
  projectContainer.innerHTML = '';
  const title = document.createElement("h2");
  title.textContent = this.title;
  title.className = `font-bold text-blue-600`;

  //creating Task List
  this.taskList = document.createElement("ul");
  this.taskList.className = `mb-2`;
  
  //adding existing tasks to the list with the renderTask method
  this.tasks.forEach(task=>{
     this.renderTask(task);
  });
  
  projectContainer.appendChild(title);
  projectContainer.appendChild(this.taskList);
  }
  
  //local Storage Methods
  saveDataToLocalStorage(){
  const currentProjects = JSON.parse(localStorage.getItem("projects")) || [];
   //look at the project per title, with findIndex built int js method
  const existingTitle = currentProjects.findIndex(element => element.title === this.title);
  
  const projectData = {
    title: this.title,
    tasks: this.tasks
  }
   //add info if not found on storage
   if (existingTitle !== -1) {
      currentProjects[existingTitle] = projectData;
    } else {
      currentProjects.push(projectData);
    }
    //saving Data to localStorage
    localStorage.setItem("projects", JSON.stringify(currentProjects));
  }
  
  loadSavedProjects(){
     const projectsData = JSON.parse(localStorage.getItem("projects")) || [];
    const projects = [];
    
    projectsData.forEach(data => {
      const project = new project(data.title, data.tasks);
      projects.push(project);
    });
    
    return projects;
  }

  deleteFromStorage(title){
  
    const currentProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const filteredProjects = currentProjects.filter(p => p.title !== title);
    localStorage.setItem("projects", JSON.stringify(filteredProjects));

  
  }
  //methot that will handle addint new tasks
  addNewTask(event){
  event.preventDefault();


  const {value} = event.target.elements["projectText"];
  if (!value) return;
 

  this.tasks.push(value);
  this.renderTask(value);
  this.saveDataToLocalStorage(); 
  event.target.reset(); 
  }

  renderTask(taskText){
    if(!this.taskList){
      this.initProjects();
    }
  
  const singleTask = document.createElement("li");
  singleTask.textContent = taskText;

  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = `text-orange-500`;
  deleteButton.addEventListener("click", ()=>{
    this.deleteTask(taskText,singleTask);
  });

  singleTask.appendChild(deleteButton);
  this.taskList.appendChild(singleTask);
  }
  deleteTask(taskText, taskElement){
   taskElement.remove(); //getting rid of element from the DOM
   this.tasks = this.tasks.filter(arrayElement => arrayElement !== taskText); //removing element from the array
   this.saveDataToLocalStorage(); //updating local storage
   
  }

}

export function createNewProject(title){
  //verifying if there already entries on storage
  const projectsData = JSON.parse(localStorage.getItem("projects")) || [];
  const existingEntries = projectsData.find(element => element.title === title);
  

   const myProject = new project(title, existingEntries ? existingEntries.tasks : []);
  myProject.initProjects();

  const myForm = document.getElementById("taskForm");
  if (myForm){
    const newForm = myForm.cloneNode(true); //clone form without event listeners
    myForm.parentNode.replaceChild(newForm, myForm); // replacing old form
    //add only 1 event listener to the new form 
    myForm.addEventListener("submit", (event)=>{
      myProject.addNewTask(event);
    });
  }
}

//function to render projects
export function renderAllProjects(){
  const projectsContainer = document.getElementById("savedProjectsList");
  if (!projectsContainer) return; 
   projectsContainer.innerHTML = ""; 
  
   const projectsData = JSON.parse(localStorage.getItem("projects")) || [];
  
  if (projectsData.length === 0) {
    projectsContainer.innerHTML = "<p>There are no current entries</p>";
    return;
  }

    projectsData.forEach(projectData => {
    const divContainer = document.createElement("div");
    divContainer.className = "border p-3 m-2 rounded"; //tailwind class
    
    const title = document.createElement("h2");
    title.textContent = projectData.title;
    title.className = "font-bold text-blue-600";
    
    const taskList = document.createElement("ul"); //creating list to render saved Elements
    taskList.className = "ml-4";
    projectData.tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task;
      taskList.appendChild(li);
    });
    //load project button
    const loadButton = document.createElement("button");
    loadButton.textContent = "Load Saved Tasks";
    loadButton.className = "bg-blue-500  font-bold text-white p-2 rounded mt-2";
    loadButton.onclick = () => {
      createNewProject(projectData.title);
      renderAllProjects() 
    };
    
    divContainer.appendChild(title);
    divContainer.appendChild(taskList);
    divContainer.appendChild(loadButton);
    projectsContainer.appendChild(divContainer);

});

}
/*
export function addNewProject (event){ 
event.preventDefault();
const projectContainer = document.getElementById("projectContainer");    

const {value} = event.target.elements["projectText"];
if (!value) return;
const project = document.createElement("p");
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

*/