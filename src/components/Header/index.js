import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import './Header.css';
import logo from './logo.svg';

export default function Header({
  locations,
  setLocation,
  setGuests,
  setIsInactive,
}) {
  // Control whether the header is open or closed
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);
  const [isGuestsFilterOpen, setIsGuestsFilterOpen] = useState(false);
  // Values used in the current search
  const [adultGuestsSearch, setAdultGuestsSearch] = useState(0);
  const [childGuestsSearch, setChildGuestsSearch] = useState(0);
  const [locationSearch, setLocationSearch] = useState(null);
  // Values used in the filters (may be reset if the user clicks outside of the header)
  const [adultGuestsFilter, setAdultGuestsFilter] = useState(0);
  const [childGuestsFilter, setChildGuestsFilter] = useState(0);
  const [locationFilter, setLocationFilter] = useState(null);

  const isOpen = isGuestsFilterOpen || isLocationFilterOpen;
  const totalGuests = adultGuestsFilter + childGuestsFilter;

  const handleRemoveAdult = () => {
    setAdultGuestsFilter((adultGuestsFilter) =>
      adultGuestsFilter > 0 ? adultGuestsFilter - 1 : 0
    );
  };

  const handleAddAdult = () => {
    setAdultGuestsFilter((adultGuestsFilter) => adultGuestsFilter + 1);
  };

  const handleRemoveChild = () => {
    setChildGuestsFilter((childGuestsFilter) =>
      childGuestsFilter > 0 ? childGuestsFilter - 1 : 0
    );
  };

  const handleAddChild = () => {
    setChildGuestsFilter((childGuestsFilter) => childGuestsFilter + 1);
  };

  const handleLocationFilter = (location) => () => {
    setLocationFilter(location);
  };

  const closeHeader = () => {
    setIsGuestsFilterOpen(false);
    setIsLocationFilterOpen(false);
    setIsInactive(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Update search values
    setAdultGuestsSearch(adultGuestsFilter);
    setChildGuestsSearch(childGuestsFilter);
    setLocationSearch(locationFilter);
    // Send search values to parent component
    setLocation(locationFilter);
    setGuests(adultGuestsFilter + childGuestsFilter);

    closeHeader();
  };

  const handleHeaderOutsideClick = () => {
    // Reset filter values
    setAdultGuestsFilter(adultGuestsSearch);
    setChildGuestsFilter(childGuestsSearch);
    setLocationFilter(locationSearch);
    // Close the header
    closeHeader();
  };

  const ref = useOutsideClick(handleHeaderOutsideClick);

  if (!isOpen) {
    return (
      <header className='header--closed'>
        <img src={logo} alt='logo' />
        <menu className='menu'>
          <div
            onClick={() => {
              setIsLocationFilterOpen(true);
              setIsInactive(true);
            }}
            className={
              'menu__location' +
              (locationFilter ? ' menu__location--active' : '')
            }
          >
            {locationFilter ?? 'Add location'}
          </div>
          <div
            onClick={() => {
              setIsGuestsFilterOpen(true);
              setIsInactive(true);
            }}
            className={
              'menu__guests' + (totalGuests > 0 ? ' menu__guests--active' : '')
            }
          >
            {totalGuests > 0
              ? `${totalGuests} guest` + (totalGuests > 1 ? 's' : '')
              : 'Add guests'}
          </div>
          <button className='menu__search-button'>
            <span className='material-symbols-outlined'>search</span>
          </button>
        </menu>
      </header>
    );
  } else {
    return (
      <header className='header--opened' ref={ref}>
        <form className='form'>
          <div
            className='form__item'
            onClick={() => {
              setIsLocationFilterOpen(true);
              setIsGuestsFilterOpen(false);
              setIsInactive(true);
            }}
          >
            <div className='input-menu'>
              <div className='input-menu__label'>Location</div>
              <div
                className={
                  'input-menu__content' +
                  (locationFilter ? ' input-menu__content--active' : '')
                }
              >
                {locationFilter ?? 'Add location'}
              </div>
            </div>
            <div
              className={
                'input-list location-filter' +
                (isLocationFilterOpen ? ' location-filter--active' : '')
              }
            >
              {locations.map((location) => (
                <div
                  onClick={handleLocationFilter(location)}
                  className='input-list__option'
                  key={location}
                >
                  <span className='material-symbols-outlined'>pin_drop</span>
                  {location}
                </div>
              ))}
            </div>
          </div>
          <div
            className='form__item'
            onClick={() => {
              setIsGuestsFilterOpen(true);
              setIsLocationFilterOpen(false);
              setIsInactive(true);
            }}
          >
            <div className='input-menu'>
              <div className='input-menu__label'>Guests</div>
              <div
                className={
                  'input-menu__content' +
                  (totalGuests > 0 ? ' input-menu__content--active' : '')
                }
              >
                {totalGuests > 0
                  ? `${totalGuests} guest` + (totalGuests > 1 ? 's' : '')
                  : 'Add guests'}
              </div>
            </div>
            <div
              className={
                'input-list guests-filter' +
                (isGuestsFilterOpen ? ' guests-filter--active' : '')
              }
            >
              <div className='input-item'>
                <div className='input-item__label'>Adults</div>
                <div className='input-item__description'>Ages 13 or above</div>
                <div className='input-item__controls'>
                  <button type='button' onClick={handleRemoveAdult}>
                    -
                  </button>
                  <span>{adultGuestsFilter}</span>
                  <button type='button' onClick={handleAddAdult}>
                    +
                  </button>
                </div>
              </div>
              <div className='input-item'>
                <div className='input-item__label'>Children</div>
                <div className='input-item__description'>Ages 2-12</div>
                <div className='input-item__controls'>
                  <button type='button' onClick={handleRemoveChild}>
                    -
                  </button>
                  <span>{childGuestsFilter}</span>
                  <button type='button' onClick={handleAddChild}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type='submit' onClick={handleSearch} className='form__button'>
            <span className='material-symbols-outlined'>search</span>Search
          </button>
        </form>
      </header>
    );
  }
}
