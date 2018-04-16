import React from 'react';
import { Button, Icon, Card, Row, Col, Modal } from 'react-materialize';

export default class Review extends React.Component {
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
  )}
}


window.Review = Review
