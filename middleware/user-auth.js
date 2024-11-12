export function checkAuthentication(req,res,next){
    const isLogged=true;
    if(!isLogged)return res.status(401).send('non sei autenticato');
    req.user={nome:'Sara', tipo:'Premium'};
    next();
}
export function checkAuthorization(req,res,next){
    console.log(req.user);
    const isAutorizzato=req.user.tipo==='Premium'?true:false;
    if(!isAutorizzato)return res.status(403).send('non sei autorizzato');
    next();
}