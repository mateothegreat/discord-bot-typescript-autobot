import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poll {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

}
