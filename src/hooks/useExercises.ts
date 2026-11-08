import { useEffect, useState } from 'react';
import { getExercises, getExercisesErrorMessage } from '../services/exercises';
import type { Exercise } from '../types/exercise';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadExercises() {
      setIsLoading(true);
      setErrorMessage('');
      setExercises([]);

      try {
        const data = await getExercises(controller.signal);
        if (!controller.signal.aborted) setExercises(data);
      } catch (error: unknown) {
        if (!controller.signal.aborted) {
          setErrorMessage(getExercisesErrorMessage(error));
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadExercises();
    return () => controller.abort();
  }, [attempt]);

  return {
    exercises,
    isLoading,
    errorMessage,
    reload: () => setAttempt((value) => value + 1),
  };
}
