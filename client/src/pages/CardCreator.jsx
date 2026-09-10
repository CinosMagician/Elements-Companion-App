import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CARD } from "../utils/queries";
import TextWithIcons from '../components/TextWithIcons';
import CardCanvas from '../components/CardCanvas';
import './CardCreator.css';

const CardCreator = () => {
    const { id } = useParams();
    const iconRegex = /\[icon:([^\]]+)\]/g;
    const textareaRef = useRef(null);
    const textareaRefUpped = useRef(null);

    const [card, setCard] = useState({
        name: 'Custom Card',
        text: "",
        hasFlavourText: false,
        imageUrl: '/assets/images/cardArt/346.jpeg',
        element: 'None',
        cost: 0,
        type: 'Creature',
        attack: 0,
        health: 0
    });

        const [cardUpped, setCardUpped] = useState({
        name: 'Upgraded Custom Card',
        text: "",
        hasFlavourText: false,
        isUpped: true,
        imageUrl: '/assets/images/cardArt/346.jpeg',
        element: 'None',
        cost: 0,
        type: 'Creature',
        attack: 0,
        health: 0
    });

    // Insert [icon:name] at current cursor position
    const insertIconTag = (iconName) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const before = card.text.slice(0, start);
        const after = card.text.slice(end);

        const newTag = `[icon:${iconName}] `;
        const newText = before + newTag + after;

        setCard({ ...card, text: newText });

        // Set cursor after inserted tag
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + newTag.length;
        }, 0);
    };

        const insertIconTagUpped = (iconName) => {
        const textarea = textareaRefUpped.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const before = cardUpped.text.slice(0, start);
        const after = cardUpped.text.slice(end);

        const newTag = `[icon:${iconName}] `;
        const newText = before + newTag + after;

        setCardUpped({ ...cardUpped, text: newText });

        // Set cursor after inserted tag
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + newTag.length;
        }, 0);
    };

    // Handle deletion of entire icon tag
    const handleKeyDown = (e) => {
        const textarea = textareaRef.current;
        const pos = textarea.selectionStart;

        if (e.key === 'Backspace' && pos > 0) {
            const before = card.text.slice(0, pos);
            const after = card.text.slice(pos);

            const match = before.match(/\[icon:[a-zA-Z0-9_-]+\]$/);
            if (match) {
                e.preventDefault();
                const newText = before.slice(0, match.index) + after;
                setCard({ ...card, text: newText });

                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = match.index;
                }, 0);
            }
        }

        if (e.key === 'Delete' && pos < card.text.length) {
            const after = card.text.slice(pos);
            const match = after.match(/^\[icon:[a-zA-Z0-9_-]+\]/);
            if (match) {
                e.preventDefault();
                const newText = card.text.slice(0, pos) + after.slice(match[0].length);
                setCard({ ...card, text: newText });

                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = pos;
                }, 0);
            }
        }
    };

        // Handle deletion of entire icon tag
    const handleKeyDownUpped = (e) => {
        const textarea = textareaRefUpped.current;
        const pos = textarea.selectionStart;

        if (e.key === 'Backspace' && pos > 0) {
            const before = cardUpped.text.slice(0, pos);
            const after = cardUpped.text.slice(pos);

            const match = before.match(/\[icon:[a-zA-Z0-9_-]+\]$/);
            if (match) {
                e.preventDefault();
                const newText = before.slice(0, match.index) + after;
                setCardUpped({ ...cardUpped, text: newText });

                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = match.index;
                }, 0);
            }
        }

        if (e.key === 'Delete' && pos < cardUpped.text.length) {
            const after = cardUpped.text.slice(pos);
            const match = after.match(/^\[icon:[a-zA-Z0-9_-]+\]/);
            if (match) {
                e.preventDefault();
                const newText = cardUpped.text.slice(0, pos) + after.slice(match[0].length);
                setCardUpped({ ...cardUpped, text: newText });

                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = pos;
                }, 0);
            }
        }
    };

    return (
        <>
        <h1>Card Creator</h1>
        <div className="card-creator-container">
            <div className="card-canvas">
                <CardCanvas card={card} />
            </div>
            <div className="card-editor">
                <label className='editor-label'>
                    Element:
                    <select
                        value={card.element}
                        onChange={(e) => setCard({ ...card, element: e.target.value })}
                    >
                        <option value="None">None</option>
                        <option value="Darkness">Darkness</option>
                        <option value="Water">Water</option>
                        <option value="Death">Death</option>
                        <option value="Life">Life</option>
                        <option value="Earth">Earth</option>
                        <option value="Aether">Aether</option>
                        <option value="Fire">Fire</option>
                        <option value="Air">Air</option>
                        <option value="Gravity">Gravity</option>
                        <option value="Entropy">Entropy</option>
                        <option value="Time">Time</option>
                        <option value="Light">Light</option>
                    </select>
                </label>
                <label className='editor-label'>
                    Name:
                    <input
                        type="text"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                    />
                </label>
                <label className='editor-label'>
                    Cost:
                    <input
                        type="number"
                        min="0"
                        max="99"
                        value={card.cost}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(99, Number(e.target.value)));
                            setCard({ ...card, cost: value });
                        }}
                    />
                </label>
                <label className='editor-label'>
                    Type:
                    <select
                        value={card.type}
                        onChange={(e) => setCard({ ...card, type: e.target.value })}
                    >
                        <option value="Creature">Creature</option>
                        <option value="Spell">Spell</option>
                        <option value="Permanent">Permanent</option>
                    </select>
                </label>
                <div className='editor-group'>
                    <label className='editor-sublabel'>
                        Attack:
                        <input
                            type="number"
                            className='sub-label'
                            min="0"
                            max="99"
                            value={card.attack}
                            onChange={(e) => {
                                const value = Math.max(0, Math.min(99, Number(e.target.value)));
                                setCard({ ...card, attack: value });
                            }}
                        />
                    </label>
                    <label className='editor-sublabel'>
                        Health:
                        <input
                            type="number"
                            className='sub-label'
                            min="0"
                            max="99"
                            value={card.health}
                            onChange={(e) => {
                                const value = Math.max(0, Math.min(99, Number(e.target.value)));
                                setCard({ ...card, health: value });
                            }}
                        />
                    </label>
                </div>
                <label className='editor-label'>
                    Is the text flavour text?:
                    <input
                        type="checkbox"
                        checked={card.hasFlavourText}
                        onChange={(e) => setCard({ ...card, hasFlavourText: e.target.checked })}
                    />
                </label>
                <label className='editor-label'>
                    Text:
                    <textarea
                        ref={textareaRef}
                        className='text-area-input'
                        value={card.text}
                        onChange={(e) => setCard({ ...card, text: e.target.value })}
                        onKeyDown={handleKeyDown}
                        rows={4}
                        cols={60}
                    />
                </label>
                <div className="icon-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Insert Icons:</strong>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('chromasmall')}><img src="/assets/images/icons/chromasmall.png" alt="chroma" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('darknesssmall')}><img src="/assets/images/icons/darknesssmall.png" alt="darkness" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('watersmall')}><img src="/assets/images/icons/watersmall.png" alt="water" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('deathsmall')}><img src="/assets/images/icons/deathsmall.png" alt="death" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('lifesmall')}><img src="/assets/images/icons/lifesmall.png" alt="life" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('earthsmall')}><img src="/assets/images/icons/earthsmall.png" alt="earth" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('aethersmall')}><img src="/assets/images/icons/aethersmall.png" alt="aether" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('firesmall')}><img src="/assets/images/icons/firesmall.png" alt="fire" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('airsmall')}><img src="/assets/images/icons/airsmall.png" alt="air" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('gravitysmall')}><img src="/assets/images/icons/gravitysmall.png" alt="gravity" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('entropysmall')}><img src="/assets/images/icons/entropysmall.png" alt="entropy" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('timesmall')}><img src="/assets/images/icons/timesmall.png" alt="time" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTag('lightsmall')}><img src="/assets/images/icons/lightsmall.png" alt="light" /></button>
                </div>
                <label className='editor-label'>
                    Image URL:
                    <input
                        type="text"
                        value={card.imageUrl}
                        style={{maxWidth: "400px", width: "100%"}}
                        onChange={(e) => setCard({ ...card, imageUrl: e.target.value })}
                    />
                </label>
            </div>
        </div>
        <h2 style={{fontSize: "3.2em"}}>Upgraded Card</h2>
        <div className="card-creator-container">
            <div className="card-canvas">
                <CardCanvas card={cardUpped} />
            </div>
            <div className="card-editor">
                <label className='editor-label'>
                    Element:
                    <select
                        value={cardUpped.element}
                        onChange={(e) => setCardUpped({ ...cardUpped, element: e.target.value })}
                    >
                        <option value="None">None</option>
                        <option value="Darkness">Darkness</option>
                        <option value="Water">Water</option>
                        <option value="Death">Death</option>
                        <option value="Life">Life</option>
                        <option value="Earth">Earth</option>
                        <option value="Aether">Aether</option>
                        <option value="Fire">Fire</option>
                        <option value="Air">Air</option>
                        <option value="Gravity">Gravity</option>
                        <option value="Entropy">Entropy</option>
                        <option value="Time">Time</option>
                        <option value="Light">Light</option>
                    </select>
                </label>
                <label className='editor-label'>
                    Name:
                    <input
                        type="text"
                        value={cardUpped.name}
                        onChange={(e) => setCardUpped({ ...cardUpped, name: e.target.value })}
                    />
                </label>
                <label className='editor-label'>
                    Cost:
                    <input
                        type="number"
                        min="0"
                        max="99"
                        value={cardUpped.cost}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(99, Number(e.target.value)));
                            setCardUpped({ ...cardUpped, cost: value });
                        }}
                    />
                </label>
                <label className='editor-label'>
                    Type:
                    <select
                        value={cardUpped.type}
                        onChange={(e) => setCardUpped({ ...cardUpped, type: e.target.value })}
                    >
                        <option value="Creature">Creature</option>
                        <option value="Spell">Spell</option>
                        <option value="Permanent">Permanent</option>
                    </select>
                </label>
                <div className='editor-group'>
                    <label className='editor-sublabel'>
                        Attack:
                        <input
                            type="number"
                            className='sub-label'
                            min="0"
                            max="99"
                            value={cardUpped.attack}
                            onChange={(e) => {
                                const value = Math.max(0, Math.min(99, Number(e.target.value)));
                                setCardUpped({ ...cardUpped, attack: value });
                            }}
                        />
                    </label>
                    <label className='editor-sublabel'>
                        Health:
                        <input
                            type="number"
                            className='sub-label'
                            min="0"
                            max="99"
                            value={cardUpped.health}
                            onChange={(e) => {
                                const value = Math.max(0, Math.min(99, Number(e.target.value)));
                                setCardUpped({ ...cardUpped, health: value });
                            }}
                        />
                    </label>
                </div>
                <label className='editor-label'>
                    Is the text flavour text?:
                    <input
                        type="checkbox"
                        checked={cardUpped.hasFlavourText}
                        onChange={(e) => setCardUpped({ ...cardUpped, hasFlavourText: e.target.checked })}
                    />
                </label>
                <label className='editor-label'>
                    Text:
                    <textarea
                        ref={textareaRefUpped}
                        className='text-area-input'
                        value={cardUpped.text}
                        onChange={(e) => setCardUpped({ ...cardUpped, text: e.target.value })}
                        onKeyDown={handleKeyDownUpped}
                        rows={4}
                        cols={60}
                    />
                </label>
                <div className="icon-buttons" style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Insert Icons:</strong>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('chromasmall')}><img src="/assets/images/icons/chromasmall.png" alt="chroma" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('darknesssmall')}><img src="/assets/images/icons/darknesssmall.png" alt="darkness" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('watersmall')}><img src="/assets/images/icons/watersmall.png" alt="water" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('deathsmall')}><img src="/assets/images/icons/deathsmall.png" alt="death" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('lifesmall')}><img src="/assets/images/icons/lifesmall.png" alt="life" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('earthsmall')}><img src="/assets/images/icons/earthsmall.png" alt="earth" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('aethersmall')}><img src="/assets/images/icons/aethersmall.png" alt="aether" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('firesmall')}><img src="/assets/images/icons/firesmall.png" alt="fire" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('airsmall')}><img src="/assets/images/icons/airsmall.png" alt="air" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('gravitysmall')}><img src="/assets/images/icons/gravitysmall.png" alt="gravity" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('entropysmall')}><img src="/assets/images/icons/entropysmall.png" alt="entropy" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('timesmall')}><img src="/assets/images/icons/timesmall.png" alt="time" /></button>
                    <button style={{padding: '0px', display: 'flex'}} type="button" onClick={() => insertIconTagUpped('lightsmall')}><img src="/assets/images/icons/lightsmall.png" alt="light" /></button>
                </div>
                <label className='editor-label'>
                    Image URL:
                    <input
                        type="text"
                        value={cardUpped.imageUrl}
                        style={{maxWidth: "400px", width: "100%"}}
                        onChange={(e) => setCardUpped({ ...cardUpped, imageUrl: e.target.value })}
                    />
                </label>
            </div>
        </div>
        <div style={{paddingBottom: "20px"}}>
            <button onClick={() => {
                setCard({
                    name: 'Custom Card',
                    text: "",
                    hasFlavourText: false,
                    imageUrl: '/assets/images/cardArt/346.jpeg',
                    element: 'None',
                    cost: 0,
                    type: 'Creature',
                    attack: 0,
                    health: 0
                });
                setCardUpped({
                    name: 'Upgraded Custom Card',
                    text: "",
                    hasFlavourText: false,
                    isUpped: true,
                    imageUrl: '/assets/images/cardArt/346.jpeg',
                    element: 'None',
                    cost: 0,
                    type: 'Creature',
                    attack: 0,
                    health: 0
                });
            }}>Reset Cards</button>
        </div>
        </>
    );
};

export default CardCreator;
