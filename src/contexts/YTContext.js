import React, { Component } from 'react'
import FavoritesService from '../services/favorites-service'

const YTContext = React.createContext({
    channels: [],
    activeChannel: {},
    favorites: [],
    topicSelect: '',
    useYtdb: false,
    setChannels: () => {},
    setActiveChannel: () => {},
    setTopicSelect: () => {},
    addFavorite: () => {},
    removeFavorite: () => {},
    setFavorites: () => {},
    setUseYtdb: () => {},
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeChannel: null,
        channels: [],
        favorites: [],
        topicSelect: 'none',
        useYtdb: false,
    }
  }

  setChannels = arr => {
    this.setState({ channels: arr })
  }

  setFavorites = arr => {
    this.setState({ favorites: arr });
  }
  
  addFavorite = async obj => {
    await FavoritesService.addFavorite(obj);
    await this.setState({ favorites: [...this.state.favorites, obj] })
  }

  removeFavorite = async obj => {
    await FavoritesService.removeFavorite(obj);
    await this.setState({ 
      favorites: this.state.favorites.filter(favorite => favorite !== obj)
    })
  }
  
  setActiveChannel = obj => {
    this.setState({ activeChannel: obj })
  }

  setTopicSelect = str => {
    this.setState({ topicSelect: str })
  }

  setUseYtdb = bool => {
    this.setState({ useYtdb: bool })
  }

  render() {
    const value = {
        activeChannel: this.state.activeChannel,
        channels: this.state.channels,
        favorites: this.state.favorites,
        topicSelect: this.state.topicSelect,
        useYtdb: this.state.useYtdb,
        setActiveChannel: this.setActiveChannel,
        setChannels: this.setChannels,
        addFavorite: this.addFavorite,
        setTopicSelect: this.setTopicSelect,
        removeFavorite: this.removeFavorite,
        setFavorites: this.setFavorites,
        setUseYtdb: this.setUseYtdb,
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}