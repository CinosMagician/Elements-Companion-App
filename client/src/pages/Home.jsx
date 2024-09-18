export default function Home() {
    const audioElement = new Audio("/assets/images/cardArt/sounds/39.mp3");

    function startDelay() {
        // This doesn't really work as the user needs to interact with the page first
        console.log('2 second delay')
        setTimeout(playAudio, 2000); // 2000 milliseconds = 2 seconds
    }

    function playAudio() {
        console.log('playing')
        audioElement.play();
    }

    function handlePlay() {
        console.log('playing')
        audioElement.play();
    }

    window.onload = startDelay;
    return <div>
        <h1 className='titleFont mainTitle'>ElementS the Game</h1>
        <h1 className='titleFont mainTitle'>Companion App</h1>
        <button onClick={handlePlay}>Play Menu Music</button>
    </div>
}