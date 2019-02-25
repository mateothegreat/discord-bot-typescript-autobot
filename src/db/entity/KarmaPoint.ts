import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KarmaPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: string;

    @Column()
    discriminator: string;

    @Column()
    username: string;

    @CreateDateColumn()
    createdDate: Date;

}
