export const MAIN_ATLAS_URL = "./static/atlases/main/main.json";

class Resources {
    async init() {
        await this.loadAsset(MAIN_ATLAS_URL);
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
        let currentAtlas = PIXI.loader.resources[MAIN_ATLAS_URL];

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

const resources = new Resources();
export default resources;