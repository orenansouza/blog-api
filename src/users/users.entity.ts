import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 55 })
  password: string;

  @Column({ name: "profile_image_path", nullable: true })
  profileImagePath: string;

  @Column({ type: "timestamp", name: "created_at", default: new Date() })
  createdAt: Date;

  @Column({ type: "timestamp", name: "updated_at", default: new Date() })
  updatedAt: Date;
}
