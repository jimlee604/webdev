import {
    useNavigate
  } from "react-router-dom";

const HomeScreenComponent = () => {
    const navigate = useNavigate();
    return (
      <body style={{ backgroundColor: '#e38578' }}>
        <div className='height_10vh'></div>
        <div className='center'>
          <div>
            <h1 className='text_align_center'>Welcome to <b>Flesh and Blood LITE</b></h1>
            <div className='height_30vh'></div>
            <div className='center'>
              <button onClick={() => navigate('/game')} className='start_button'>Play Game</button>
            </div>
          </div>
        </div>
      </body>
    );
}

export default HomeScreenComponent;
    