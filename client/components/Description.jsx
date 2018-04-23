import React from 'react';

// Description app
export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'RICH TABLE',
      type: 'Rustic Northern Californian restaurant',
      foodScore: '4.6',
      decorScore: '4.0',
      serviceScore: '4.4',
      descriptionBody: `'Inventive” yet “approachable”, this Hayes Valley “destination” by Evan and Sarah Rich “wows” with its “unique”, “delectable” Californian dishes matched by a “killer wine list” and “warm” service in a minimalist (and “loud”) space adorned with salvaged barn wood; it's “hard to get into” (though walk-ins can sit at the bar or the communal table) and the “pricey”, “locally sourced” menu “changes” often, but “if the stars align, you will leave sockless`,
    };
    this.fetchReviews = this.fetchReviews.bind(this)

  }
  componentDidMount() {
    this.fetchReviews();

  }

  fetchReviews() {
    let context = this;
    axios.get('/api')
    .then(({data}) => {
      console.log('data', data)
      this.setState({
        title: data.name,
      })
    })
  }

  render() {
    return (
      <div className="reviews-container">
        <div className="description-title">{this.state.title}</div>
        <div className="description-type">{this.state.type}</div>
        <div className="description-details-container">
          <div className="description-details">New American</div><div className='desription-details-seperator'>·</div>
          <div className="description-details">Hayes Valley</div><div className='desription-details-seperator'>·</div>
          <div className="description-details">$$$</div>
        </div>

        <div className="description-divider"></div>
        <div className="description-apateez-header">THE APATEEZ REVIEW</div>
        <div className="description-ratings-container">
          <div className="description-ratings-food">{this.state.foodScore}
            <div className="description-ratings-label">FOOD</div>
          </div>
          <div className="description-ratings-decor">{this.state.decorScore}
            <div className="description-ratings-label">DECOR</div>
          </div>
          <div className="description-ratings-service">{this.state.serviceScore}
            <div className="description-ratings-label">SERVICE</div>
          </div>
        </div>
        <div className="description-body">{this.state.descriptionBody}
        </div>
      </div>
    );
  }
}

window.Description = Description



ReactDOM.render(
  React.createElement(Description),
  document.getElementById('description')
);
