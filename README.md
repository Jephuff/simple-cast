# Simple Cast  

simplified api for quickly sending files to chromecast.

## Usage

```js
import chromecast from 'simple-cast';
chromecast.play('http://url/of/file');
```

## API

#### getDuration
`getDuration(): number`  
returns the duration of the currently casting file.  

example:
```js
import chromecast from 'simple-cast';
chromecast.getduration();
```

#### getCurrentFile
`getCurrentFile(): string`  
returns the currently casting file.  

example:
```js
import chromecast from 'simple-cast';
chromecast.getCurrentFile();
```

#### play
`play(file?: string, fromTime?: number): void`  

plays or resumes of a file from the beginning or specified location.

example:
```js
import chromecast from 'simple-cast';

chromecast.play('http://url/of/file'); // plays file from the beginning
chromecast.play('http://url/of/file', 100); // plays file from 100 seconds
chromecast.play(); // resume playing current file
```

#### pause
`pause(): void`  
pause playback

example:
```js
import chromecast from 'simple-cast';

chromecast.pause(); // resume playing current file
```

#### seek
`seek(position: number): void`  
seek in current file

example:
```js
import chromecast from 'simple-cast';

chromecast.seek(100); // seek in file to 100 seconds
```

#### stop
`stop(): void`
stop casting the current file

example:
```js
import chromecast from 'simple-cast';

chromecast.stop();
```

#### setSubtitles
`setSubtitles(active: boolean): void`
turn on or off the subtitls (currently only supports `.vtt` format that is in the same location and has the same name as the current file)  

example:
```js
import chromecast from 'simple-cast';

chromecast.setSubtitles(true); // turn on subtitles
```
  
## Events
`simple-cast` is also an eventemitter. 
```js
import chromecast from 'simple-cast';

chromecast.on('PLAY', function() {
    // code to run on start of media playing.
});
```
### BUFFERING
data: `void`  
emitted when media begins buffering

### IDLE
data: `void`  
emitted when media becomes idle

### PLAYING
data: `void`  
emitted when media starts playing

### PAUSED
data: `void`  
emitted when media is paused

### PROGRESS
data: `number`  
emitted when current position in media changes. Passed the current position.

### DURATION
data: `number`  
emitted when the duration of the current media changes

### FINISHED
data: `string`  
emited when media finishes playing (not stopped or paused). Passed the file

### DISCONNECT
data: `void`  
emitted when player is disconnected from the chromecast.

