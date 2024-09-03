"use client";
import React from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addIncome, addExpense, addremove } from '@/store/expenseSlice'; // Correct path to your slice
import { store } from '@/store/store';

export default function Home() {
    return (
        <Provider store={store}>
            <MyHome />
        </Provider>
    );
}

function MyHome() {
    const { income, expense, balance, transactions } = useSelector((state) => state.expense);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = ({ text, amount }) => {
        const numericAmount = parseFloat(amount);
        if (numericAmount > 0) {
            dispatch(addIncome({ text, amount: numericAmount }));
        } else {
            dispatch(addExpense({ text, amount: Math.abs(numericAmount) }));
        }

        reset(); // Reset the form fields
    };

    return (
        <div
            className="container-fluid justify-content-center align-items-center d-flex"
            style={{ backgroundColor: "black", color: "white", height: "100vh" }}
        >
            <div className='d-flex justify-content-center align-items-center p-2' style={{ border: "1px solid red" }}>
                <div style={{ minWidth: "350px", margin: "auto" }}>
                    <h2 className="text-center">Expense Tracker</h2>
                    <div className="d-flex justify-content-between my-1 income">
                        <div>
                            <h4>Your Balance</h4>
                            <h1>${balance.toFixed(2)}</h1>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center" style={{ gap: "70px" }}>
                        <div>
                            <span>INCOME</span>
                            <h3 className="text-success">${income.toFixed(2)}</h3>
                        </div>
                        <div>
                            <span>EXPENSE</span>
                            <h3 className="text-danger">${expense.toFixed(2)}</h3>
                        </div>
                    </div>

                    <h4>History</h4>
                    <ul className="list-group mb-1" style={{ maxHeight: "120px", overflowY: "auto" }}>
                        {transactions.map((transaction, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                <button
                                    onClick={() => dispatch(addremove(index))}
                                    style={{ color: "red", border: "none" }}
                                >
                                    X
                                </button>
                                {transaction.text}
                                <span className={transaction.amount > 0 ? 'text-success' : 'text-danger'}>
                                    {transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <h4>Add new transaction</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Text</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('text', { required: 'This field is required' })}
                            />
                            {errors.text && <small className="text-danger">{errors.text.message}</small>}
                        </div>
                        <div className="form-group mt-1">
                            <label>Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register('amount', { 
                                    required: 'This field is required', 
                                    validate: value => !isNaN(parseFloat(value)) || 'Amount must be a number' 
                                })}
                            />
                            {errors.amount && <small className="text-danger">{errors.amount.message}</small>}
                            <small className="form-text text-muted">
                                (negative - expense, positive - income)
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary mt-1">
                            Add transaction
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
