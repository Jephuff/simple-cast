# Simple Cast  

simplified api for quickly sending files to chromecast.

## Usage

```js
import simpleCast from 'simple-cast';
simpleCast.send('http://url/of/file');
```

## API

#### currentDuration
`currentDuration(): Promise<number>`  
returns a promise that resolves to the duration of the currently casting file.  

example:
```js
import simpleCast from 'simple-cast';
simpleCast.currentDuration();
```

#### currentFile
`currentFile(): Promise<string>`  
returns a promise that resolves to the currently casting file.  

example:
```js
import simpleCast from 'simple-cast';
simpleCast.currentFile();
```

#### send
`send(file: string, fromTime?: number, subtitleFile?: string): Promise<void>`  

sends a file from the beginning or specified time. 

example:
```js
import simpleCast from 'simple-cast';

simpleCast.send('http://url/of/file'); // sends file from the beginning
simpleCast.send('http://url/of/file', 100); // sends file from 100 seconds
```

#### pause
`pause(): Promise<void>`  
pause playback

example:
```js
import simpleCast from 'simple-cast';

simpleCast.pause(); // resume playing current file
```

#### play
`play(): Promise<void>`  
resume playback

example:
```js
import simpleCast from 'simple-cast';

simpleCast.play(); // resume playing current file
```

#### seek
`seek(position: number): Promise<void>`  
seek in current file

example:
```js
import simpleCast from 'simple-cast';

simpleCast.seek(100); // seek in file to 100 seconds
```

#### stop
`stop(): Promise<void>`
stop casting the current file

example:
```js
import simpleCast from 'simple-cast';

simpleCast.stop();
```

#### setSubtitleActive
`setSubtitleActive(active: boolean): Promise<void>`
turn on or off the subtitls (currently only supports `.vtt` format that is in the same location and has the same name as the current file)  

example:
```js
import simpleCast from 'simple-cast';

simpleCast.setSubtitleActive(true); // turn on subtitles
```
  
## Events
`simple-cast` is also an eventemitter. 
```js
import simpleCast from 'simple-cast';

simpleCast.on('PLAY', function() {
    // code to run on start of media playing.
});
```
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
emitted when media finishes playing (not stopped or paused). Passed the file

### CURRENT_FILE
data: `string`  
emitted when media changes.

### SUBTITLES_ON
data: `void`  
emitted when subtitles are turned on.

### SUBTITLES_OFF
data: `void`  
emitted when subtitles are turned off.


