import React from 'react';
import Review from './Review.jsx';
import Description from './Description.jsx';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(16,24,32,.95)',
    },
    content: {
      animationName: 'modalFade',
      animationDuration: '.3s',
      position: 'absolute',
      top: '50px',
      left: '20%',
      right: '40px',
      bottom: '40px',
      border: '0px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '0px',
      maxWidth: '60%',
    }
  }

// Reviews app
export default class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewList: [],
      rating: '',
      modalIsOpen: false,
    };
    this.fetchReviews = this.fetchReviews.bind(this)
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
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  fetchReviews() {
    let context = this;
    axios.get('/api/restaurants/:id')
    .then(({data}) => {
      // console.log('data', data)
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
       <div>
         <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          >
          <div className='reviews-modal-container'>
            <div className="reviews-title">
              <div ref={subtitle => this.subtitle = subtitle} className="reviews-title-google">GOOGLE REVIEWS</div>
              <div className="reviews-title-stars">{this.state.rating}  {stars}</div>
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
           <button className='reviews-footer-btn' onClick={this.openModal}>MORE REVIEWS</button>
        </div>
      </div>
    </div>
    );
   }
 }
 window.Reviews = Reviews

 ReactDOM.render(
   React.createElement(Reviews),
   document.getElementById('reviews')
 );
