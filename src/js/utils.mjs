//
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

}

