const Emitter = require('EventEmitter');
const Key = require('EventCode');
cc.Class({
    extends: cc.Component,
    properties: {
        mMusicSound:cc.AudioSource,
        mSfxSound:cc.AudioSource,
    },

    onLoad(){
        Emitter.instance.registerEvent(Key.PLAY_MUSIC, this.playMusic.bind(this))
        Emitter.instance.registerEvent(Key.PLAY_SFX, this.playSfx.bind(this))
        Emitter.instance.registerEvent(Key.CHANGE_VOLUME, this.changeVolume.bind(this))
        Emitter.instance.registerEvent(Key.MUTE_SFX, this.muteSfx.bind(this))
        Emitter.instance.registerEvent(Key.TURN_ON_MUSIC, this.turnOnMusic.bind(this))
        Emitter.instance.registerEvent(Key.TURN_OFF_MUSIC, this.turnOffMusic.bind(this))
    },

    playMusic(clip){
        this.mMusicSound.clip = clip;
        this.mMusicSound.play();
    },

    playSfx(clip){
        this.mSfxSound.clip = clip;
        this.mSfxSound.play();
    },

    muteSfx(){
        this.mSfxSound.volume = 0;
    }, 

    changeVolume(volume){
        this.mSfxSound.volume = volume;
    }, 

    turnOnMusic(){
        this.mMusicSound.mute = false;
    },

    turnOffMusic(){
        this.mMusicSound.mute = true;
    }
});
