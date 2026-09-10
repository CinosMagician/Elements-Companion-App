import { useEffect, useState } from 'react';
import './Game.css';

function Game() {
    const [scale, setScale] = useState(1);
    const quantas = [
        { name: 'Darkness', color: '#2D2D3C' },
        { name: 'Water', color: '#2C2CD9' },
        { name: 'Death', color: '#402C82' },
        { name: 'Life', color: '#1FB729' },
        { name: 'Earth', color: '#73453B' },
        { name: 'Aether', color: '#2CC5AB' },
        { name: 'Fire', color: '#E33B3B' },
        { name: 'Air', color: '#82D9FF' },
        { name: 'Gravity', color: '#D9643B' },
        { name: 'Entropy', color: '#F864FF' },
        { name: 'Time', color: '#EDDE3B' },
        { name: 'Light', color: '#FFFFFF' },
    ];

    function getPlayerData(id) {
    const players = {
        1: {
            deck: [
                'Fireball',
                'Fire Elemental',
                'Phoenix',
            ],
            mark: 'Fire',
        },

        2: {
            deck: [
                'Water Blast',
                'Water Elemental',
                'Kraken',
            ],
            mark: 'Water',
        },
    };

    return players[id];
}

    function createPlayer(id) {
        const playerData = getPlayerData(id);
        const quanta = {};

        quantas.forEach((quantaType) => {
            quanta[quantaType.name] = 4;
        });

        return {
            id,
            hp: 100,
            maxHp: 100,

            quanta,

            deck: playerData.deck,
            hand: [],
            graveyard: [],

            shield: null,
            weapon: null,
            creatures: [],
            permanents: [],

            mark: playerData.mark,
        };
    }

    const player = createPlayer(1);
    const enemy = createPlayer(2);

    useEffect(() => {
        const updateScale = () => {
            const scaleX = window.innerWidth / 1920;
            const scaleY = window.innerHeight / 1080;

            setScale(Math.min(scaleX, scaleY));
        };

        updateScale();

        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    return (
        <div className="game">
            <div
                className="game-board"
                style={{
                    transform: `scale(${scale})`,
                }}
            >
                <div id="enemy-side" className="enemy-side">
                    <div className="hand-area">

                    </div>
                    <div className="play-area">

                    </div>
                    <div className="stats-area">
                        <div className="hp-deck">
                            <div className="deck-zone">
                                <img src={`/assets/images/cardbacks/backcard.png`} alt="Deck Icon" className="deck-icon" />
                                <p className="deck-count">33</p>
                            </div>
                            <div className="hp-zone-enemy">
                                <div className="hp-game-bar">

                                </div>
                                <div className="hp-text-enemy">
                                    <p>HP:</p>
                                    <p id="enemy-hp">{enemy.hp} / {enemy.maxHp}</p>

                                </div>

                            </div>
                        </div>
                        <div className="quanta-cols">
                            {quantas.map((quanta) => (
                                <div key={quanta.name}>
                                    <div className={`quanta-zone ${quanta.name}`}>
                                        <img src={`/assets/images/icons/${quanta.name}.png`} alt="Element Icon" className="stat-icon" />
                                        <div class="quanta-tracker">
                                            {enemy.quanta[quanta.name]}
                                        </div>

                                    </div>
                                        <div className="quanta-bar">
                                            <div 
                                                className="quanta-bar-fill"
                                                style={{
                                                    width: `${Math.min(enemy.quanta[quanta.name] / 75 * 100, 100)}%`,
                                                    '--quanta-colour': quanta.color,
                                                }}>
                                            
                                            </div>
                                        </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="player-side" className="player-side">
                    <div className="stats-area">
                        <div className="quanta-cols">
                            {quantas.map((quanta) => (
                                <div key={quanta.name}>
                                    <div className={`quanta-zone ${quanta.name}`}>
                                        <img src={`/assets/images/icons/${quanta.name}.png`} alt="Element Icon" className="stat-icon" />
                                        <div class="quanta-tracker">
                                            {player.quanta[quanta.name]}
                                        </div>

                                    </div>
                                        <div className="quanta-bar">
                                            <div 
                                                className="quanta-bar-fill"
                                                style={{
                                                    width: `${Math.min(player.quanta[quanta.name] / 75 * 100, 100)}%`,
                                                    '--quanta-colour': quanta.color,
                                                }}>
                                            
                                            </div>
                                        </div>
                                </div>
                            ))}
                        </div>
                        <div className="hp-deck">
                            <div className="hp-zone">
                                <div className="hp-text">
                                    <p>HP:</p>
                                    <p id="player-hp">{player.hp} / {player.maxHp}</p>

                                </div>
                                <div className="hp-game-bar">

                                </div>
                            </div>
                            <div className="deck-zone">
                                <img src={`/assets/images/cardbacks/backcard.png`} alt="Deck Icon" className="deck-icon" />
                                <p className="deck-count">{player.deck.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="play-area">

                    </div>
                    <div className="hand-area">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;