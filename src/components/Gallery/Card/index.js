import './Card.css';

export default function Card({ stay }) {
  const { superHost, title, rating, type, beds, photo } = stay;

  return (
    <section className='card'>
      <figure>
        <img className='card__image' src={photo} alt={title} />
      </figure>
      <div className='card__text'>
        {superHost && <div className='superhost'>SuperHost</div>}
        <div className='specs'>
          {type}
          {/* If there's information about beds, display it as 1 bed, 2 beds, etc. */}
          {beds ? ` . ${beds} bed${beds > 1 ? 's' : ''}` : ''}
        </div>
        <div className='rating'>
          <span className='material-symbols-outlined'>star</span>
          {rating}
        </div>
        <h3 className='title'>{title}</h3>
      </div>
    </section>
  );
}
