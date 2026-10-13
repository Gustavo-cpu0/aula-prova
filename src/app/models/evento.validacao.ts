export function validarTitulo(titulo: string): string | null {
  if (titulo === null || titulo === undefined) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }

  const valor = titulo.trim();

  if (valor.length < 5 || valor.length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }

  return null;
}

export function validarData(data: string): string | null {
  if (!data) {
    return 'A data não pode estar no passado.';
  }

  const dataRecebida = new Date(`${data}T00:00:00`);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (Number.isNaN(dataRecebida.getTime()) || dataRecebida < hoje) {
    return 'A data não pode estar no passado.';
  }

  return null;
}

export function validarLocal(local: string): string | null {
  if (local === null || local === undefined || local.trim() === '') {
    return 'O local não pode ficar em branco.';
  }

  return null;
}

export function validarEmailResponsavel(email: string): string | null {
  if (email === null || email === undefined || email.trim() === '') {
    return 'E-mail em formato inválido.';
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValido.test(email.trim())) {
    return 'E-mail em formato inválido.';
  }

  return null;
}

export function validarVagas(vagas: number | null): string | null {
  if (vagas === null || vagas === undefined || !Number.isInteger(vagas) || vagas < 1 || vagas > 200) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }

  return null;
}

export function validarVagasParaLocal(vagas: number | null, local: string): string | null {
  if (vagas === null || vagas === undefined) {
    return null;
  }

  if (local === 'Laboratório 1' || local === 'Laboratório 2') {
    if (vagas > 30) {
      return 'As vagas devem ser no máximo 30 para Laboratórios.';
    }
  }

  return null;
}
