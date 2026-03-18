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
    const headerTemplate = await loadTemplate(`${import.meta.env.BASE_URL}partials/header.html`);
    const footerTemplate = await loadTemplate(`${import.meta.env.BASE_URL}partials/footer.html`);

    const headerElement = document.querySelector(".my-Header");
    const footerElement = document.querySelector(".my-Footer");

    if(headerElement) {
        renderWithTemplate(headerTemplate, headerElement, null, callback);
       }
     if(footerElement) {
        renderWithTemplate(footerTemplate, footerElement, null, callback);
       }
   

}