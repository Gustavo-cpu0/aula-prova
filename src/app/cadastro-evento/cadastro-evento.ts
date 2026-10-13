import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Evento } from '../models/evento';
import {
  validarData,
  validarEmailResponsavel,
  validarLocal,
  validarTitulo,
  validarVagas,
  validarVagasParaLocal
} from '../models/evento.validacao';

type CampoEvento = 'titulo' | 'data' | 'local' | 'emailResponsavel' | 'vagas';
type EventoEmEdicao = Omit<Evento, 'id'>;

@Component({
  selector: 'app-cadastro-evento',
  imports: [FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento {
  readonly titulo = 'Cadastro de Evento';
  readonly descricao = 'Preencha os dados para cadastrar um novo evento.';
  readonly locais = ['Auditório', 'Laboratório 1', 'Laboratório 2', 'Sala 101'];

  rascunho: EventoEmEdicao = {
    titulo: '',
    data: '',
    local: '',
    emailResponsavel: '',
    vagas: null
  };

  tocados: Partial<Record<CampoEvento, boolean>> = {};
  eventos: Evento[] = [];

  get erros(): Partial<Record<CampoEvento, string>> {
    const erros: Partial<Record<CampoEvento, string>> = {};

    const titulo = validarTitulo(this.rascunho.titulo);
    if (titulo) {
      erros.titulo = titulo;
    }

    const data = validarData(this.rascunho.data);
    if (data) {
      erros.data = data;
    }

    const local = validarLocal(this.rascunho.local);
    if (local) {
      erros.local = local;
    }

    const email = validarEmailResponsavel(this.rascunho.emailResponsavel);
    if (email) {
      erros.emailResponsavel = email;
    }

    const vagas = validarVagas(this.rascunho.vagas);
    if (vagas) {
      erros.vagas = vagas;
    } else {
      const regraLocal = validarVagasParaLocal(this.rascunho.vagas, this.rascunho.local);
      if (regraLocal) {
        erros.vagas = regraLocal;
      }
    }

    return erros;
  }

  get temErro(): boolean {
    return Object.keys(this.erros).length > 0;
  }

  deveMostrar(campo: CampoEvento): boolean {
    return this.tocados[campo] === true && this.erros[campo] !== undefined;
  }

  mensagem(campo: CampoEvento): string {
    return this.erros[campo] ?? '';
  }

  marcarTocado(campo: CampoEvento): void {
    this.tocados[campo] = true;
  }

  mostrarTudo(): void {
    (['titulo', 'data', 'local', 'emailResponsavel', 'vagas'] as CampoEvento[]).forEach(campo => {
      this.tocados[campo] = true;
    });
  }

  salvar(): void {
    if (this.temErro) {
      this.mostrarTudo();
      return;
    }

    const novoEvento: Evento = {
      id: this.proximoId(),
      titulo: this.rascunho.titulo.trim(),
      data: this.rascunho.data,
      local: this.rascunho.local,
      emailResponsavel: this.rascunho.emailResponsavel.trim(),
      vagas: this.rascunho.vagas
    };

    this.eventos = [...this.eventos, novoEvento];
    this.limpar();
  }

  limpar(): void {
    this.rascunho = {
      titulo: '',
      data: '',
      local: '',
      emailResponsavel: '',
      vagas: null
    };
    this.tocados = {};
  }

  private proximoId(): number {
    return this.eventos.reduce((maior, evento) => Math.max(maior, evento.id), 0) + 1;
  }
}
