code = "function midiNoteToFrequency(midiNote) {\n    // MIDI note to frequency conversion formula\n    return 440 * Math.pow(2, (midiNote - 69) / 12);\n}\n\nfunction playMusic(notes) {\n    // Create an audio context\n    const audioContext = new (window.AudioContext || window.webkitAudioContext)();\n\n    // Get the current time\n    const currentTime = audioContext.currentTime;\n    \n    // Iterate through the notes and schedule the playback\n    notes.forEach((note) => {\n        const frequency = midiNoteToFrequency(note.midiNote);\n        const oscillator = audioContext.createOscillator();\n        const gainNode = audioContext.createGain();\n\n        // Set up oscillator\n        oscillator.type = 'triangle';\n        oscillator.frequency.setValueAtTime(frequency, currentTime + note.startTime);\n        \n        // Set up gain\n        gainNode.gain.setValueAtTime(0, currentTime + note.startTime);\n        gainNode.gain.linearRampToValueAtTime(0.2, currentTime + note.startTime + 0.01); // Fade in\n        gainNode.gain.linearRampToValueAtTime(0, currentTime + note.startTime + note.duration - 0.01); // Fade out\n\n        // Connect nodes\n        oscillator.connect(gainNode);\n        gainNode.connect(audioContext.destination);\n\n        // Start the oscillator\n        oscillator.start(currentTime + note.startTime);\n\n        // Stop the oscillator after the specified duration\n        oscillator.stop(currentTime + note.startTime + note.duration);\n    });\n}\n";