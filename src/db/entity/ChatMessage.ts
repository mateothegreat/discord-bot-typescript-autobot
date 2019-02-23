import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatMessage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: string;

    @Column()
    discriminator: string;

    @Column()
    username: string;

    @Column({ type: "varchar", length: 1000 })
    content: string;

    @CreateDateColumn()
    createdDate: Date;

}
