import {
  BITMAP_FONT_ATLAS_URL,
  EFFECT_ATLAS_URL,
  GEMS_ATLAS_URL,
  MAIN_ATLAS_URL,
} from "../constants";

class ResourceManager {
  async init() {
    await this.loadAsset(MAIN_ATLAS_URL);
    await this.loadAsset(EFFECT_ATLAS_URL);
    await this.loadAsset(BITMAP_FONT_ATLAS_URL);
    await this.loadAsset(GEMS_ATLAS_URL);
  }

  private loadAsset(asset: string): Promise<void> {
    return new Promise((resolve, reject) => {
      PIXI.loader.add(asset).load(() => {
        resolve();
      });
    });
  }

  getTextures(textureNames: string[]): PIXI.Texture[] {
    const textures: PIXI.Texture[] = [];
    for (let i = 0; i < textureNames.length; i++) {
      textures.push(this.getTexture(textureNames[i]));
    }
    return textures;
  }

  getTexture(name: string): PIXI.Texture {
    let currentAtlas;
    if (name.indexOf("font/") >= 0) {
      currentAtlas = PIXI.loader.resources[BITMAP_FONT_ATLAS_URL];
    } else if (name.indexOf("symbols/") >= 0) {
      currentAtlas = PIXI.loader.resources[EFFECT_ATLAS_URL];
    } else if (name.indexOf("gems/") >= 0) {
      currentAtlas = PIXI.loader.resources[GEMS_ATLAS_URL];
    } else {
      currentAtlas = PIXI.loader.resources[MAIN_ATLAS_URL];
    }

    let texture;
    if (!currentAtlas?.textures) {
      throw new Error("atlas missing textures " + name);
    } else {
      texture = currentAtlas.textures[name];
    }
    if (!texture) {
      throw new Error("problems with the texture: " + name);
    }
    return texture;
  }

  getSprite(name: string): PIXI.Sprite {
    return new PIXI.Sprite(this.getTexture(name));
  }

  getSpriteCentered(name: string): PIXI.Sprite {
    const sprite = this.getSprite(name);
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }
}

const resourceManager = new ResourceManager();
export default resourceManager;
