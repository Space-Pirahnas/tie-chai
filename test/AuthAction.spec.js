import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/client/actions/index.jsx';
import * as types from '../src/client/actions/types.jsx';
import nock from 'nock'
import expect from 'chai'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// describe('Sign In async actions', () => {
//       afterEach(() => {
//         nock.cleanAll()
//       })

//       describe('async actions', () => {
//         afterEach(() => {
//           nock.cleanAll()
//         })

//         //   it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
//         //     nock('http://example.com/')
//         //       .get('/todos')
//         //       .reply(200, { body: { todos: ['do something'] }})

//         //     const expectedActions = [
//         //       { type: types.FETCH_TODOS_REQUEST },
//         //       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
//         //     ]
//         //     const store = mockStore({ todos: [] })

//         //     return store.dispatch(actions.fetchTodos())
//         //       .then(() => { // return of async actions
//         //         expect(store.getActions()).toEqual(expectedActions)
//         //       })
//         //   })
//         // })
//       })
//     }