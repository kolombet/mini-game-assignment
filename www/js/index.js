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
System.register("core/interfaces", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("services/balance-service", [], function (exports_3, context_3) {
    "use strict";
    var BalanceService, balanceService;
    var __moduleName = context_3 && context_3.id;
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
            exports_3("default", balanceService);
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
System.register("core/signals", [], function (exports_5, context_5) {
    "use strict";
    var Signal;
    var __moduleName = context_5 && context_5.id;
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
            exports_5("default", Signal);
        }
    };
});
System.register("core/enums", [], function (exports_6, context_6) {
    "use strict";
    var WinType, GameStates, EventType;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            (function (WinType) {
                WinType[WinType["Normal"] = 0] = "Normal";
                WinType[WinType["Big"] = 1] = "Big";
            })(WinType || (WinType = {}));
            exports_6("WinType", WinType);
            (function (GameStates) {
                GameStates["CombinationSpin"] = "SPIN";
                GameStates["WaitAfterSpin"] = "SPIN_FINISHED";
                GameStates["WinPause"] = "WIN";
                GameStates["BigWinPause"] = "BIG_WIN";
                GameStates["Pause"] = "PAUSE_GAME";
            })(GameStates || (GameStates = {}));
            exports_6("GameStates", GameStates);
            (function (EventType) {
                EventType[EventType["ChestSceneCompleted"] = 0] = "ChestSceneCompleted";
            })(EventType || (EventType = {}));
            exports_6("EventType", EventType);
        }
    };
});
System.register("core/event-bus", [], function (exports_7, context_7) {
    "use strict";
    var EventBus, eventBus;
    var __moduleName = context_7 && context_7.id;
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
            exports_7("default", eventBus);
        }
    };
});
System.register("core/core", ["services/balance-service", "core/helper", "core/signals", "core/enums", "core/event-bus", "core/contants"], function (exports_8, context_8) {
    "use strict";
    var balance_service_1, helper_1, signals_1, enums_1, event_bus_1, contants_1, Core;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (balance_service_1_1) {
                balance_service_1 = balance_service_1_1;
            },
            function (helper_1_1) {
                helper_1 = helper_1_1;
            },
            function (signals_1_1) {
                signals_1 = signals_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (event_bus_1_1) {
                event_bus_1 = event_bus_1_1;
            },
            function (contants_1_1) {
                contants_1 = contants_1_1;
            }
        ],
        execute: function () {
            Core = class Core {
                constructor() {
                    this.currentCombo = 0;
                    this.onStateChange = new signals_1.default();
                    this.prizeBySymbol = new Map();
                    this.combinationRoll = new signals_1.default();
                    this.win = new signals_1.default();
                    this.onScoreChange = new signals_1.default();
                    this.stateTime = 0;
                    this.winCombinations = balance_service_1.default.winCombinations();
                    for (let i = 0; i < this.winCombinations.length; i++) {
                        const combination = this.winCombinations[i];
                        this.prizeBySymbol.set(combination.symbol, combination);
                    }
                    this.possibleSymbols = this.winCombinations.map((probability) => {
                        return probability.symbol;
                    });
                    event_bus_1.default.subscribe(this);
                }
                set score(value) {
                    this._score = value;
                    this.onScoreChange.dispatch(String(value));
                }
                get score() {
                    return this._score;
                }
                getScore() {
                    return String(this._score);
                }
                get gameState() {
                    return this._gameState;
                }
                set gameState(state) {
                    console.log("set state: " + state);
                    this.onStateChange.dispatch(state);
                    this._gameState = state;
                }
                get winCombo() {
                    return this._winCombo;
                }
                startGameCycle() {
                    this.score = contants_1.INITIAL_SCORE;
                    this.stateTime = contants_1.SPIN_TIME;
                    this.setState(enums_1.GameStates.CombinationSpin);
                }
                setState(state) {
                    switch (state) {
                        case enums_1.GameStates.CombinationSpin:
                            if (this.score >= contants_1.SPIN_PRICE) {
                                this.score -= contants_1.SPIN_PRICE;
                                this.stateTime = contants_1.SPIN_TIME;
                                this.generateCombination();
                            }
                            else {
                                this.gameState = enums_1.GameStates.Pause;
                            }
                            break;
                        case enums_1.GameStates.WaitAfterSpin:
                            this.stateTime = contants_1.WAIT_AFTER_SPIN;
                            break;
                        case enums_1.GameStates.WinPause:
                            this.stateTime = contants_1.WIN_TIME;
                            break;
                        case enums_1.GameStates.BigWinPause:
                            break;
                    }
                    this.gameState = state;
                }
                update(delta) {
                    if (this.gameState === enums_1.GameStates.Pause ||
                        this.gameState === enums_1.GameStates.BigWinPause) {
                        return;
                    }
                    const dt = delta * 0.01;
                    this.stateTime -= dt;
                    if (this.stateTime <= 0) {
                        switch (this._gameState) {
                            case enums_1.GameStates.CombinationSpin:
                                const winCombo = this.checkForWinCombinations(this.combination);
                                if (winCombo) {
                                    if (winCombo.winType === enums_1.WinType.Big) {
                                        this.setState(enums_1.GameStates.BigWinPause);
                                    }
                                    else {
                                        this.setState(enums_1.GameStates.WinPause);
                                    }
                                    this._winCombo = winCombo;
                                    this.win.dispatch(winCombo);
                                    this.score += winCombo.prize;
                                }
                                else {
                                    this.setState(enums_1.GameStates.WaitAfterSpin);
                                }
                                break;
                            case enums_1.GameStates.WinPause:
                                this.setState(enums_1.GameStates.CombinationSpin);
                                break;
                            case enums_1.GameStates.BigWinPause:
                                break;
                            case enums_1.GameStates.WaitAfterSpin:
                                this.setState(enums_1.GameStates.CombinationSpin);
                                break;
                            default:
                                throw new Error("all states should be handled");
                        }
                    }
                }
                generateCombination() {
                    this.currentCombo++;
                    const isWin = this.currentCombo === contants_1.SHOW_BIG_WIN_INDEX;
                    this.combination = isWin
                        ? this.getWinCombination()
                        : this.getRandomCombination();
                    this.combinationRoll.dispatch(this.combination);
                }
                getWinCombination() {
                    const symbol = helper_1.default.getRandomElement(this.possibleSymbols);
                    return [symbol, symbol, symbol];
                }
                getRandomCombination() {
                    const combination = [];
                    for (let i = 0; i < contants_1.MAX_COMBINATION_SIZE; i++) {
                        const symbol = helper_1.default.getRandomElement(this.possibleSymbols);
                        combination.push(symbol);
                    }
                    return combination;
                }
                checkForWinCombinations(combination) {
                    var _a;
                    for (let i = 0; i < combination.length; i++) {
                        const winSymbol = combination[i];
                        const matches = combination.filter((item) => item === winSymbol).length;
                        if (matches > 1) {
                            const winCombination = (_a = this.prizeBySymbol) === null || _a === void 0 ? void 0 : _a.get(winSymbol);
                            if (!winCombination) {
                                throw new Error("Prize not described");
                            }
                            const winType = matches === contants_1.MAX_COMBINATION_SIZE ? enums_1.WinType.Big : enums_1.WinType.Normal;
                            const { bigWinPrize, winPrize } = winCombination;
                            const prize = winType === enums_1.WinType.Big ? bigWinPrize : winPrize;
                            return {
                                winSymbol,
                                winType,
                                prize,
                                matches,
                            };
                        }
                    }
                    return null;
                }
                receive(event) {
                    if (event === enums_1.EventType.ChestSceneCompleted) {
                        this.setState(enums_1.GameStates.CombinationSpin);
                    }
                }
            };
            exports_8("default", Core);
        }
    };
});
System.register("views/constants", [], function (exports_9, context_9) {
    "use strict";
    var BITMAP_FONT_ATLAS_URL, EFFECT_ATLAS_URL, GEMS_ATLAS_URL, MAIN_ATLAS_URL, CHEST_CLOSED, CHEST_OPEN, RING, STAR, BAG, SHINE, SMOKE, COINS, DIAMOND, GOLD_BARS, GOLD_RING, ScenesType;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            exports_9("BITMAP_FONT_ATLAS_URL", BITMAP_FONT_ATLAS_URL = "./static/atlases/bitmap-font/bitmap-font.json");
            exports_9("EFFECT_ATLAS_URL", EFFECT_ATLAS_URL = "./static/atlases/effects/effects.json");
            exports_9("GEMS_ATLAS_URL", GEMS_ATLAS_URL = "./static/atlases/gems/gems.json");
            exports_9("MAIN_ATLAS_URL", MAIN_ATLAS_URL = "./static/atlases/main/main.json");
            exports_9("CHEST_CLOSED", CHEST_CLOSED = "chest-closed.png");
            exports_9("CHEST_OPEN", CHEST_OPEN = "chest-open.png");
            exports_9("RING", RING = "ring.png");
            exports_9("STAR", STAR = "symbols/star.png");
            exports_9("BAG", BAG = "symbols/bag.png");
            exports_9("SHINE", SHINE = "symbols/shine.png");
            exports_9("SMOKE", SMOKE = "symbols/smoke.png");
            exports_9("COINS", COINS = "symbols/coins.png");
            exports_9("DIAMOND", DIAMOND = "symbols/diamond.png");
            exports_9("GOLD_BARS", GOLD_BARS = "symbols/goldbars.png");
            exports_9("GOLD_RING", GOLD_RING = "symbols/ring.png");
            (function (ScenesType) {
                ScenesType["CHEST_SCENE"] = "chest";
                ScenesType["GAME_SCENE"] = "game";
            })(ScenesType || (ScenesType = {}));
            exports_9("ScenesType", ScenesType);
        }
    };
});
System.register("views/scenes/abstract-game-scene", [], function (exports_10, context_10) {
    "use strict";
    var TICK_TIME, AbstractGameScene;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            exports_10("TICK_TIME", TICK_TIME = 5);
            AbstractGameScene = class AbstractGameScene {
                constructor() {
                    this.tickTime = 0;
                }
                init(app, core, switchScene) {
                    this.app = app;
                    this.core = core;
                    this.switchSceneTo = switchScene;
                }
                setSceneContainer(sceneContainer) {
                    this.sceneContainer = sceneContainer;
                }
                updateScene(delta) {
                    this.tickTime -= delta;
                    if (this.tickTime <= 0) {
                        this.tickTime += TICK_TIME;
                        this.tick();
                    }
                    this.update(delta);
                }
            };
            exports_10("AbstractGameScene", AbstractGameScene);
        }
    };
});
System.register("views/interfaces", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("views/managers/resource-manager", ["views/constants"], function (exports_12, context_12) {
    "use strict";
    var constants_1, ResourceManager, resourceManager;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }
        ],
        execute: function () {
            ResourceManager = class ResourceManager {
                init() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield this.loadAsset(constants_1.MAIN_ATLAS_URL);
                        yield this.loadAsset(constants_1.EFFECT_ATLAS_URL);
                        yield this.loadAsset(constants_1.BITMAP_FONT_ATLAS_URL);
                        yield this.loadAsset(constants_1.GEMS_ATLAS_URL);
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
                    let currentAtlas;
                    if (name.indexOf("font/") >= 0) {
                        currentAtlas = PIXI.loader.resources[constants_1.BITMAP_FONT_ATLAS_URL];
                    }
                    else if (name.indexOf("symbols/") >= 0) {
                        currentAtlas = PIXI.loader.resources[constants_1.EFFECT_ATLAS_URL];
                    }
                    else if (name.indexOf("gems/") >= 0) {
                        currentAtlas = PIXI.loader.resources[constants_1.GEMS_ATLAS_URL];
                    }
                    else {
                        currentAtlas = PIXI.loader.resources[constants_1.MAIN_ATLAS_URL];
                    }
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
            resourceManager = new ResourceManager();
            exports_12("default", resourceManager);
        }
    };
});
System.register("views/scenes/game/pulse-animation", [], function (exports_13, context_13) {
    "use strict";
    var pulseAnimation;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            pulseAnimation = (sprite, maximumSize = 1.3, pulseTime = 0.3, pulsesCount = 4) => {
                const timeline = gsap.timeline();
                const target = sprite.scale;
                for (let i = 0; i < pulsesCount; i++) {
                    timeline.to(target, {
                        y: maximumSize,
                        x: maximumSize,
                        duration: pulseTime,
                        ease: "ease.in",
                    });
                    timeline.to(target, {
                        y: 1,
                        x: 1,
                        duration: pulseTime,
                        ease: "ease.out",
                    });
                }
                return timeline;
            };
            exports_13("default", pulseAnimation);
        }
    };
});
System.register("views/components/prize-text-component", ["views/managers/resource-manager", "views/scenes/game/pulse-animation"], function (exports_14, context_14) {
    "use strict";
    var resource_manager_1, pulse_animation_1, CHARACTER_WIDTH, PrizeTextComponent;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (resource_manager_1_1) {
                resource_manager_1 = resource_manager_1_1;
            },
            function (pulse_animation_1_1) {
                pulse_animation_1 = pulse_animation_1_1;
            }
        ],
        execute: function () {
            CHARACTER_WIDTH = 57;
            PrizeTextComponent = class PrizeTextComponent extends PIXI.Sprite {
                constructor() {
                    super();
                    this.currentlyDisplayedPrize = 0;
                    this.targetAmountPrize = 0;
                    this.alpha = 0;
                    this.anchor.set(0.5, 0.5);
                }
                setTargetValue(value, pulsesCount = 1, tweenTicks = 10) {
                    this.tweenTicks = tweenTicks;
                    pulse_animation_1.default(this, 1.2, 0.4, pulsesCount);
                    this.alpha = 0;
                    gsap.to(this, {
                        ease: "ease.out",
                        alpha: 1,
                        duration: 0.5,
                    });
                    this.currentlyDisplayedPrize = value / 3;
                    this.targetAmountPrize = value;
                    this.updatePrizeText();
                }
                clear() {
                    this.currentlyDisplayedPrize = 0;
                    this.targetAmountPrize = 0;
                    gsap.to(this, {
                        ease: "ease.in",
                        alpha: 0,
                        duration: 0.5,
                    });
                    this.removeChildren();
                }
                tick() {
                    if (this.targetAmountPrize === 0) {
                        return;
                    }
                    this.currentlyDisplayedPrize += this.targetAmountPrize / this.tweenTicks;
                    if (this.currentlyDisplayedPrize >= this.targetAmountPrize) {
                        this.currentlyDisplayedPrize = this.targetAmountPrize;
                    }
                    this.updatePrizeText();
                }
                updatePrizeText() {
                    const text = String(Math.round(this.currentlyDisplayedPrize));
                    this.removeChildren();
                    const winText = new PIXI.Sprite();
                    winText.anchor.set(0, 0.5);
                    this.addChild(winText);
                    for (let i = 0; i < text.length; i++) {
                        const charCode = text[i].charCodeAt(0);
                        const isNumber = charCode >= 48 && charCode <= 57;
                        const isPeriod = charCode === 46;
                        const isComma = charCode === 44;
                        if (isNumber || isPeriod || isComma) {
                            const spriteName = `font/${charCode}.png`;
                            const character = resource_manager_1.default.getSprite(spriteName);
                            character.anchor.set(0, 0.5);
                            character.x = CHARACTER_WIDTH * i;
                            winText.addChild(character);
                        }
                        else {
                            throw new Error("char code not in allowed range");
                        }
                    }
                    winText.x = (-text.length * CHARACTER_WIDTH) / 2;
                }
            };
            exports_14("PrizeTextComponent", PrizeTextComponent);
        }
    };
});
System.register("views/managers/scene-manager", [], function (exports_15, context_15) {
    "use strict";
    var SceneManager;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
            SceneManager = class SceneManager {
                constructor(app, core, scenes, startupSceneName) {
                    this.app = app;
                    this.core = core;
                    this.scenes = scenes;
                    this.startupSceneName = startupSceneName;
                    this.switchSceneTo = (sceneName) => {
                        var _a;
                        //clear previous scene
                        if ((_a = this.currentSceneController) === null || _a === void 0 ? void 0 : _a.gameScene) {
                            this.currentSceneController.gameScene.teardown();
                        }
                        if (this.currentSceneContainer) {
                            this.app.stage.removeChild(this.currentSceneContainer);
                        }
                        const scene = this.scenes.find((sceneSettings) => {
                            return sceneSettings.name === sceneName;
                        });
                        if (scene) {
                            this.setupScene(scene);
                        }
                        else {
                            throw new Error("SCENE NOT FOUND: " + sceneName);
                        }
                    };
                    const firstScene = this.scenes.find((scene) => scene.name === startupSceneName);
                    if (!firstScene) {
                        throw new Error("startup scene not found: " + startupSceneName);
                    }
                    this.setupScene(firstScene);
                }
                setupScene(scene) {
                    this.currentSceneController = scene;
                    this.currentSceneContainer = new PIXI.Container();
                    this.app.stage.addChild(this.currentSceneContainer);
                    if (!scene.gameScene) {
                        scene.gameScene = scene.sceneFactory();
                        scene.gameScene.init(this.app, this.core, this.switchSceneTo);
                    }
                    scene.gameScene.setSceneContainer(this.currentSceneContainer);
                    scene.gameScene.setup();
                }
                update(delta) {
                    var _a;
                    if ((_a = this.currentSceneController) === null || _a === void 0 ? void 0 : _a.gameScene) {
                        this.currentSceneController.gameScene.updateScene(delta);
                    }
                }
            };
            exports_15("SceneManager", SceneManager);
        }
    };
});
System.register("views/particles/treasures-emitter-config", [], function (exports_16, context_16) {
    "use strict";
    var treasuresEmitterConfig;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
            treasuresEmitterConfig = (particlesAmount = 100, emitterLifetime = 1, isOnBack = true) => {
                return {
                    alpha: {
                        start: 1,
                        end: 1,
                    },
                    scale: {
                        start: 1,
                        end: 1,
                        minimumScaleMultiplier: 1,
                    },
                    color: {
                        start: "#ffffff",
                        end: "#ffffff",
                    },
                    speed: {
                        start: 800,
                        end: 500,
                        minimumSpeedMultiplier: 1,
                    },
                    acceleration: {
                        x: 0,
                        y: 1498,
                    },
                    maxSpeed: 0,
                    startRotation: {
                        min: -150,
                        max: -30,
                    },
                    noRotation: true,
                    rotationSpeed: {
                        min: 0,
                        max: 0,
                    },
                    lifetime: {
                        min: 1.5,
                        max: 2,
                    },
                    blendMode: "normal",
                    frequency: 0.005,
                    emitterLifetime,
                    maxParticles: particlesAmount,
                    pos: {
                        x: 0,
                        y: 0,
                    },
                    addAtBack: isOnBack,
                    spawnType: "circle",
                    spawnCircle: {
                        x: 0,
                        y: 0,
                        r: 100,
                    },
                };
            };
            exports_16("default", treasuresEmitterConfig);
        }
    };
});
System.register("views/scenes/chest/chest-config", [], function (exports_17, context_17) {
    "use strict";
    var SHINE_LARGE_SCALE, SHINE_SMALL_SCALE, RING_SCALE, CHEST_DROP_TIME;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            exports_17("SHINE_LARGE_SCALE", SHINE_LARGE_SCALE = 3);
            exports_17("SHINE_SMALL_SCALE", SHINE_SMALL_SCALE = 1);
            exports_17("RING_SCALE", RING_SCALE = 2);
            exports_17("CHEST_DROP_TIME", CHEST_DROP_TIME = 3);
        }
    };
});
System.register("views/scenes/chest/smoke-emitter-config", [], function (exports_18, context_18) {
    "use strict";
    var redSmokeEmitterConfig, smokeEmitterConfig, smallBurst;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            redSmokeEmitterConfig = {
                alpha: {
                    list: [
                        {
                            value: 0.8,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                scale: {
                    list: [
                        {
                            value: 1,
                            time: 0
                        },
                        {
                            value: 0.3,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                color: {
                    list: [
                        {
                            value: "fb1010",
                            time: 0
                        },
                        {
                            value: "f5b830",
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                speed: {
                    list: [
                        {
                            value: 200,
                            time: 0
                        },
                        {
                            value: 100,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                startRotation: {
                    min: 0,
                    max: 360
                },
                rotationSpeed: {
                    min: 0,
                    max: 0
                },
                lifetime: {
                    min: 0.5,
                    max: 0.5
                },
                frequency: 1,
                spawnChance: 1,
                particlesPerWave: -1,
                emitterLifetime: 1,
                maxParticles: 15,
                pos: {
                    x: 0,
                    y: 0
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 0,
                    r: 10
                }
            };
            smokeEmitterConfig = {
                "alpha": {
                    "start": 0.89,
                    "end": 0
                },
                "scale": {
                    "start": 1,
                    "end": 3,
                    "minimumScaleMultiplier": 1
                },
                "color": {
                    "start": "#a8a8a8",
                    "end": "#ffffff"
                },
                "speed": {
                    "start": 200,
                    "end": 1,
                    "minimumSpeedMultiplier": 1
                },
                "acceleration": {
                    "x": 1,
                    "y": 1
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": 0,
                    "max": 360
                },
                "noRotation": false,
                "rotationSpeed": {
                    "min": 0,
                    "max": 500
                },
                "lifetime": {
                    "min": 1,
                    "max": 1
                },
                "blendMode": "normal",
                "frequency": 0.01,
                "emitterLifetime": 1,
                "maxParticles": 20,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "burst",
                "particlesPerWave": 20,
                "particleSpacing": 0,
                "angleStart": 0
            };
            smallBurst = {
                "alpha": {
                    "start": 1,
                    "end": 0.8
                },
                "scale": {
                    "start": 0.5,
                    "end": 0.5
                },
                "color": {
                    "start": "ffffff",
                    "end": "ffffff"
                },
                "speed": {
                    "start": 200,
                    "end": 100
                },
                "startRotation": {
                    "min": 0,
                    "max": 0
                },
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 0.5,
                    "max": 0.7
                },
                "frequency": 0.05,
                "emitterLifetime": 0.31,
                "maxParticles": 1000,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "ring",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 40,
                    "minR": 39
                }
            };
            exports_18("default", smokeEmitterConfig);
        }
    };
});
System.register("views/scenes/chest/star-shine-config", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("views/scenes/chest/start-shine-config-data", [], function (exports_20, context_20) {
    "use strict";
    var startShineConfigData;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [],
        execute: function () {
            startShineConfigData = [
                {
                    x: 90,
                    y: 109,
                    delay: 0,
                },
                {
                    x: 125,
                    y: 130,
                    delay: 0,
                },
                {
                    x: 14,
                    y: 139,
                    delay: 0,
                },
                {
                    x: -100,
                    y: 97,
                    delay: 0,
                },
                {
                    x: 68,
                    y: -44,
                    delay: 0,
                },
                {
                    x: -5,
                    y: -67,
                    delay: 0,
                },
                {
                    x: -6,
                    y: 14,
                    delay: 0,
                }
            ];
            for (let data of startShineConfigData) {
                data.delay = 1000 * Math.random();
            }
            exports_20("default", startShineConfigData);
        }
    };
});
System.register("views/scenes/game/game-scene-config", [], function (exports_21, context_21) {
    "use strict";
    var TEXT_COLOR;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
            exports_21("TEXT_COLOR", TEXT_COLOR = "#FFFFFF");
        }
    };
});
System.register("views/scenes/game/game-scene", ["views/scenes/abstract-game-scene", "views/managers/resource-manager", "views/constants", "services/balance-service", "core/helper", "views/scenes/game/pulse-animation", "views/particles/treasures-emitter-config", "core/enums", "views/components/prize-text-component", "views/scenes/game/game-scene-config", "main", "core/contants"], function (exports_22, context_22) {
    "use strict";
    var abstract_game_scene_1, resource_manager_2, constants_2, balance_service_2, helper_2, pulse_animation_2, treasures_emitter_config_1, enums_2, prize_text_component_1, game_scene_config_1, main_1, contants_2, GameScene;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [
            function (abstract_game_scene_1_1) {
                abstract_game_scene_1 = abstract_game_scene_1_1;
            },
            function (resource_manager_2_1) {
                resource_manager_2 = resource_manager_2_1;
            },
            function (constants_2_1) {
                constants_2 = constants_2_1;
            },
            function (balance_service_2_1) {
                balance_service_2 = balance_service_2_1;
            },
            function (helper_2_1) {
                helper_2 = helper_2_1;
            },
            function (pulse_animation_2_1) {
                pulse_animation_2 = pulse_animation_2_1;
            },
            function (treasures_emitter_config_1_1) {
                treasures_emitter_config_1 = treasures_emitter_config_1_1;
            },
            function (enums_2_1) {
                enums_2 = enums_2_1;
            },
            function (prize_text_component_1_1) {
                prize_text_component_1 = prize_text_component_1_1;
            },
            function (game_scene_config_1_1) {
                game_scene_config_1 = game_scene_config_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (contants_2_1) {
                contants_2 = contants_2_1;
            }
        ],
        execute: function () {
            GameScene = class GameScene extends abstract_game_scene_1.AbstractGameScene {
                constructor() {
                    super(...arguments);
                    this.currentCombination = [];
                    this.onScoreChange = (score) => {
                        this.bankText.text = score;
                    };
                    this.onPrizeWin = (winCombo) => {
                        if (winCombo.winType === enums_2.WinType.Big) {
                            gsap.to(this.gems, {
                                ease: "ease.out",
                                alpha: 0,
                                duration: 1.0,
                                onComplete: () => __awaiter(this, void 0, void 0, function* () {
                                    this.switchSceneTo(constants_2.ScenesType.CHEST_SCENE);
                                }),
                            });
                            return;
                        }
                        this.prizeTextComponent.setTargetValue(winCombo.prize);
                        this.treasuresEmitter = new PIXI.particles.Emitter(this.gems, [
                            resource_manager_2.default.getTexture(constants_2.GOLD_BARS),
                            resource_manager_2.default.getTexture(constants_2.COINS),
                        ], treasures_emitter_config_1.default(winCombo.prize * 10));
                        this.treasuresEmitter.playOnceAndDestroy();
                        for (let i = 0; i < this.currentCombination.length; i++) {
                            if (this.currentCombination[i] === winCombo.winSymbol) {
                                pulse_animation_2.default(this.gemSprites[i], 1.2, 0.2, 5);
                            }
                        }
                    };
                    this.onCombinationRoll = (combination) => {
                        if ((combination === null || combination === void 0 ? void 0 : combination.length) !== contants_2.MAX_COMBINATION_SIZE) {
                            throw new Error("core should provide correct amount of combinations");
                        }
                        this.currentCombination = combination;
                        this.prizeTextComponent.clear();
                        this.isSlotSpinning = [true, true, true];
                        this.spinTimeTicks = [8, 13, 18];
                    };
                }
                setup() {
                    const { width, height } = main_1.default.size;
                    this.isSlotSpinning = [false, false, false];
                    this.spinTimeTicks = [0, 0, 0];
                    this.symbols = balance_service_2.default.getPossibleSymbols();
                    this.gems = new PIXI.Sprite();
                    this.gems.anchor.set(0.5, 0.5);
                    this.gems.x = width / 2;
                    this.gems.y = height / 2;
                    this.sceneContainer.addChild(this.gems);
                    this.gemSprites = [];
                    for (let i = 0; i < contants_2.MAX_COMBINATION_SIZE; i++) {
                        const sprite = new PIXI.Sprite();
                        sprite.x = 200 * (i - 1);
                        sprite.anchor.set(0.5, 0.5);
                        this.gems.addChild(sprite);
                        this.gemSprites.push(sprite);
                    }
                    this.prizeTextComponent = new prize_text_component_1.PrizeTextComponent();
                    this.prizeTextComponent.x = width / 2;
                    this.prizeTextComponent.y = height / 2;
                    this.sceneContainer.addChild(this.prizeTextComponent);
                    this.bankText = new PIXI.Text(this.core.getScore(), { fill: game_scene_config_1.TEXT_COLOR });
                    const bankLabelY = 80;
                    this.bankText.x = width - 100;
                    this.bankText.y = bankLabelY;
                    this.bankText.anchor.set(0.5, 0.5);
                    this.sceneContainer.addChild(this.bankText);
                    this.bankImage = resource_manager_2.default.getSpriteCentered(constants_2.BAG);
                    this.bankImage.y = bankLabelY;
                    this.bankImage.x = this.bankText.x - 60;
                    this.sceneContainer.addChild(this.bankImage);
                    this.core.combinationRoll.add(this.onCombinationRoll);
                    this.core.win.add(this.onPrizeWin);
                    this.core.onScoreChange.add(this.onScoreChange);
                }
                teardown() {
                    this.gems.removeChildren();
                    this.gems.removeAllListeners();
                    this.core.combinationRoll.clear(this.onCombinationRoll);
                    this.core.win.clear(this.onPrizeWin);
                    this.core.onScoreChange.clear(this.onScoreChange);
                }
                update(delta) {
                    if (this.treasuresEmitter) {
                        this.treasuresEmitter.update(delta * 0.01);
                    }
                }
                getGemAssetById(id) {
                    return `gems/${id}.png`;
                }
                setSymbolToSlot(symbol, slot) {
                    this.gemSprites[slot].texture = resource_manager_2.default.getTexture(this.getGemAssetById(symbol));
                }
                tick() {
                    this.prizeTextComponent.tick();
                    for (let i = 0; i < this.spinTimeTicks.length; i++) {
                        this.spinTimeTicks[i]--;
                        const randomSymbol = helper_2.default.getRandomElement(this.symbols);
                        if (this.spinTimeTicks[i] <= 0) {
                            this.setSymbolToSlot(this.currentCombination[i], i);
                        }
                        else {
                            this.setSymbolToSlot(randomSymbol, i);
                        }
                    }
                }
            };
            exports_22("GameScene", GameScene);
        }
    };
});
System.register("main", ["views/managers/resource-manager", "views/managers/scene-manager", "views/scenes/chest/chest-scene", "views/scenes/game/game-scene", "views/constants", "core/core"], function (exports_23, context_23) {
    "use strict";
    var resource_manager_3, scene_manager_1, chest_scene_1, game_scene_1, constants_3, core_1, Main, Size, main;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (resource_manager_3_1) {
                resource_manager_3 = resource_manager_3_1;
            },
            function (scene_manager_1_1) {
                scene_manager_1 = scene_manager_1_1;
            },
            function (chest_scene_1_1) {
                chest_scene_1 = chest_scene_1_1;
            },
            function (game_scene_1_1) {
                game_scene_1 = game_scene_1_1;
            },
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            Main = class Main {
                constructor() {
                    this.isInitialized = false;
                }
                init() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const mainCanvas = document.getElementById("main-canvas");
                        if (!mainCanvas) {
                            console.error("No main-mainCanvas found");
                            return;
                        }
                        if (!PIXI.utils.isWebGLSupported()) {
                            console.error("Webgl is not supported");
                            return;
                        }
                        const config = { view: mainCanvas };
                        this.app = new PIXI.Application(config);
                        const GStats = window.GStats;
                        if (GStats) {
                            const pixi_gstats = new GStats.PIXIHooks(this.app);
                            this.gStats = new GStats.StatsJSAdapter(pixi_gstats);
                            this.gStats.stats.showPanel(0);
                            document.body.appendChild(this.gStats.stats.dom || this.gStats.stats.domElement);
                        }
                        yield resource_manager_3.default.init();
                        this.size = new Size();
                        this.resize();
                        this.initScenes();
                        window.addEventListener("resize", this.resize.bind(this));
                    });
                }
                mainLoop(delta) {
                    if (!this.scenesManager) {
                        console.error("scene manager should exist");
                        return;
                    }
                    if (this.gStats) {
                        this.gStats.update();
                    }
                    if (this.core) {
                        this.core.update(delta);
                    }
                    this.scenesManager.update(delta);
                }
                resize() {
                    const { innerWidth, innerHeight } = window;
                    this.size.setSize(innerWidth, innerHeight);
                    this.app.renderer.resize(innerWidth, innerHeight);
                }
                initScenes() {
                    if (this.isInitialized)
                        return;
                    this.isInitialized = true;
                    this.core = new core_1.default();
                    this.scenesManager = new scene_manager_1.SceneManager(this.app, this.core, [
                        {
                            name: constants_3.ScenesType.CHEST_SCENE,
                            sceneFactory: () => new chest_scene_1.ChestScene(),
                            gameScene: null,
                        },
                        {
                            name: constants_3.ScenesType.GAME_SCENE,
                            sceneFactory: () => new game_scene_1.GameScene(),
                            gameScene: null,
                        },
                    ], constants_3.ScenesType.GAME_SCENE);
                    this.app.ticker.add(this.mainLoop.bind(this));
                    this.app.ticker.speed = 1;
                    this.core.startGameCycle();
                }
            };
            Size = class Size {
                setSize(width, height) {
                    this.width = width;
                    this.height = height;
                }
            };
            exports_23("Size", Size);
            main = new Main();
            // @ts-ignore
            window.main = main;
            exports_23("default", main);
        }
    };
});
System.register("views/scenes/chest/chest-scene", ["views/scenes/abstract-game-scene", "views/managers/resource-manager", "views/constants", "views/scenes/chest/smoke-emitter-config", "views/scenes/chest/start-shine-config-data", "views/particles/treasures-emitter-config", "core/event-bus", "core/enums", "views/scenes/chest/chest-config", "views/components/prize-text-component", "main"], function (exports_24, context_24) {
    "use strict";
    var abstract_game_scene_2, resource_manager_4, constants_4, smoke_emitter_config_1, start_shine_config_data_1, treasures_emitter_config_2, event_bus_2, enums_3, chest_config_1, prize_text_component_2, main_2, ChestScene;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (abstract_game_scene_2_1) {
                abstract_game_scene_2 = abstract_game_scene_2_1;
            },
            function (resource_manager_4_1) {
                resource_manager_4 = resource_manager_4_1;
            },
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (smoke_emitter_config_1_1) {
                smoke_emitter_config_1 = smoke_emitter_config_1_1;
            },
            function (start_shine_config_data_1_1) {
                start_shine_config_data_1 = start_shine_config_data_1_1;
            },
            function (treasures_emitter_config_2_1) {
                treasures_emitter_config_2 = treasures_emitter_config_2_1;
            },
            function (event_bus_2_1) {
                event_bus_2 = event_bus_2_1;
            },
            function (enums_3_1) {
                enums_3 = enums_3_1;
            },
            function (chest_config_1_1) {
                chest_config_1 = chest_config_1_1;
            },
            function (prize_text_component_2_1) {
                prize_text_component_2 = prize_text_component_2_1;
            },
            function (main_2_1) {
                main_2 = main_2_1;
            }
        ],
        execute: function () {
            ChestScene = class ChestScene extends abstract_game_scene_2.AbstractGameScene {
                constructor() {
                    super(...arguments);
                    this.onTreasureEmitEnd = () => {
                        this.prizeTextComponent.clear();
                        gsap.to(this.chest, {
                            ease: "ease.out",
                            alpha: 0,
                            duration: 1.0,
                            onComplete: () => __awaiter(this, void 0, void 0, function* () {
                                this.switchSceneTo(constants_4.ScenesType.GAME_SCENE);
                                yield event_bus_2.default.publish(enums_3.EventType.ChestSceneCompleted);
                            }),
                        });
                    };
                }
                setup() {
                    this.time = 0;
                    this.count = 0;
                    this.coinStarShineConfig = start_shine_config_data_1.default;
                    this.coinStarShine = [];
                    const { width, height } = main_2.default.size;
                    this.chest = new PIXI.Container();
                    this.ring = resource_manager_4.default.getSpriteCentered(constants_4.RING);
                    this.ring.scale.x = 0.5;
                    this.ring.scale.y = 0.5;
                    this.chest.addChild(this.ring);
                    this.shine = resource_manager_4.default.getSpriteCentered(constants_4.SHINE);
                    this.shine.scale.x = chest_config_1.SHINE_LARGE_SCALE;
                    this.shine.scale.y = chest_config_1.SHINE_LARGE_SCALE;
                    this.chest.addChild(this.shine);
                    this.chestClosed = resource_manager_4.default.getSpriteCentered(constants_4.CHEST_CLOSED);
                    this.chest.addChild(this.chestClosed);
                    this.chestOpened = resource_manager_4.default.getSpriteCentered(constants_4.CHEST_OPEN);
                    this.chestOpened.alpha = 0;
                    this.chestOpened.scale.x = 0.5;
                    this.chestOpened.scale.y = 0.5;
                    this.chest.addChild(this.chestOpened);
                    for (let i = 0; i < this.coinStarShineConfig.length; i++) {
                        const { x, y } = this.coinStarShineConfig[i];
                        const smallCoin = resource_manager_4.default.getSpriteCentered(constants_4.STAR);
                        smallCoin.x = x;
                        smallCoin.y = y;
                        smallCoin.scale.x = chest_config_1.SHINE_SMALL_SCALE;
                        smallCoin.scale.y = chest_config_1.SHINE_SMALL_SCALE;
                        this.coinStarShine.push(smallCoin);
                        this.chestOpened.addChild(smallCoin);
                    }
                    this.chest.x = width / 2;
                    this.chest.y = -this.chest.height;
                    this.sceneContainer.addChild(this.chest);
                    this.prizeTextComponent = new prize_text_component_2.PrizeTextComponent();
                    this.prizeTextComponent.x = width / 2;
                    this.prizeTextComponent.y = height / 2;
                    this.sceneContainer.addChild(this.prizeTextComponent);
                    gsap.to(this.chest, {
                        ease: "bounce.out",
                        x: width / 2,
                        y: height / 2,
                        duration: chest_config_1.CHEST_DROP_TIME,
                        onComplete: this.playOpenAnimation.bind(this),
                    });
                    const tl = gsap.timeline();
                    tl.to(this.chestClosed.scale, {
                        y: 0.9,
                        x: 1,
                        duration: 1,
                        ease: "ease.in",
                    });
                    tl.to(this.chestClosed.scale, {
                        y: 1.1,
                        x: 0.9,
                        duration: 0.8,
                        ease: "ease.out",
                    });
                    tl.to(this.chestClosed.scale, {
                        y: 0.9,
                        x: 1,
                        duration: 1,
                        ease: "ease.in",
                    });
                    tl.to(this.chestClosed.scale, {
                        y: 0.7,
                        x: 1.1,
                        duration: 0.2,
                        ease: "ease.out",
                    });
                }
                teardown() {
                    var _a;
                    this.sceneContainer.removeChildren();
                    this.chestClosed.removeAllListeners();
                    (_a = this.smokeEmitter) === null || _a === void 0 ? void 0 : _a.cleanup();
                }
                playOpenAnimation() {
                    this.smokeEmitter = new PIXI.particles.Emitter(this.chest, [PIXI.Texture.fromImage(constants_4.SMOKE)], smoke_emitter_config_1.default);
                    this.smokeEmitter.playOnceAndDestroy();
                    this.treasuresEmitter = new PIXI.particles.Emitter(this.chest, resource_manager_4.default.getTextures([constants_4.GOLD_RING, constants_4.DIAMOND, constants_4.GOLD_BARS, constants_4.COINS]), treasures_emitter_config_2.default(5000, 5, false));
                    this.treasuresEmitter.playOnceAndDestroy(this.onTreasureEmitEnd);
                    gsap.to(this.chestClosed, {
                        ease: "ease.out",
                        alpha: 0,
                        duration: 1.0,
                    });
                    gsap.to(this.chestOpened, {
                        ease: "ease.in",
                        alpha: 1,
                        duration: 1.0,
                    });
                    gsap.to(this.chestOpened.scale, {
                        ease: "ease.in",
                        x: 1,
                        y: 1,
                        duration: 1.0,
                    });
                    gsap.to(this.ring.scale, {
                        ease: "ease.in",
                        x: chest_config_1.RING_SCALE,
                        y: chest_config_1.RING_SCALE,
                        duration: 1.0,
                    });
                    this.prizeTextComponent.setTargetValue(this.core.winCombo.prize, 8, 100);
                }
                updateShineAlpha(coin) {
                    coin.alpha = 0.7 + Math.cos(0.05 * this.time) / 5;
                }
                updateStarShine(coin, config) {
                    const currentIntensity = Math.sin(config.delay + 0.05 * this.time) / 2 + 1;
                    const scale = chest_config_1.SHINE_SMALL_SCALE * currentIntensity;
                    coin.scale.x = scale;
                    coin.scale.y = scale;
                    coin.rotation = 0.01 * this.time;
                    coin.alpha = currentIntensity;
                }
                update(delta) {
                    if (this.smokeEmitter) {
                        this.smokeEmitter.update(delta * 0.01);
                    }
                    if (this.treasuresEmitter) {
                        this.treasuresEmitter.update(delta * 0.01);
                    }
                    this.time += delta;
                    this.updateShineAlpha(this.shine);
                    for (let i = 0; i < this.coinStarShine.length; i++) {
                        this.updateStarShine(this.coinStarShine[i], this.coinStarShineConfig[i]);
                    }
                    this.chestOpened.scale.x = 1 + Math.sin(0.05 * this.time) * 0.01;
                    this.chestOpened.scale.y = 1 + Math.sin(0.05 * this.time) * 0.01;
                    this.ring.rotation += 0.01 * delta;
                }
                tick() {
                    this.prizeTextComponent.tick();
                }
            };
            exports_24("ChestScene", ChestScene);
        }
    };
});
