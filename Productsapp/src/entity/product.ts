import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity() 
export class Product {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   Name: string; 
   
   @Column() 
   Price: number; 
}
