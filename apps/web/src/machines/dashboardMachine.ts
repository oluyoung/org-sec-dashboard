import { createMachine, assign } from 'xstate';

export const dashboardMachine = createMachine({
  id: 'dashboard',
  initial: 'idle',
  context: {
    error: undefined,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      on: {
        SUCCESS: 'success',
        FAILURE: {
          target: 'failure',
          actions: assign({
            error: (_, event) => event?.error,
          }),
        },
      },
    },
    success: {
      on: {
        REFRESH: 'loading',
      },
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
  },
});
