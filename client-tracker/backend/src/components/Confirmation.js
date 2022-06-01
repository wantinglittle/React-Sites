import './styles/confirmation.css'

const Confirmation = ({open}) => {

  if(!open) return null

  return (
    <section className="modalPage">
        <div className='confContainer'>
        <p className="successMessage">Client was successfully added!</p>
        <div className="confButtonContainer">
            <a href="./addclient"><button>Add another client</button></a>
            <a href="../"><button>Back to search</button></a>
        </div>
        </div>
    </section>
  )
}

export default Confirmation