import Button from './Button'
import PropTypes from 'prop-types'


const Header = ({title, onAdd, showAdd}) => {
  const onClick = (e) => {
    console.log(e);
  }

  return (
    <div>
    <header className='header'>
      <h1>{title}</h1>
      <Button 
        color={showAdd ? 'red' : 'green'} 
        text={showAdd ? 'Close' : 'Add'} 
        onClick={onAdd} />
    </header>
    </div>
  )
}

Header.defaultProps = {
  title: 'Allies To-Do List'
}
Header.propTypes = {
  title: PropTypes.string,
}

export default Header
