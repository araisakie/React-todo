import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { IncmpleteTodos } from "./components/incmpleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, settodoText] = useState("");
  const [incmpleteTodos, setincmpleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);

  const onChangeTodoText = (event) => settodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incmpleteTodos, todoText];
    setincmpleteTodos(newTodos);
    settodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incmpleteTodos];
    newTodos.splice(index, 1);
    setincmpleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncmpleteTodos = [...incmpleteTodos];
    newIncmpleteTodos.splice(index, 1);

    const newCmpleteTodos = [...completeTodos, incmpleteTodos[index]];

    setincmpleteTodos(newIncmpleteTodos);
    setcompleteTodos(newCmpleteTodos);
  };

  const onClickBack = (index) => {
    const newCmpleteTodos = [...completeTodos];
    newCmpleteTodos.splice(index, 1);

    const newIncmpleteTodos = [...incmpleteTodos, completeTodos[index]];
    setcompleteTodos(newCmpleteTodos);
    setincmpleteTodos(newIncmpleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incmpleteTodos.length >= 5}
      />
      {incmpleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までです。消化しましょう。
        </p>
      )}

      <IncmpleteTodos
        todos={incmpleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
