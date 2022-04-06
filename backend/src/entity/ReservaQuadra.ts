import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quadra } from "./Quadra";
import { Usuario } from "./Usuario";

@Entity('reserva_quadra')
export class ReservaQuadra {

    @PrimaryGeneratedColumn()
    public id: number

    @Column({ type: "timestamp", nullable: false })
    public horario: Date

    @Column({ type: 'boolean' })
    public personal: Boolean

    @ManyToOne(() => Quadra, quadra => quadra.reservaQuadra, { eager: true })
    public quadra: Quadra

    @ManyToOne(() => Usuario, usuario => usuario.reservaQuadra, { eager: true })
    public usuario: Usuario
}