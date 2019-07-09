import React, { Component } from 'react'

const YTContext = React.createContext({
    channels: [],
    activeChannel: {},
    favorites: [],
    topicSelct: '',
    setChannels: () => {},
    setActiveChannel: () => {},
    setTopicSelect: () => {},
    addFavorite: () => {},
    removeFavorite: () => {},
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeChannel: null,
        channels: [],
        favorites: [],
        topicSelect: null,
    }
  }

  setChannels = arr => {
    this.setState({ channels: arr })
  }

  addFavorite = obj => {

    this.setState({ favorites: [...this.state.favorites, obj] })
  }

  removeFavorite = obj => {
    this.setState({ 
      favorites: this.state.favorites.filter(favorite => favorite !== obj)
    })
  }
  
  setActiveChannel = obj => {
    this.setState({ activeChannel: obj })
  }

  setTopicSelect = str => {
    this.setState({ topicSelect: str })
  }

  render() {
    const value = {
        activeChannel: this.state.activeChannel,
        channels: this.state.channels,
        favorites: this.state.favorites,
        topicSelect: this.state.topicSelect,
        setActiveChannel: this.setActiveChannel,
        setChannels: this.setChannels,
        addFavorite: this.addFavorite,
        setTopicSelect: this.setTopicSelect,
        removeFavorite: this.removeFavorite,
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}