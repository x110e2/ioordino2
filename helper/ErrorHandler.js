export default class ErrorHandler extends Error{
    constructor(code,message){
        super(message);
        this.code=code;
        this.handle();
    }
    handle(){
        switch (this.code){
            case 400:this.badRequest();break;
            case 404:this.notFound();break;
            case 500:this.serverError();break;
            default:this.message=`${this.message||"Errore interno riprova..."}`;
        }
    }
    badRequest(){
        this.message=`${this.message||"Richiesta non corretta..."}`;
    }
    notFound(){
        this.message=`${this.message||"Risorsa non trovata..."}`;
    }
    serverError(){
        //erroee da inserire nel db o inviare email.
        this.message=`${this.message||"Errore interno al server xx..."}`;
    }
}