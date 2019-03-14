import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TriviaPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: string;

    @Column()
    discriminator: string;

    @Column()
    username: string;

    @Column()
    question_id: number;

    @CreateDateColumn()
    createdDate: Date;

}
