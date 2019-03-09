import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TriviaQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "blob" })
    question: string;

    @Column({ type: "blob" })
    description: string;

    @Column()
    answer: string;

    @CreateDateColumn()
    createdDate: Date;

}
