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
})
export default YTContext;

export class YTProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeChannel: null,
        channels: [],
      favorites: [{
        channelId: "UCVtCq_mSA6YpVV7FG5dYM-g",
        channelTitle: "Testing The Chicken",
        description: "Chicken here! Come join the battle as we storm the beaches! Daily Boom Beach & Brawl Stars content! Operations, high level tactics troop guides, daily events.",
        liveBroadcastContent: "upcoming",
        publishedAt: "2015-06-04T20:18:59.000Z",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/-StiNmLeRBcs/AAAAAAAAAAI/AAAAAAAAAAA/Cyaq2aSOnJ8/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
          },
          high: {
            url: "https://yt3.ggpht.com/-StiNmLeRBcs/AAAAAAAAAAI/AAAAAAAAAAA/Cyaq2aSOnJ8/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
          },
          medium: {
            url: "https://yt3.ggpht.com/-StiNmLeRBcs/AAAAAAAAAAI/AAAAAAAAAAA/Cyaq2aSOnJ8/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
          },
          title: "Testing The Chicken",
        }
      }],
        topicSelect: null,
    }
  }

  setChannels = arr => {
    this.setState({ channels: arr })
  }

  addFavorite = arr => {
    this.setState({ favorites: [...this.state.favorites, arr] })
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
    }

    return (
      <YTContext.Provider value={value}>
        {this.props.children}
      </YTContext.Provider>
    )
  }

}