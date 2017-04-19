'use strict'
import React from 'react';
import {
  expect
} from 'chai';
import {
  shallow,
  mount,
  render
} from 'enzyme';
import { Provider } from 'react-redux';
import configueStore from 'redux-mock-store';
import SignIn from '../src/client/components/Auth/SignIn/signin.jsx';
import SignInForm from '../src/client/components/Auth/SignIn/signinForm.jsx'

const middlewares = [];
const mockStore = configueStore(middlewares);

let component;
describe('Componnet SignIn', function () {
  beforeEach(() => {
    store = mockStore({});
    component = shallow(<Provider store={window.store}><SignIn  /></Provider>).shallow();
  });

  it('should have a class name signupContainer', function () {s
    expect(component.is('.signupContainer').to.equal(true))
  });

  it('should render Sign In Form', function() {
    expect(component.containsAllMatchingElements(<SignInForm />)).to.equal(true);
  });
})