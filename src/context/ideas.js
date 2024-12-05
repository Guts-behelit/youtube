const idActualIframe = "fn%fmspd";
const listIdVideoIframe = ["SDD","dsad","78dfsd"];
/**esta lista es el resultado de la busqueda del input search */
const listIdVideoResultSearch =["SDD","dsad","78dfsd"];
/**
 * se usa un api con el id actual del video
 * y se obtiene una lista de videos relacionados
 */
const listIdVideosRelacionados = ["3fakca","34opokl","058aal"]
/**
 * 1)  cuando se de click a un id de result 
 * el id del mismo remplazara al idActualIframe
 */
/**
 * 2 ) cuando el idActualIframe sea remplazado 
 * la listIdVideoIframe se actualizara 
 * y sera remplazada por una lista de videos relacionados
 * al que se esta reproduciendo
 */
/**
 * solo cuando se da click en un item de video
 * ya sea de resultado de busqueda 
 * o de un item de video relacionado 
 * se va actualizar el idActualIframe
 */
/**
 * cada vez que el id del iframe se cambie 
 * se va usar la api para poder  obtner videos relacionados
 * y remplazar listIdVideoIframe
 */
/**
 * cuando se da click em siguiente 
 */