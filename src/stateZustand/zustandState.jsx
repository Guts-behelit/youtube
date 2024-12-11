import { create } from "zustand";

export const useStore = create((set)=>({
    idActualVideoIframe : "kBkqVyTQa1w",
    listIdActualVideoIframe : [],
    listObjectVideoSearch : [],
    updateIdActualVideoIframe : (newIdVideo)=> set({idActualVideoIframe : newIdVideo }),
    updateListIdVideoIframe :(newListIdVideo)=> set({listIdActualVideoIframe :newListIdVideo}),
    updateListObjectVideoSearch:(newListObjectVideoSearch)=> set({listObjectVideoSearch :newListObjectVideoSearch}),
    referenceIframe:null,
    updateReferenceIframe:(referenceActually)=> set({referenceIframe:referenceActually}),
    isReproduction : false,
    updateIsReproduction:(newBoolean)=> set({isReproduction:newBoolean}),
    objectVideoActually:{videoId:'kBkqVyTQa1w',
        thumbnail:[{url:"https://i.ytimg.com/vi/kBkqVyTQa1w/hqdefault.jpg"},{url:""}],
        title:'zunztand',
        lengthText:'5.56'},
    updateObjectVideoActually : (newObjectVideo)=> set({objectVideoActually:newObjectVideo}),
    colorControlerPlayer:[],
    updateColorControlerPlayer : (newColor)=> set({colorControlerPlayer:newColor}),
}));
