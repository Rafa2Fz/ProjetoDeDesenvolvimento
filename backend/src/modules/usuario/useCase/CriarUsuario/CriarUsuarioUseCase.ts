import { Usuario } from "entity/Usuario";
import { IUsuarioDTO } from "modules/usuario/dto/IUsuarioDTO";
import { IUsuarioRepositorio } from "modules/usuario/repositories/IUsuarioRepositorio";
import { AppError } from "shared/error/AppError";
import { inject, injectable } from "tsyringe";

type Request = {
    email: string;
    nome: string;
    password: string;
}

@injectable()
export class CriarUsuarioUseCase {

    constructor(
        @inject("UsuarioRepositorio")
        public usuarioRepositorio: IUsuarioRepositorio,

    ) { }
    public async executar({ email, nome, password }: Request): Promise<IUsuarioDTO> {

        const usuarioExiste = await this.usuarioRepositorio.buscarPorEmail(email)

        if (usuarioExiste) {
            throw new AppError('Email já cadastrado!', 401)
        }

        const usuario = await this.usuarioRepositorio.criar({
            nome,
            email,
            password,
            tipoUsuarioId: 2
        })

        await this.usuarioRepositorio.salvar(usuario)

        return usuario
    }

}