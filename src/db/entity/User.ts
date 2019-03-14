import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @Column()
    discordUserId: string;

    @Column()
    discordUsername: string;

    @Column()
    discrodDiscriminator: string;

}
