import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    price: number;
    
    @Column()
    preparation: number;
    
    @Column()
    uploaderId: number;
}