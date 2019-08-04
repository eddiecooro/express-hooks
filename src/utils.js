import CurrentDispatcher from './CurrentDispatcher';

export function resolveDispatcher() {
  if (CurrentDispatcher.current) {
    return CurrentDispatcher.current;
  } else {
    throw new Error(
      'Express hooks should be used inside of express handlers or middlewares'
    );
  }
}
