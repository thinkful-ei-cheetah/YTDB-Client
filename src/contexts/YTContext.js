import React, { Component } from 'react'
import FavoritesService from '../services/favorites-service'

const YTContext = React.createContext({
    channels: [],
    activeChannel: {},
    favorites: [],
    searchTerm: '',
    prevSearchTerm: '',
    topicSelect: '',
    prevTopicSelect: '',
    ytdbOption: false,
    setChannels: () => {},
    setActiveChannel: () => {},
    setSearchTerm: () => {},
    setPrevSearchTerm: () => {},
    setTopicSelect: () => {},
    setPrevTopicSelect: () => {},
    addFavorite: () => {},
    removeFavorite: () => {},
    setFavorites: () => {},
    setYtdbOption: () => {},
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeChannel: null,
        channels: [],
        favorites: [],
        searchTerm: '',
        prevSearchTerm: '',
        topicSelect: 'none',
        prevTopicSelect: 'none',
        ytdbOption: false,
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

  setSearchTerm = searchTerm => {
    this.setState({ searchTerm })
  }

  setPrevSearchTerm = prevSearchTerm => {
    this.setState({ prevSearchTerm })
  }

  setTopicSelect = str => {
    this.setState({ topicSelect: str })
  }

  setPrevTopicSelect = str => {
    this.setState({ prevTopicSelect: str })
  }

  setYtdbOption = bool => {
    this.setState({ ytdbOption: bool })
  }

  render() {
    const value = {
        activeChannel: this.state.activeChannel,
        channels: this.state.channels,
        favorites: this.state.favorites,
        searchTerm: this.state.searchTerm,
        prevSearchTerm: this.state.prevSearchTerm,
        topicSelect: this.state.topicSelect,
        prevTopicSelect: this.state.prevTopicSelect,
        ytdbOption: this.state.ytdbOption,
        setActiveChannel: this.setActiveChannel,
        setChannels: this.setChannels,
        addFavorite: this.addFavorite,
        setSearchTerm: this.setSearchTerm,
        setPrevSearchTerm: this.setPrevSearchTerm,
        setTopicSelect: this.setTopicSelect,
        setPrevTopicSelect: this.setPrevTopicSelect,
        removeFavorite: this.removeFavorite,
        setFavorites: this.setFavorites,
        setYtdbOption: this.setYtdbOption,
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}