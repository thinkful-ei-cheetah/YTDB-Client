import React, { Component } from 'react'

const YTContext = React.createContext({
    channels: [],
    setChannels: () => {},
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        channels: []
    }
  }

  setChannels = arr => {
    this.setState({ channels: arr })
  }

  render() {
    const value = {
        channels: this.state.channels,
        setChannels: this.setChannels,
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}