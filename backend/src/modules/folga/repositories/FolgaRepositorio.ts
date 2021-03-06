import { getDaysInMonth } from "date-fns";
import { Folga } from "entity/Folga";
import { Between, getRepository, Repository } from "typeorm";
import { IFolgaRepositorio } from "./IFolgaRepositorio";

export class FolgaRepositorio implements IFolgaRepositorio{

    private folgaRepositorio: Repository<Folga>

    constructor(){
        this.folgaRepositorio = getRepository(Folga)
    }
    async criar(data: Date): Promise<Folga> {
        const folga = this.folgaRepositorio.create({data})
        return folga
    }
    async salvar(folga: Folga): Promise<Folga> {
        const folgaComId = await this.folgaRepositorio.save(folga)
        return folgaComId
    }
    
    async verificarFolga(data: Date): Promise<Folga | undefined> {
        const folga = await this.folgaRepositorio.findOne({where: {data}})

        return folga
    }

    async verificarFolgasMes(data: Date): Promise<Folga[]> {
        const ano = data.getFullYear()
        const mes = data.getMonth()
        
        
        const dataInicio = new Date(ano, mes, 1)
        const dataFim = new Date(ano,mes, getDaysInMonth(data))
        
      
        const folga = await this.folgaRepositorio.find({
            where: {
                data: Between(dataInicio, dataFim)
                
            }
        })

        
        return folga
    }
    
}