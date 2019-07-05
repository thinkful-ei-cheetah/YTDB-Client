import React, { Component } from 'react'

const YTContext = React.createContext({
    channels: [],
    activeChannel: {},
    topicSelct: '',
    setChannels: () => {},
    setActiveChannel: () => {},
    setTopicSelect: () => {},
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        channels: [],
        activeChannel: null,
        topicSelect: null,
    }
  }

  setChannels = arr => {
    this.setState({ channels: arr })
  }
  
  setActiveChannel = obj => {
    this.setState({ activeChannel: obj})
  }

  setTopicSelect = str => {
    this.setState({ topicSelect: str })
  }

  render() {
    const value = {
        channels: this.state.channels,
        activeChannel: this.state.activeChannel,
        topicSelect: this.state.topicSelect,
        setChannels: this.setChannels,
        setActiveChannel: this.setActiveChannel,
        setTopicSelect: this.setTopicSelect,
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}