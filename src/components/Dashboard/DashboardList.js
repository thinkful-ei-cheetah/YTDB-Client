import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let channel = 
            {
                channelId: "UCVtCq_mSA6YpVV7FG5dYM-g",
                channelTitle: "The Chicken",
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
                    title: "The Chicken",
                }
            }
        // let channel = this.props.channel
        return (
            <div className='ind_results'>
                <h3>{channel.channelTitle}</h3>
                <img src={channel.thumbnails.default.url} alt={`thumbnail for ${channel.title}`} /><br />
                <Link to={`/channel/${channel.channelId}`} className='link-channel'>
                    <button>
                        Details
                    </button>
                </Link>
                <p>{channel.description}</p>

            </div>
        );
    }
}

export default DashboardList;
