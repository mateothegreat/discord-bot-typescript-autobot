import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KarmaPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from_userid: string;

    @Column()
    from_discriminator: string;

    @Column()
    from_username: string;

    @Column()
    to_userid: string;

    @Column()
    to_discriminator: string;

    @Column()
    to_username: string;

    @CreateDateColumn()
    createdDate: Date;

}
