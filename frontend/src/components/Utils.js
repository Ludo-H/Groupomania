export const isEmpty = (obj)=> {
    if (obj == null ) return true ;  
}

export const dateParser = (num)=>{
    let options = {hour : "2-digit", minute : '2-digit', year : 'numeric', month : '2-digit', day : '2-digit'};

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

    return date.toString();
}