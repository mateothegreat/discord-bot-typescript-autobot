import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    userid: string;

    @Column()
    username: string;

    @Column()
    discriminator: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    about: string;

    @Column({ nullable: true })
    sites: string;

    @Column({ nullable: true })
    github: string;

    @Column({ nullable: true })
    linkedin: string;

    @Column({ nullable: true })
    twitter: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    skype: string;

}


