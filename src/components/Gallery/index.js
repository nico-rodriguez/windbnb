import Card from './Card';
import './Gallery.css';

export default function Gallery({ stays, country, isInactive }) {
  return (
    <main className={'gallery' + (isInactive ? ' gallery--inactive' : '')}>
      <div className='gallery-header'>
        <h2>{country ? `Stays in ${country}` : 'All stays'}</h2>
        <span>{stays.length} stays</span>
      </div>
      <div className='gallery-content'>
        {stays.map((stay) => (
          <Card stay={stay} key={stay.title} />
        ))}
      </div>
    </main>
  );
}
