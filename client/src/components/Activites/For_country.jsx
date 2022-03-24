export const For_country = (({name,img,id})=>{
    return(
        <div>
            <img src={img} alt="Not found"/>
            <p>{name}</p>
            <p>{id}</p>
        </div>
    );
});