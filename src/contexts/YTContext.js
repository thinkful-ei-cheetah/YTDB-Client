import React, { Component } from 'react'

const YTContext = React.createContext({
    // TBA
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // TBA
    }
  }



  render() {
    const value = {
        // TBA
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}