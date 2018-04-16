import React from 'react';
import Review from './Review.jsx';
import { Modal } from 'react-materialize';


// Reviews app
export default class Reviews extends React.Component {
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
        rating: data.rating,
      })
    })
  }
   generateStars(num) {
     num = Math.floor(num)
     var star = '★';
     var emptyStar ='☆';
     var result = '';
     for (var i = 0; i < 5; i++) {
       if (i<num) {
         result += star;
       } else {
         result += emptyStar;
       }
     }
     return result;
   }

   render() {
     var stars = this.generateStars(this.state.rating) // Add stars to reviews
     var shortReviewArr = this.state.reviewList.slice(0,3); // Return first 3 reviews only

     return (
       <div className="reviews-container">
         <div className="reviews-title">
           <div className="reviews-title-google">GOOGLE REVIEWS</div>
           <div className="reviews-title-stars">{this.state.rating} {stars}</div>
         </div>
         {shortReviewArr.map((review, index) =>
           <Review
           key={index}
           review={review}
           />
         )}
       <div className='review-container-footer'>
         <Modal
          trigger={<button className="reviews-footer-btn">MORE REVIEWS</button>}>
          <div className='modal-container'>
            <div className="reviews-title">
              <div ref={subtitle => this.subtitle = subtitle} className="reviews-title-google">GOOGLE REVIEWS</div>
              <div className="reviews-title-stars">{this.state.rating}★★★★</div>
            </div>
            {this.state.reviewList.map((review, index) =>
              <Review
              key={index}
              review={review}
              />
            )}
            <div className='review-container-footer'>
              <div className="reviews-modal-footer"><center>END OF RESULTS</center></div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
    );
   }
 }

 window.Reviews = Reviews
