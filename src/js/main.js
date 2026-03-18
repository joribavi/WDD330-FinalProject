import { loadHeaderFooter } from "./utils.mjs";
import { searchInput } from "./search.mjs";


await loadHeaderFooter();

await searchInput();


document.getElementById("logo").src = `${import.meta.env.BASE_URL}images/logo.png`