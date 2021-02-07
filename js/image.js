$(document).ready(() => {
    let x = $("article img")
    for(let i of x){
        if(!$(i).hasClass("img-fluid")){
            $(i).addClass("img-fluid");
        }
    }
})