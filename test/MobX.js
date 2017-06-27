const log = require('fliplog')

const {Chain, toArr} = require('../src')

class ChainInc extends Chain {
  getSetIncrement(names) {
    toArr(names).map(name =>
      this.method(name)
        .initial(0)
        .getSet()
        // .define()
        .onSet(() => this.tap(name, x => x + 1))
        .onCall(() => this.tap(name, x => x + 1))
        .build()
    )

    return this
  }
}

const last = arr => arr.slice(0).pop()
class TodoStore extends ChainInc {
  constructor(parent) {
    super(parent)

    this.set('todos', [])
      .getSetIncrement(['completed', 'pending', 'total'])
      .transform('todos', todos => {
        this.total(+1) && last(todos).completed
          ? this.completed(+1)
          : this.pending(+1)

        return todos
      })
  }

  add(task, completed = false) {
    const todo = {task, completed, assignee: null}
    const todos = this.get('todos').concat([todo])
    return this.set('todos', todos)
  }
}

// class SomeComponent extends React.Component {
//   store = new TodoStore(this)
//   addTasks = task => this.store
//     .add({eh: true})
//     .add({eh: false})
//     .add({moose: 'eh!'}, true)
//
//   render() {
//     const {completed, pending, total, todos} = this.store.entries()
//     return (
//       <ul>{todos.map(todo =>
//         <li>{completed}/{total} Tasts Completed</li>
//         <li>{pending}/{total} Tasts Pending</li>
//       }</ul>
//     )
//   }
// }

test('todostore', () => {
  const _todos = new TodoStore()

  _todos.add({eh: true})
  _todos.add({eh: false})
  _todos.add({moose: 'eh!'}, true)

  const {completed, pending, total, todos} = _todos.entries()

  expect({todos, completed: +completed, pending: +pending, total: +total}).toEqual({
    todos: [
      {task: {eh: true}, completed: false, assignee: null},
      {task: {eh: false}, completed: false, assignee: null},
      {task: {moose: 'eh!'}, completed: true, assignee: null},
    ],
    completed: 1,
    pending: 2,
    total: 3,
  })
})
