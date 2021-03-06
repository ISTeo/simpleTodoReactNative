import React from 'react';
import { Button,StyleSheet, Text, View } from 'react-native'
import todosData from "./todosData"
import TodoItem from "./TodoItem"
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos:todosData
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteCompleted = this.deleteCompleted.bind(this)
  }

  handleClick(id) {
    const todos = this.state.todos
    const filtered = todos.filter(x => x.id !== id)
    this.setState({todos:filtered})
  }

  handleChange(id) {
    this.setState( prevState => {
      const updatedTodos = prevState.todos.map( todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
      return {
        todos: updatedTodos
      }
    })
  }

  deleteCompleted() {
    const todos = this.state.todos
    const filtered = todos.filter(x => !x.completed)
    this.setState({todos:filtered})
  }
  render() {
    const todoItems = this.state.todos.map( item =>
      <TodoItem
        key={item.id}
        item={item}
        handleChange={this.handleChange}
        handleClick={this.handleClick}
      />
    )

    return (
      <View style={styles.container}>
      <Button
        onPress = {this.deleteCompleted}
        title="deleteCompleted"
        color="#ff0000"
        accessibilityLabel="ClickClickClick"
      />
      <Text>This many todos: {todoItems.length}</Text>

      {todoItems}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
