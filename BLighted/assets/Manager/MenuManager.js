const Emitter = require('EventEmitter');
const Key = require('EventCode');
//define value below
const data = {
    config:'menu config'
}
cc.Class({
    extends: cc.Component,

    properties: {
        mainMenu:cc.Node,
        settingPopup:cc.Node,
    },

    onStartGame(){
        cc.director.loadScene('Name', ()=>{
            Emitter.instance.emit('nameEvent', data);
        });
    },
    onSetting(){
        Emitter.instance.emit(Key.POPUP_SHOW, this.settingPopup);
    },

    onBackMenu(){
        Emitter.instance.emit(Key.POPUP_HIDE, this.settingPopup);
    }
});
