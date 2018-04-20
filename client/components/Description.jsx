import React from 'react';

// Description app
export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="reviews-container">
        <div className="description-title">RICH TABLE</div>
        <div className="description-type">Rustic Northern Californian restaurant</div>
        <div className="description-details">New American · Hayes Valley · $$$</div>
        <div className="description-divider"></div>
        <div className="description-apateez-header">THE APATEEA REVIEW</div>
        <div className="description-ratings-container">
          <div className="description-ratings-food">4.6 FOOD</div>
          <div className="description-ratings-decor">4.0 DECOR</div>
          <div className="description-ratings-service">4.4 SERVICE</div>
        </div>
        <div className="description-body">LOTS OF STUFF HERE</div>
      </div>
    );
  }
}

window.Description = Description



ReactDOM.render(
  React.createElement(Description),
  document.getElementById('description')
);
