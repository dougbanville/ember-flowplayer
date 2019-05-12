# ember-flowplayer

Plays HLS audio using Flowplayer

## Installation

```
ember install ember-flowplayer
```

## Usage

```
<EmberFlowplayer @source="https://cdn.rasset.ie/hls-radio/ieradio1/playlist.m3u8" @audioId="9" @model={{ model }}>
    {{model.fields.progname }}
</EmberFlowplayer>
```

## Live or playback

- @audioId : If < 100 then audio is treated as live (emberFlowplayer.isLive).

* Live Range : If emberFlowplayer.isLive then a live range is made using the emberFlowplayer.nowPlaying.duration (in seconds eg 1 hour - 3600) and emberFlowplayer.nowPlaying.start - UTC date

* @Duration

### Services

- emberFlowplayer - isLive | isPlaying
- emberFlowplayer.nowPlaying - where you store playback information. TODO model schema
- emberFlowplayer.player - gives you acces to most of the [Flowplayer API](https://flowplayer.com/help/player/flowplayer-7/api)

## License

You need a licence for flowplayer. This project is licensed under the [MIT License](LICENSE.md).
