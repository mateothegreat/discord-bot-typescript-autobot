import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class KB {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ nullable: true })
    command: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ nullable: true })
    footer: string;

    @Column({ nullable: true })
    thumbnail: string;

}


