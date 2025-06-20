import { create } from 'zustand';

export const INTIAL_VALUE = 25;

type State = {
  balance: number;
  deductBalance: (amount: number) => void;
  setBalance?: (balance: number) => void;
};

export const useBalanceStore = create<State>((set) => {
  if (localStorage.getItem('balance') === undefined) {
    localStorage.setItem('balance', String(INTIAL_VALUE));
  }

  return {
    balance: Number(localStorage.getItem('balance')) || INTIAL_VALUE,
    deductBalance: (amount) => {
      set((state) => {
        const newBalance = state.balance - amount;

        if (newBalance < 0) {
          throw new Error('Insufficient balance');
        }

        localStorage.setItem('balance', String(newBalance));
        return { balance: newBalance };
      });
    },
    setBalance: (balance) => {
      localStorage.setItem('balance', String(balance));
      set({ balance });
    }
  };
});
