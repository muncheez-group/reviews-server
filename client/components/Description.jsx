import React from 'react';
import moment from 'moment'


// Reviews app
export default class Description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewList: [],
      rating: '',
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
        reviewList: data.reviews,
        rating: data.rating
      })
    })
  }

  generateStar(num) {
    let star = '★';
    let result = '';
    for (var i = 0; i < num; i++) {
      result += star
    }
    return result;
  }

  render() {
    return (
      <div className="reviews-container">
        <div className="reviews-title">
          <div className="reviews-title-google">GOOGLE REVIEWS</div>
          <div className="reviews-title-stars">{this.state.rating}★★★★</div>
        </div>
        {this.state.reviewList.map((review, index) =>
          <Review
          key={index}
          review={review}
          generateStar={this.generateStar}
          />
        )}
    </div>);
  }
}

//Stateless review
const Review = ({review, generateStar}) => (
  <div className="review-container">
    <div className="review-profile-pic">
    <img src={review[0].profile_photo_url} width={70} height={70}/>
    </div>
    <div className="review-column">
      <div className="review-column-name">{review[0].author_name}</div>
      <div className="review-column-date">{review[0].relative_time_description}</div>
      <div className="review-column-text">{review[0].rating}★  {review[0].text}</div>
    </div>

</div>)
