/**
 * Created by Dixon Medina on 12/12/2016.
 */
export class Toast{
  public type : number;
  public message : string;
  public enabled : boolean;

  constructor(type : number, message : string, enabled : boolean){
    this.type = type;
    this.message = message;
    this.enabled = enabled;
  }
  
  setType(type){
    this.type = type;
  }

  setMessage(message){
    this.message = message;
  }

  setEnabled(flag?:boolean){
    this.enabled=flag?flag:false;
  }

  getType(){
    return this.type;
  }

  getMessage(){
    return this.message;
  }

  getEnabled(){
    return this.enabled;
  }
}
