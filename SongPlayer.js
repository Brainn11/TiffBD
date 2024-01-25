function midiNoteToFrequency(midiNote) {
    // MIDI note to frequency conversion formula
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function playMusic(notes) {
    // Create an audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Get the current time
    const currentTime = audioContext.currentTime;
    
    // Iterate through the notes and schedule the playback
    notes.forEach((note) => {
        const frequency = midiNoteToFrequency(note.midiNote);
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(frequency, currentTime + note.startTime);

        gainNode.gain.setValueAtTime(0, currentTime + note.startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, currentTime + note.startTime + 0.01); // Fade in
        gainNode.gain.linearRampToValueAtTime(0, currentTime + note.startTime + note.duration - 0.01); // Fade out

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Start the oscillator
        oscillator.start(currentTime + note.startTime);
        setTimeout(() => showNote(note.midiNote), (currentTime + note.startTime) * 1000);

        // Stop the oscillator after the specified duration
        oscillator.stop(currentTime + note.startTime + note.duration);
        setTimeout(() => hideNote(note.midiNote), (currentTime + note.startTime + note.duration) * 1000);
    });
}
