import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VoiceChannelActivity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: string;

    @Column()
    discriminator: string;

    @Column()
    username: string;

    @Column()
    status: string;

    @CreateDateColumn()
    createdDate: Date;

}
