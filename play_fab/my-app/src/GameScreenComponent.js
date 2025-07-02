import FABCardComponent from "./FABCardComponent";

const GameScreenComponent = () => {
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh'></div>
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                    </div>
                </div>
            </div>
                <div className="height_30vh"></div>
            <div className="center">
                <div>
                    <div className="hflex">
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                    </div>
                </div>
            </div>
        </body>
    );
}

export default GameScreenComponent;
