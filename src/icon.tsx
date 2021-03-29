import { Graphics, Sprite } from "pixi.js";
import resources from "resources";

export default class Icon {
    private segments = 200;
    private _container: PIXI.Sprite;
    private _darkOverlay: PIXI.Graphics;
    private _text: PIXI.Text;
    private _iconImage: PIXI.Sprite;
    // private semicircles: Graphics[];
    private _time: number = 0;
    private _previousTick: number = 0;
    private _app: PIXI.Application;
    private _isCooldown: boolean = false;
    private _cooldownTimeSeconds = Math.round(Math.random() * 30);
    private _cooldownTime:number;
    private _index:number;


    constructor(pixiInstance: PIXI.Application, index: number, private _numbersLayer: Sprite, private _iconsLayer: Sprite, private _darkOverlayLayer:Sprite) {
        this._index = index;
        this._cooldownTime = this._cooldownTimeSeconds * 100;
        this._app = pixiInstance;
        // this._container = new PIXI.Sprite();
        // this._app.stage.addChild(this._container);

        const filename = 'icon' + (''+index).padStart(5, "0");
        this._iconImage = resources.getSprite(filename+'.png');
        this._iconImage.interactive = true;
        this._iconImage.on('pointertap', this._onSkillClick.bind(this));
        this._iconsLayer.addChild(this._iconImage);
        // this._container.addChild(this._iconImage);

        this._darkOverlay = new PIXI.Graphics();
        this._darkOverlay.interactive = false;
        this._darkOverlayLayer.addChild(this._darkOverlay);

        const wholeMask = new PIXI.Graphics();
        wholeMask.beginFill(0xffffff, 1);
        wholeMask.drawRect(0, 0, this.width, this.height);
        wholeMask.x = -this.width/2;
        wholeMask.y = -this.height/2;
        this._darkOverlay.addChild(wholeMask);
        this._darkOverlay.mask = wholeMask;

        const style = new PIXI.TextStyle({
            fill: "silver",
            fontFamily: "Helvetica",
            stroke: "#444",
            strokeThickness: 2
        });
        this._text = new PIXI.Text('', style);
        this._text.anchor.set(.5, .5);
        this._text.scale.set(.5, .5);
        this._text.position.set(this.width/2, this.height/2);
        this._numbersLayer.addChild(this._text);

        this._app.ticker.add(this.mainLoop.bind(this));
        this._app.ticker.speed = 1;
    }

    setPosition(x:number, y:number) {
        // this._container.position.set(x, y);
        this._iconImage.position.set(x, y);
        this._darkOverlay.position.set(x + this.width/2, y + this.height/2);
        this._text.position.set(x + this.width/2, y + this.height/2);
    }

    get width() {
        return 60;
    }

    get height() {
        return 60;
    }

    _setFill(fillAmount: number) {
        if (!this._isCooldown) return;

        if (fillAmount >= 1) {
            this._isCooldown = false;
            this._text.visible = false;
            return;
        }

        this._darkOverlay.clear();
        this._darkOverlay.beginFill(0x000000, .8);
        this._darkOverlay.lineStyle(0, 0x000000);
        this._darkOverlay.moveTo(0, 0);
        this._darkOverlay.arc(0, 0, 42, 0, fillAmount * Math.PI * 2, true);
        this._darkOverlay.rotation = -Math.PI/2;
        // this._darkOverlay.position.set(this.width / 2, this.height / 2)
    }

    mainLoop(delta: number) {
        this._time += delta;
        if (this._isCooldown) {
            this._text.text = ""+(this._cooldownTimeSeconds - Math.floor(this._time/100))
            this._setFill(this._time / this._cooldownTime);
        }
    }

    _onSkillClick(e) {
        if (this._isCooldown) return;
        this._time = 0;
        this._text.visible = true;
        this._isCooldown = true;
    }
}