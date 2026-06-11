// TodoPage.jsx

import React from 'react'
import TodoTemplate from '../components/todo/TodoTemplate'
import TodoInsert from '../components/todo/TodoInsert'
import TodoList from '../components/todo/TodoList'
import styled from 'styled-components'


const TodoPage = () => {
  return (
    <Container>
      <TodoTemplate>
        <TodoInsert/>
        <TodoList/>
      </TodoTemplate>
    </Container>
    
  )
}

export default TodoPage

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f3f4f6;
  padding: 30px;
  box-sizing: border-box;
`