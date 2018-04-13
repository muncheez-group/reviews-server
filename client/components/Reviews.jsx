import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


// Reviews app
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      reviewList: [],
      rating: '',
    };
    this.fetchReviews = this.fetchReviews.bind(this)
    // Modal Stuff
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.fetchReviews();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  fetchReviews() {
    let context = this;
    axios.get('/api')
    .then(({data}) => {
      // console.log('data', data)
      this.setState({
        reviewList: data.reviews,
        rating: data.rating
      })
    })
  }
   generateStars(num) {
     num = Math.floor(num)
     var star = '★';
     var emptyStar ='☆'
     var result = '';
     for (var i = 0; i < 5; i++) {
       if (i<num) {
         result += star;
       } else {
         result += emptyStar;
       }
     }
     return result
   }



  render() {
    var stars = this.generateStars(this.state.rating)
    return (
      <div className="reviews-container">
        <div className="reviews-title">
          <div className="reviews-title-google">GOOGLE REVIEWS</div>
          <div className="reviews-title-stars">{this.state.rating} {stars}</div>
        </div>
        {this.state.reviewList.map((review, index) =>
          <Review
          key={index}
          review={review}
          />
        )}
      <div className='review-container-footer'>
        <button onClick={this.openModal} className="reviews-footer-btn">MORE REVIEWS</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          reviewList={this.state.reviewList}
        >
        <div className='reviews-container'>
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
              <div className="reviews-modal-footer">END OF RESULTS</div>
            </div>
          </div>

        </Modal>
      </div>
    </div>
    );
  }
}


class Review extends React.Component {
 constructor(props) {
   super(props);

 }

 generateStars(num) {
   num = Math.floor(num)
   var star = '★';
   var emptyStar ='☆'
   var result = '';
   for (var i = 0; i < 5; i++) {
     if (i<num) {
       result += star;
     } else {
       result += emptyStar;
       console.log(result)
     }
   }
   return result
 }


 render() {
   var review = this.props.review[0]
   var stars = this.generateStars(review.rating)

   return (
     <div className="review-container">
       <div className="review-profile-pic">
       <img src={review.profile_photo_url} width={70} height={70}/>
       </div>
       <div className="review-column">
         <div className="review-column-name">{review.author_name}</div>
         <div className="review-column-date">{review.relative_time_description}</div>
         <div className="review-column-text">{stars}  {review.text}
         </div>
       </div>
   </div>
   )
 }
}




















//Stateless review
// const Review = ({review}) => (
//   <div className="review-container">
//     <div className="review-profile-pic">
//     <img src={review[0].profile_photo_url} width={70} height={70}/>
//     </div>
//     <div className="review-column">
//       <div className="review-column-name">{review[0].author_name}</div>
//       <div className="review-column-date">{review[0].relative_time_description}</div>
//       <div className="review-column-text">{review[0].rating}★  {review[0].text}
//       </div>
//     </div>
// </div>)
