import { isAxiosError } from 'axios';
import type { Exercise } from '../types/exercise';
import { api } from './api';

function isExercise(value: unknown): value is Exercise {
  if (typeof value !== 'object' || value === null) return false;

  const exercise = value as Record<string, unknown>;
  return (
    typeof exercise._id === 'string' && exercise._id.length > 0 &&
    typeof exercise.name === 'string' && exercise.name.trim().length > 0 &&
    typeof exercise.description === 'string' &&
    typeof exercise.videoUrl === 'string' &&
    typeof exercise.muscleGroup === 'string'
  );
}

export async function getExercises(signal: AbortSignal): Promise<Exercise[]> {
  const { data } = await api.get<unknown>('/exercice', {
    signal,
    timeout: 60000,
  });

  if (!Array.isArray(data) || !data.every(isExercise)) {
    throw new Error('A API retornou uma lista de exercícios em formato inválido.');
  }

  return data;
}

export function getExercisesErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return 'O servidor demorou para responder. Tente novamente.';
    }
    if (!error.response) {
      return 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.';
    }
    return 'Não foi possível carregar os exercícios. Tente novamente.';
  }

  return 'Não foi possível carregar os exercícios. Tente novamente.';
}
