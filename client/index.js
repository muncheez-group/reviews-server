import Reviews from './components/Reviews.jsx';
import Description from './components/Description.jsx';

ReactDOM.render(
  React.createElement(Reviews),
  document.getElementById('reviews')
);

ReactDOM.render(
  React.createElement(Description),
  document.getElementById('description')
);
