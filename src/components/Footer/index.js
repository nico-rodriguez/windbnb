import './Footer.css';

export default function Footer({ isInactive }) {
  return (
    <footer className={'footer' + (isInactive ? ' footer--inactive' : '')}>
      created by{' '}
      <a
        className='footer__link'
        href='https://github.com/nico-rodriguez/windbnb'
      >
        nico-rodriguez
      </a>{' '}
      -{' '}
      <a className='footer__link' href='https://devchallenges.io/'>
        devChallenges.io
      </a>
    </footer>
  );
}
