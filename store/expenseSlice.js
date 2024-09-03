import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  income: 0,
  expense: 0,
  balance: 0,
  transactions: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.income += action.payload.amount;
      state.balance += action.payload.amount;
      state.transactions.push({ text: action.payload.text, amount: action.payload.amount });
    },
    addExpense: (state, action) => {
      state.expense += action.payload.amount;
      state.balance -= action.payload.amount;
      state.transactions.push({ text: action.payload.text, amount: -action.payload.amount });
    },
    addremove:(state,action)=>{
      let trans=state.transactions[action.payload]
      if (trans.amount>0){
        state.income-=trans.amount
        state.balance-=trans.amount
      }
      else{
        state.expense+=trans.amount
        state.balance-=trans.amount
      }
      state.transactions.splice(action.payload,1)
    }
  },
});

export const { addIncome, addExpense,addremove } = expenseSlice.actions;

export default expenseSlice.reducer;
