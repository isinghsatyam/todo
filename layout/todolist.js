import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Todo from '../component/todo';
//import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoTitle: '',
    };
  }

  _changeNewTitleText = text => {
    this.setState({newTodoTitle: text});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder={'Add new ToDo'}
            autoCorrect={false}
            returnKeyType={'done'}
            value={this.state.newTodoTitle}
            onChangeText={this._changeNewTitleText}
            onSubmitEditing={() => {
              this.props.addTodo(this.state.newTodoTitle);
              this._changeNewTitleText('');
            }}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              this.props.addTodo(this.state.newTodoTitle);
              this._changeNewTitleText('');
            }}>
            <Icon name="plus" size={30} color="#0b1e2e" />
          </TouchableOpacity>
        </View>
        <ScrollView indicatorStyle="white">
          {Object.keys(this.props.todos).length !== 0 ||
          this.props.todos.constructor !== Object ? (
            Object.values(this.props.todos)
              .sort((a, b) => {
                if (a.priority === b.priority) {
                  return a.dueDate > b.dueDate;
                }
                return a.priority > b.priority;
              })
              .map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  deleteTodo={this.props.deleteTodo}
                  completeStateToggle={this.props.completeStateToggle}
                  changeTitleText={this.props.changeTitleText}
                  changeDescriptionText={this.props.changeDescriptionText}
                  changePriority={this.props.changePriority}
                  changeDueDate={this.props.changeDueDate}
                />
              ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Please Add Some Todo {'\n'} © Nikhil</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 30,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    //shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
  inputText: {
    flex: 10, 
    fontSize: 20,
  },
  addButton: {flex: 1, alignItems: 'flex-end'},
  emptyContainer: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#0b1e2e',
    padding: 5,
    elevation: 5,
    marginTop : 100
  },
  emptyText: {
    fontSize: 30,
    color: '#0b1e2e',
    textAlign : 'center',
    fontWeight : 'bold'
  },
});
