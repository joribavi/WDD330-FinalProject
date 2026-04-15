
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if(callback) callback(data);
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    return await res.text();
}

export async function loadHeaderFooter(callback){
    //import.meta.env.BASE_URL solves problem with subpages paths
    const base = `${import.meta.env.BASE_URL}`
    const headerTemplate = await loadTemplate(`${base}partials/header.html`); 
    const footerTemplate = await loadTemplate(`${base}partials/footer.html`);

    const headerElement = document.querySelector(".my-Header");
    const footerElement = document.querySelector(".my-Footer");

   
    if(headerElement) {
        renderWithTemplate(headerTemplate, headerElement, null, callback);
       }
     if(footerElement) {
        renderWithTemplate(footerTemplate, footerElement, null, callback);
       }
   //using same "base" variable to create the path for the logo after the header is inserted to the DOM
    const logo = document.getElementById("logo"); 
    if (logo) logo.src = `${base}images/logo.png`;

    //same principle for index page link at the header
    const indexPage = document.getElementById("index");
    if (indexPage) indexPage.href = `${base}index.html`;

    //using base to link the footer links and adapt to the page from where it is called

    const studyPath = document.getElementById("studyPlanPath");
    if (studyPath) studyPath.href = `${base}sub-pages/study-plan.html`

    const eventsPath = document.getElementById("eventsPath");
    if (eventsPath) eventsPath.href =  `${base}sub-pages/events.html`

    const othersPath = document.getElementById("othersPath");
    if (othersPath) othersPath.href =  `${base}sub-pages/others.html`


    const mediaPath = document.getElementById("mediaPath");
    if (mediaPath) mediaPath.href =  `${base}sub-pages/media.html`

}

export async function getForumData(){
    
    const base = `${import.meta.env.BASE_URL}`
    const response = await fetch(`${base}json/forum.json`);
    console.log(response) //debug
    const data = await response.json();
    console.log(data); //for testing purposes 
   
   

    
    const jsonDataContainer = document.querySelector(".loadedData")
    if (jsonDataContainer) {
          function renderForumData (comments)  {
          comments.forEach(comment =>
         {
          const forumCard = document.createElement("div");
          const cardTitle = document.createElement("h2");
          const cardDate = document.createElement("p");
          const cardDescription = document.createElement("p");
          const cardAnswers = document.createElement("ul");

          cardTitle.textContent = `${comment.topic}`;
          cardDate.textContent = `${comment.date}`;
          cardDescription.textContent = `${comment.description}`;

          comment.answers.forEach(answer=> {
            const liElement = document.createElement("li");
            liElement.textContent = answer;
            cardAnswers.appendChild(liElement);
          });

         
          forumCard.appendChild(cardTitle);
          forumCard.appendChild(cardDate);
          forumCard.appendChild(cardDescription);
          forumCard.appendChild(cardAnswers);

          jsonDataContainer.appendChild(forumCard);

          //styles for created elements
          forumCard.className = `mt-5 mb-5`;
          cardTitle.className = `text-indigo-700 font-bold`;
          cardAnswers.className = `bg-slate-300 mt-2`;
          
          

         });   
     } renderForumData(data.comments);
    }


    }
  
export async function getMedia() {
    const base = `${import.meta.env.BASE_URL}`
    const response = await fetch(`${base}json/media.json`);
    console.log(response) //debug
    const data = await response.json();
    console.log(data); //for testing purposes 

    const jsonDataContainer = document.querySelector(".loadedMedia")

    if(jsonDataContainer) {
           function renderMedia(channels)  {
          channels.forEach(channel =>
         {
          const mediaCard = document.createElement("div");
          const cardTitle = document.createElement("h2");
          const cardUrl = document.createElement("p");
          const cardImage = document.createElement("img");
      

          cardTitle.textContent = `${channel.name}`;
          cardUrl.textContent = `${channel.url}`;
          cardImage.src = `${channel.image}`;

        
        

         
          mediaCard.appendChild(cardTitle);
          mediaCard.appendChild(cardUrl);
          mediaCard.appendChild(cardImage);


         

          jsonDataContainer.appendChild(mediaCard);

          //styles for created elements
          jsonDataContainer.className = `flex flex-wrap gap-4 justify-center`;
          mediaCard.className = `mt-5 mb-5 max-w-sm`;
          cardTitle.className = `text-indigo-700 font-bold`;
          cardUrl.className = `mb-2`;
          

          
          

        });
     } renderMedia(data.channels);
    

    }

}

export async function getEvents(){
  const base = `${import.meta.env.BASE_URL}`
  const response = await fetch(`${base}json/events.json`);
  const data = await response.json();
  const jsonDataContainer = document.querySelector(".loadedEvents")
   //styles for created elements
   jsonDataContainer.className = `flex flex-wrap gap-4 justify-center m-5`;

   if(jsonDataContainer) {
           function renderEvents(events)  {
          events.forEach(event =>
         {
          const eventCard = document.createElement("div");
          const eventTitle = document.createElement("h2");
          const eventDescription = document.createElement("p");
          const eventDate = document.createElement("p");
          const eventPlace = document.createElement("p");
          const eventPrice = document.createElement("p");
      

          eventTitle.textContent = `${event.title}`;
          eventDescription.textContent = `${event.description}`;
          eventDate.textContent = `${event.date}`;
          eventPlace.textContent = `${event.place}`;
          eventPrice.textContent = `${event.price}`

             

         
          eventCard.appendChild(eventTitle);
          eventCard.appendChild(eventDescription);
          eventCard.appendChild(eventDate);
          eventCard.appendChild(eventPlace);
          eventCard.appendChild(eventPrice);
          
          //styles
          eventCard.className = `bg-cyan-600 mt-5 mb-5 max-w-sm border border-indigo-600 p-5 rounded-sm hover:bg-sky-700`;
          eventTitle.className = `text-gray-300 font-bold`;
          eventDescription.className = `mb-2`;
          eventPlace.className = `mb-2`;
          eventPrice.className = `mb-2`;
          

         

          jsonDataContainer.appendChild(eventCard);
           });
         
   

         

          
          

       
     } renderEvents(data.events);
    
    }

}


  export async function getResources(){
     const base = `${import.meta.env.BASE_URL}`
  const response = await fetch(`${base}json/resources.json`);
  const data = await response.json();
  const jsonDataContainer = document.querySelector(".loadedResources")
  

   if(jsonDataContainer) {
           function renderResources(resources)  {
          resources.forEach(resource =>
         {
          const resourceCard = document.createElement("div");
          const resourceTitle = document.createElement("h2");
          const resourceDescription = document.createElement("p");
          const resourceLink = document.createElement("a");
     

          resourceTitle.textContent = `${resource.title}`;
          resourceDescription.textContent = `${resource.description}`;
          resourceLink.textContent = `${resource.official_link}`;
         

             

         
          resourceCard.appendChild(resourceTitle);
          resourceCard.appendChild(resourceDescription);
          resourceCard.appendChild(resourceLink);
          
          
          //styles
          resourceCard.className = `bg-cyan-600 mt-5 mb-5 max-w-sm border border-indigo-600 p-5 rounded-sm hover:bg-sky-700`;
          resourceTitle.className = `text-gray-300 font-bold`;
          resourceDescription.className = `mb-2`;
          jsonDataContainer.className = `flex flex-wrap gap-4 justify-center m-5`; 
          

         

          jsonDataContainer.appendChild(resourceCard);
           });
         
   

         

          
          

       
     } renderResources(data.resources);
    
    }

            
  }