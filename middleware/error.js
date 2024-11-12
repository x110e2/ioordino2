export default function appError(err,req,res,next){
    res.status(err.code).send(err.message);
}