import Button from './Button'
import PropTypes from 'prop-types'


const Header = ({title, onAdd, showAdd, onLogOut, firstName }) => {
  // console.log(firstName)


  return (
    <div>
    <header className='header'>
      <h1>{`${firstName}'s To-Do List`}</h1>
      <Button 
        color={showAdd ? 'red' : 'green'} 
        text={showAdd ? 'Close' : 'Add Task'} 
        onClick={onAdd} />
      <Button 
        color='gray' 
        text='Log Out'
        onClick={onLogOut} />
      {/* <Button
        color='black'
        text='Edit Profile'
        // onClick={}
        /> */}
    </header>
    </div>
  )
}

// Header.defaultProps = {
//   title: `${firstName}'s To-Do List`
// }
Header.propTypes = {
  title: PropTypes.string,
}

export default Header
