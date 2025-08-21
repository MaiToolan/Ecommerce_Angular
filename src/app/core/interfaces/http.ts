export interface IRegister {
  username:string;
  email:string;
  password:string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IProducts {
  id: 1;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  discount: number;
  rating:{rate:number ,count :number}
}
