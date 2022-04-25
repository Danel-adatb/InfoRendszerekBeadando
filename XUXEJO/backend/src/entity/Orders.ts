import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    foodName: string;

    @Column({ nullable: true })
    imgUrl: string;
    
    @Column({ nullable: true })
    category: string; /*Category[];*/
    
    @Column({ type: 'text', nullable: true })
    description: string;
    
    @Column({ type: 'int'})
    price: number;
    
    @Column({ type: 'int'})
    preparation: number;

    @Column({ type: 'int'})
    uploaderId: number;
}