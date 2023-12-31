//? METHOD-1 (SADECE JAVASCRİPT TE YAZILAN YOL) 1.yol
//?---------------------------------------------------------------

//*example-1 (onmouseover-onmouseout)

const js= document.querySelector("#js")
const badi=document.querySelector("#badi")

js.onmouseover=()=>{

    badi.style.backgroundColor="pink"
}
js.onmouseout=()=>{
    badi.style.backgroundColor="red"
}

//*example-2 (onclick -ondblclick)

const bir= document.querySelector(".bir")
const iki= document.querySelector(".iki")

bir.onclick=()=>{

    bir.src = "./img/logo2.png";
    iki.src = "./img/js_logo.png";


    
    iki.onclick = () => {
      bir.src = "./img/js_logo.png";
      iki.src = "./img/logo2.png";
    };
    
}

iki.ondblclick=()=>{
    bir.src="./img/bir.jpeg"
    iki.src="./img/iki.webp"
}

const buton=document.querySelector("#btn")
buton.onclick=()=>{
    badi.style.backgroundImage="linear-gradient(to right, purple,gray)";
    buton.textContent="SEARCH";
    buton.style.fontSize="40px";
}

// ? METHOD-2 (sadece JAVASCRIPT te yazılır- addEventListener())  2.yol
// ? ---------------------------------------------------------------

// buton.addEventListener("click",()=>{
//     badi.style.backgroundImage="linear-gradient(to right, purple,gray)";
//     buton.textContent="SEARCH";
//     buton.style.fontSize="40px";
// })

//* EXAMPLE-4 (Mouse Over, Mouse Out )
//* -------------------------------------------------------

//?METHOD-3 (HTML-INLINE)
//?---------------------------------------------------------------

{/* <h1 onmouseover="style.color='blue'" onmouseout="style.color='yellow'">JAVASCRIPT DOM</h1>     */}