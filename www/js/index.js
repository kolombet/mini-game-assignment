var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("core/contants", [], function (exports_1, context_1) {
    "use strict";
    var MAX_COMBINATION_SIZE, SPIN_TIME, WAIT_AFTER_SPIN, WIN_TIME, INITIAL_SCORE, SPIN_PRICE, SHOW_BIG_WIN_INDEX;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("MAX_COMBINATION_SIZE", MAX_COMBINATION_SIZE = 3);
            exports_1("SPIN_TIME", SPIN_TIME = 1);
            exports_1("WAIT_AFTER_SPIN", WAIT_AFTER_SPIN = 0.5);
            exports_1("WIN_TIME", WIN_TIME = 2);
            exports_1("INITIAL_SCORE", INITIAL_SCORE = 1000);
            exports_1("SPIN_PRICE", SPIN_PRICE = 50);
            exports_1("SHOW_BIG_WIN_INDEX", SHOW_BIG_WIN_INDEX = 4);
        }
    };
});
System.register("core/enums", [], function (exports_2, context_2) {
    "use strict";
    var WinType, GameStates, EventType;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            (function (WinType) {
                WinType[WinType["Normal"] = 0] = "Normal";
                WinType[WinType["Big"] = 1] = "Big";
            })(WinType || (WinType = {}));
            exports_2("WinType", WinType);
            (function (GameStates) {
                GameStates["CombinationSpin"] = "SPIN";
                GameStates["WaitAfterSpin"] = "SPIN_FINISHED";
                GameStates["WinPause"] = "WIN";
                GameStates["BigWinPause"] = "BIG_WIN";
                GameStates["Pause"] = "PAUSE_GAME";
            })(GameStates || (GameStates = {}));
            exports_2("GameStates", GameStates);
            (function (EventType) {
                EventType[EventType["ChestSceneCompleted"] = 0] = "ChestSceneCompleted";
            })(EventType || (EventType = {}));
            exports_2("EventType", EventType);
        }
    };
});
System.register("core/event-bus", [], function (exports_3, context_3) {
    "use strict";
    var EventBus, eventBus;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            EventBus = class EventBus {
                constructor() {
                    this.receivers = [];
                }
                subscribe(receiver) {
                    this.receivers.push(receiver);
                }
                unsubscribe(receiver) {
                    this.receivers = this.receivers.filter((item) => item !== receiver);
                }
                publish(topic) {
                    return __awaiter(this, void 0, void 0, function* () {
                        this.receivers.map((receiver) => new Promise((resolve) => resolve(receiver.receive(topic))));
                    });
                }
            };
            eventBus = new EventBus();
            exports_3("default", eventBus);
        }
    };
});
System.register("core/helper", [], function (exports_4, context_4) {
    "use strict";
    var Helper;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Helper = class Helper {
                static getRandomElement(elements) {
                    return elements[Math.floor(Math.random() * elements.length)];
                }
            };
            exports_4("default", Helper);
        }
    };
});
System.register("core/interfaces", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("core/signals", [], function (exports_6, context_6) {
    "use strict";
    var Signal;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            Signal = class Signal {
                constructor() {
                    this._callbacks = [];
                }
                add(callback) {
                    this._callbacks.push(callback);
                }
                clear(callback) {
                    const index = this._callbacks.indexOf(callback);
                    if (index >= 0) {
                        this._callbacks.splice(index, 1);
                    }
                    else {
                        throw new Error("Trying to remove unexisting callback");
                    }
                }
                dispatch(arg) {
                    const len = this._callbacks.length;
                    for (let i = len; i > 0; i--) {
                        const callback = this._callbacks[i - 1];
                        if (!callback) {
                            throw new Error("callback undefined");
                        }
                        callback(arg);
                    }
                }
            };
            exports_6("default", Signal);
        }
    };
});
System.register("services/balance-service", [], function (exports_7, context_7) {
    "use strict";
    var BalanceService, balanceService;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            /**
             * Symbols/scores external service provider.
             */
            BalanceService = class BalanceService {
                winCombinations() {
                    return [
                        {
                            symbol: "blue",
                            winPrize: 100,
                            bigWinPrize: 5000,
                        },
                        {
                            symbol: "red",
                            winPrize: 500,
                            bigWinPrize: 10000,
                        },
                        {
                            symbol: "orange",
                            winPrize: 300,
                            bigWinPrize: 7000,
                        },
                        {
                            symbol: "green",
                            winPrize: 600,
                            bigWinPrize: 15000,
                        },
                        {
                            symbol: "rainbow",
                            winPrize: 10000,
                            bigWinPrize: 200000,
                        },
                        {
                            symbol: "gold",
                            winPrize: 5000,
                            bigWinPrize: 70000,
                        },
                        {
                            symbol: "silver",
                            winPrize: 2000,
                            bigWinPrize: 40000,
                        },
                        {
                            symbol: "violet",
                            winPrize: 700,
                            bigWinPrize: 12000,
                        },
                    ];
                }
                getPossibleSymbols() {
                    const combinations = this.winCombinations();
                    const symbols = [];
                    for (let i = 0; i < combinations.length; i++) {
                        const symbol = combinations[i].symbol;
                        symbols.push(symbol);
                    }
                    return symbols;
                }
            };
            balanceService = new BalanceService();
            exports_7("default", balanceService);
        }
    };
});
System.register("resources", [], function (exports_8, context_8) {
    "use strict";
    var MAIN_ATLAS_URL, Resources, resources;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            exports_8("MAIN_ATLAS_URL", MAIN_ATLAS_URL = "./static/atlases/main/main.json");
            Resources = class Resources {
                init() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield this.loadAsset(MAIN_ATLAS_URL);
                    });
                }
                loadAsset(asset) {
                    return new Promise((resolve, reject) => {
                        PIXI.loader.add(asset).load(() => {
                            resolve();
                        });
                    });
                }
                getTextures(textureNames) {
                    const textures = [];
                    for (let i = 0; i < textureNames.length; i++) {
                        textures.push(this.getTexture(textureNames[i]));
                    }
                    return textures;
                }
                getTexture(name) {
                    let currentAtlas = PIXI.loader.resources[MAIN_ATLAS_URL];
                    let texture;
                    if (!(currentAtlas === null || currentAtlas === void 0 ? void 0 : currentAtlas.textures)) {
                        throw new Error("atlas missing textures " + name);
                    }
                    else {
                        texture = currentAtlas.textures[name];
                    }
                    if (!texture) {
                        throw new Error("problems with the texture: " + name);
                    }
                    return texture;
                }
                getSprite(name) {
                    return new PIXI.Sprite(this.getTexture(name));
                }
                getSpriteCentered(name) {
                    const sprite = this.getSprite(name);
                    sprite.anchor.set(0.5, 0.5);
                    return sprite;
                }
            };
            resources = new Resources();
            exports_8("default", resources);
        }
    };
});
System.register("icon", ["resources"], function (exports_9, context_9) {
    "use strict";
    var resources_1, Icon;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (resources_1_1) {
                resources_1 = resources_1_1;
            }
        ],
        execute: function () {
            Icon = class Icon {
                constructor(pixiInstance, index, _numbersLayer, _iconsLayer, _darkOverlayLayer) {
                    this._numbersLayer = _numbersLayer;
                    this._iconsLayer = _iconsLayer;
                    this._darkOverlayLayer = _darkOverlayLayer;
                    this.segments = 200;
                    // private semicircles: Graphics[];
                    this._time = 0;
                    this._previousTick = 0;
                    this._isCooldown = false;
                    this._cooldownTimeSeconds = Math.round(Math.random() * 30);
                    this._index = index;
                    this._cooldownTime = this._cooldownTimeSeconds * 100;
                    this._app = pixiInstance;
                    // this._container = new PIXI.Sprite();
                    // this._app.stage.addChild(this._container);
                    const filename = 'icon' + ('' + index).padStart(5, "0");
                    this._iconImage = resources_1.default.getSprite(filename + '.png');
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
                    wholeMask.x = -this.width / 2;
                    wholeMask.y = -this.height / 2;
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
                    this._text.position.set(this.width / 2, this.height / 2);
                    this._numbersLayer.addChild(this._text);
                    this._app.ticker.add(this.mainLoop.bind(this));
                    this._app.ticker.speed = 1;
                }
                setPosition(x, y) {
                    // this._container.position.set(x, y);
                    this._iconImage.position.set(x, y);
                    this._darkOverlay.position.set(x + this.width / 2, y + this.height / 2);
                    this._text.position.set(x + this.width / 2, y + this.height / 2);
                }
                get width() {
                    return 60;
                }
                get height() {
                    return 60;
                }
                _setFill(fillAmount) {
                    if (!this._isCooldown)
                        return;
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
                    this._darkOverlay.rotation = -Math.PI / 2;
                    // this._darkOverlay.position.set(this.width / 2, this.height / 2)
                }
                mainLoop(delta) {
                    this._time += delta;
                    if (this._isCooldown) {
                        this._text.text = "" + (this._cooldownTimeSeconds - Math.floor(this._time / 100));
                        this._setFill(this._time / this._cooldownTime);
                    }
                }
                _onSkillClick(e) {
                    if (this._isCooldown)
                        return;
                    this._time = 0;
                    this._text.visible = true;
                    this._isCooldown = true;
                }
            };
            exports_9("default", Icon);
        }
    };
});
System.register("main", ["resources", "icon"], function (exports_10, context_10) {
    "use strict";
    var resources_2, icon_1, Main, main;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (resources_2_1) {
                resources_2 = resources_2_1;
            },
            function (icon_1_1) {
                icon_1 = icon_1_1;
            }
        ],
        execute: function () {
            Main = class Main {
                constructor() {
                    this._apps = [];
                    this._icons = [];
                    this._w = 0;
                    this._h = 0;
                }
                init() {
                    return __awaiter(this, void 0, void 0, function* () {
                        this._canvases = document.getElementsByClassName("icon-canvas");
                        if (!this._canvases) {
                            console.error("No canvases found");
                            return;
                        }
                        yield resources_2.default.init();
                        if (!PIXI.utils.isWebGLSupported()) {
                            console.error("Webgl is not supported");
                            return;
                        }
                        for (let i = 0; i < this._canvases.length; i++) {
                            const canvas = this._canvases[i];
                            this._apps.push(new PIXI.Application({ view: canvas }));
                        }
                        const GStats = window.GStats;
                        const overlay = document.getElementById('html-overlay');
                        if (GStats && overlay) {
                            const pixi_gstats = new GStats.PIXIHooks(this._apps[0]);
                            this.gStats = new GStats.StatsJSAdapter(pixi_gstats);
                            this.gStats.stats.showPanel(0);
                            overlay.appendChild(this.gStats.stats.dom || this.gStats.stats.domElement);
                        }
                        this._apps[0].ticker.add(() => {
                            if (this.gStats) {
                                this.gStats.update();
                            }
                        });
                        this.resize();
                        this._iconsLayer = new PIXI.Sprite();
                        this._darkOverlayLayer = new PIXI.Sprite();
                        this._numbersLayer = new PIXI.Sprite();
                        for (let i = 0; i < 210; i++) {
                            const icon = new icon_1.default(this._apps[0], i + 1, this._numbersLayer, this._iconsLayer, this._darkOverlayLayer);
                            this._icons.push(icon);
                        }
                        this._apps[0].stage.addChild(this._iconsLayer);
                        this._apps[0].stage.addChild(this._darkOverlayLayer);
                        this._apps[0].stage.addChild(this._numbersLayer);
                        this.updateIconsPosition();
                        window.addEventListener("resize", this.resize.bind(this));
                    });
                }
                updateIconsPosition() {
                    for (let i = 0; i < this._icons.length; i++) {
                        const icon = this._icons[i];
                        const xOffset = 4;
                        const yOffset = 4;
                        const iconsInRow = Math.floor((this._w - xOffset * 2) / icon.width);
                        const row = Math.floor(i / iconsInRow);
                        const x = (icon.width + xOffset) * (i % iconsInRow) + xOffset / 2;
                        const y = (icon.height + yOffset) * row + yOffset / 2;
                        icon.setPosition(x, y);
                    }
                }
                resize() {
                    // this.size.setSize(innerWidth, innerHeight);
                    for (let i = 0; i < this._apps.length; i++) {
                        const canvas = this._canvases[i];
                        // const innerWidth = canvas['offsetWidth'];
                        // const innerHeight = canvas['offsetHeight'];
                        this._w = document.body.offsetWidth - 50;
                        // this._h = document.body.offsetHeight;
                        this._h = 3500;
                        canvas['width'] = this._w;
                        canvas['height'] = this._h;
                        this._apps[i].renderer.resize(this._w, this._h);
                    }
                    this.updateIconsPosition();
                }
            };
            // export class Size {
            //   width: number;
            //   height: number;
            //   setSize(width: number, height: number) {
            //     this.width = width;
            //     this.height = height;
            //   }
            // }
            main = new Main();
            // @ts-ignore
            window.main = main;
            exports_10("default", main);
        }
    };
});
