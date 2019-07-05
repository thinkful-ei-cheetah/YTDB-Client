import React, { Component } from 'react'

const YTContext = React.createContext({
    channels: [],
    activeChannel: {},
    setChannels: () => {},
    setActiveChannel: () => {},
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        channels: [],
        activeChannel: null,
    }
  }

  setChannels = arr => {
    this.setState({ channels: arr })
  }
  
  setActiveChannel = obj => {
    this.setState({ activeChannel: obj})
  }

  render() {
    const value = {
        channels: this.state.channels,
        activeChannel: this.state.activeChannel,
        setChannels: this.setChannels,
        setActiveChannel: this.setActiveChannel,
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}