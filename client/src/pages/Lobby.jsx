import './Lobby.css';

function Lobby() {
    return (
        <div className="lobby">
            <div className="lobby-container">
                <h1>Elements</h1>
                <h2>Game Lobby</h2>

                <div className="lobby-actions">
                    <a className="lobby-button" href="/game">
                        Create Game
                    </a>

                    <button className="lobby-button">
                        Join Game
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Lobby;