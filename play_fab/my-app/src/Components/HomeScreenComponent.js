import { useNavigate } from "react-router-dom";

const HomeScreenComponent = () => {
    const navigate = useNavigate();
    return (
      <div className="full-background-container" style={{ backgroundColor: '#e38578' }}>
        <div className='height_10vh'></div>
        <div className='center'>
          <div>
            <h1 className='text_align_center'>Welcome to</h1>
            <h1 className='text_align_center'><b>Flesh and Blood LITE</b></h1>
            <div className='height_30vh'></div>
            <div className='center'>
              <button onClick={() => navigate('/game')} className='start_button'>Play Game</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HomeScreenComponent;
    