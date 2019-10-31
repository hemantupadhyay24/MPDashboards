import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { NotFound } from './Errors'
// import Writers from './Writers'
import Layout from './Layout'
import Orders from './Orders'

export default class extends Component {
  state = {
    writers: []
    // patient: []
  }

  async componentDidMount() {
    const writers = await (await fetch('http://localhost:3004/writers?_embed=texts')).json()
  //   const patient = await(await fetch('http://localhost:3004/patient?_embed=texts'))
    this.setState({ writers })
  }

  render() {
    const { writers } = this.state

    return <BrowserRouter>
      <Layout writers={writers}>
        <Switch>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path="/orders" render={() => <div><Orders /></div>} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  }
}
