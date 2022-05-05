/// <reference types="../CTAutocomplete-2.0.4" />
/// <reference lib="es2015" />
import Settings from "./config"
import { TrophyFish, FishImages, gui } from "./constants";

import {
    AdditiveConstraint,
    animate,
    Animations,
    ConstantColorConstraint,
    SiblingConstraint,
    UIRoundedRectangle,
    UIImage,
    Window,
    UIWrappedText
} from "../Elementa";
import { FishImages } from "./constants";

let reloadImages = false;
const File = Java.type("java.io.File");
const Color = Java.type("java.awt.Color");
const mainHUD = new Window();
let guiIsSelected = false;

if (Settings.saveData !== "") {
    TrophyFish = JSON.parse(Settings.saveData);
}

if (!Settings.firstRun) {
    const image1 = new Image("sulphur_skitter.png", "https://dawjaw.net/static/sulphur_skitter.png");
    const image2 = new Image("obfuscated_fish_1.png", "https://dawjaw.net/static/obfuscated_fish_1.png");
    const image3 = new Image("steaming_hot_flounder.png", "https://dawjaw.net/static/steaming_hot_flounder.png");
    const image4 = new Image("gusher.png", "https://dawjaw.net/static/gusher.png");
    const image5 = new Image("blobfish.png", "https://dawjaw.net/static/blobfish.png");
    const image6 = new Image("obfuscated_fish_2.png", "https://dawjaw.net/static/obfuscated_fish_2.png");
    const image7 = new Image("slugfish.png", "https://dawjaw.net/static/slugfish.png");
    const image8 = new Image("flyfish.png", "https://dawjaw.net/static/flyfish.png");
    const image9 = new Image("obfuscated_fish_3.png", "https://dawjaw.net/static/obfuscated_fish_3.png");
    const image10 = new Image("lava_horse.png", "https://dawjaw.net/static/lava_horse.png");
    const image11 = new Image("mana_ray.png", "https://dawjaw.net/static/mana_ray.png");
    const image12 = new Image("volcanic_stonefish.png", "https://dawjaw.net/static/volcanic_stonefish.png");
    const image18 = new Image("vanille.png", "https://dawjaw.net/static/vanille.png");
    const image13 = new Image("skeleton_fish.png", "https://dawjaw.net/static/skeleton_fish.png");
    const image14 = new Image("moldfin.png", "https://dawjaw.net/static/moldfin.png");
    const image16 = new Image("soul_fish.png", "https://dawjaw.net/static/soul_fish.png");
    const image15 = new Image("karate_fish.png", "https://dawjaw.net/static/karate_fish.png");
    const image17 = new Image("golden_fish.png", "https://dawjaw.net/static/golden_fish.png");

    const imageBronze1 = new Image("bronze_trophy.png", "https://dawjaw.net/static/bronze_trophy.png");
    const imageSilver1 = new Image("silver_trophy.png", "https://dawjaw.net/static/silver_trophy.png");
    const imageGold1 = new Image("gold_trophy.png", "https://dawjaw.net/static/gold_trophy.png");
    const imageDiamond1 = new Image("diamond_trophy.png", "https://dawjaw.net/static/diamond_trophy.png");
    Settings.firstRun = true;

    ChatLib.chat("§eWelcome to the Trophy Fish HUD!§r");
    ChatLib.chat("§2You can open the settigns via /trophyfish or /tf§r");
    ChatLib.chat("§2Move the HUD via /trophyhud§r");
}

const TrophyBronze = new File(`config/ChatTriggers/images/bronze_trophy.png`);
const TrophySilver = new File(`config/ChatTriggers/images/silver_trophy.png`);
const TrophyGold = new File(`config/ChatTriggers/images/gold_trophy.png`);
const TrophyDiamond = new File(`config/ChatTriggers/images/diamond_trophy.png`);

this.gui.registerDraw((x, y) => this.mainHUD.draw());
this.gui.registerClicked((x, y, b) => this.mainHUD.mouseClick(x, y, b));
this.gui.registerMouseDragged((x, y, b) => this.mainHUD.mouseDrag(x, y, b));
this.gui.registerScrolled((x, y, s) => this.mainHUD.mouseScroll(s));
this.gui.registerMouseReleased((x, y, b) => this.mainHUD.mouseRelease());

function guiMover() {
    if (gui.isOpen()) {
        Renderer.drawRect(
            Renderer.color(0, 0, 0, 70),
            0,
            0,
            Renderer.screen.getWidth(),
            Renderer.screen.getHeight()
        );
    }
}

function createHUDOverlay() {
    let elements = [];
    const dragOffset = { x: 0, y: 0 };

    const mainUIContainer = new UIRoundedRectangle(3)
        .setX((Settings.x).pixels())
        .setY((Settings.y).pixels())
        .setWidth((370).pixels())
        .setHeight((75).pixels())
        .setColor(new ConstantColorConstraint(new Color(207 / 255, 207 / 255, 196 / 255, 0.3)));
    
    TrophyFish.forEach((fish, index) => {
        let visible = false;

        const file = new File(`config/ChatTriggers/images/${FishImages[index]["location"]}`);

        const image1 = UIImage.Companion.ofFile(file)
            .setX(new AdditiveConstraint(new SiblingConstraint(), (5).pixels()))
            .setY((3).pixels())
            .setWidth((15).pixels())
            .setHeight((15).pixels())
            .setChildOf(mainUIContainer);

        const bronzeTrophy = UIImage.Companion.ofFile(TrophyBronze)
            .setX(((20*index)+5).pixels())
            .setY((22).pixels())
            .setWidth((12).pixels())
            .setHeight((12).pixels())
            .setChildOf(mainUIContainer);
        if (!fish.bronze) {
            bronzeTrophy.setColor(new ConstantColorConstraint(new Color(100 / 255, 100 / 255, 100 / 255, 0.3)))
        }

        const silverTrophy = UIImage.Companion.ofFile(TrophySilver)
            .setX(((20*index)+5).pixels())
            .setY((34).pixels())
            .setWidth((12).pixels())
            .setHeight((12).pixels())
            .setChildOf(mainUIContainer);
        if (!fish.silver) {
            silverTrophy.setColor(new ConstantColorConstraint(new Color(100 / 255, 100 / 255, 100 / 255, 0.3)))
        }

        const goldTrophy = UIImage.Companion.ofFile(TrophyGold)
            .setX(((20*index)+5).pixels())
            .setY((46).pixels())
            .setWidth((12).pixels())
            .setHeight((12).pixels())
            .setChildOf(mainUIContainer);
        if (!fish.gold) {
            goldTrophy.setColor(new ConstantColorConstraint(new Color(100 / 255, 100 / 255, 100 / 255, 0.3)))
        }

        const diamondTrophy = UIImage.Companion.ofFile(TrophyDiamond)
            .setX(((20*index)+5).pixels())
            .setY((58).pixels())
            .setWidth((12).pixels())
            .setHeight((12).pixels())
            .setChildOf(mainUIContainer);
        if (!fish.diamond) {
            diamondTrophy.setColor(new ConstantColorConstraint(new Color(100 / 255, 100 / 255, 100 / 255, 0.3)))
        }

        const textBackground = new UIRoundedRectangle(3)
            .setX(((20*index)+5).pixels())
            .setY((17).pixels())
            .setWidth((105).pixels())
            .setHeight((50).pixels())
            .setColor(new ConstantColorConstraint(new Color(100 / 255, 100 / 255, 100 / 255, 0.95)));

        const textElement = new UIWrappedText(`§5${fish.name}§r\n${fish.description}`, true)
            .setX((5).pixels())
            .setY((5).pixels())
            .setWidth((100).pixels())
            .setHeight((100).pixels())
            .setColor(new ConstantColorConstraint(new Color(255 / 255, 255 / 255, 0 / 255, 1)))
            .setChildOf(textBackground);
        
        image1.onMouseEnter((comp) => {
            if(!visible) {
                mainUIContainer.addChild(textBackground);
                visible = true;
            }
        })
        .onMouseLeave((comp) => {
            if(visible) {
                mainUIContainer.removeChild(textBackground);
                visible = false;
            }
        })
        elements.push(image1);
    });

    mainUIContainer
        .onMouseClick((comp, event) => {
            guiIsSelected = true;
            dragOffset.x = event.absoluteX;
            dragOffset.y = event.absoluteY;
        })
        .onMouseRelease(() => {
            guiIsSelected = false;
        })
        .onMouseDrag((comp, mx, my) => {
            if (!guiIsSelected) return;
            const absoluteX = mx + comp.getLeft();
            const absoluteY = my + comp.getTop();
            const dx = absoluteX - dragOffset.x;
            const dy = absoluteY - dragOffset.y;
            dragOffset.x = absoluteX;
            dragOffset.y = absoluteY;
            const newX = mainUIContainer.getLeft() + dx;
            const newY = mainUIContainer.getTop() + dy;
            mainUIContainer.setX(newX.pixels());
            mainUIContainer.setY(newY.pixels());
            Settings.x = newX;
            Settings.y = newY;
            Settings.save();
        })
        .onMouseLeave((comp) => {
            if(!gui.isOpen()) return;
            animate(comp, (animation) => {
              animation.setColorAnimation(
                Animations.OUT_EXP,
                0.5,
                new ConstantColorConstraint(
                    new Color(207 / 255, 207 / 255, 196 / 255, 0.3)
                )
              );
            });
        })
        .onMouseEnter((comp) => {
            if(!gui.isOpen()) return;
            animate(comp, (animation) => {
                animation.setColorAnimation(
                    Animations.OUT_EXP,
                    0.5,
                    new ConstantColorConstraint(
                        new Color(255 / 255, 255 / 255, 0 / 255)
                    ),
                    0
                );
            });
        })  
        
    return mainUIContainer;
}

let foregroundHUD = createHUDOverlay();

mainHUD.addChildren(foregroundHUD);

register('step', () => {
    let inventoryName = Player?.getContainer()?.getName()?.toString();
    if(inventoryName === "Trophy Fishing") {
        let oldfishData = JSON.stringify(TrophyFish);
        for (i = 0; i < 54; i++) {
            let stack = Player.getContainer().getStackInSlot(i);
            let name = ChatLib.removeFormatting(stack?.getName()?.toString());
            if(name === "") continue;
            if (TrophyFish.find(fish => fish.name === name)) {
                let fish = TrophyFish.find(fish => fish.name === name);
                stack.getLore().forEach(lore => {
                    let loreNF = ChatLib.removeFormatting(lore);
                    if(ChatLib.removeFormatting(lore)) {
                        if(loreNF.includes("Bronze ✔")) {
                            fish.bronze = true;
                        } 
                        if(loreNF.includes("Silver ✔")) {
                            fish.silver = true;
                        }
                        if(loreNF.includes("Gold ✔")) {
                            fish.gold = true;
                        }
                        if(loreNF.includes("Diamond ✔")) {
                            fish.diamond = true;
                        }
                    }
                });
                TrophyFish.splice(TrophyFish.indexOf(fish), 1, fish);
            }
        }
        if(oldfishData !== JSON.stringify(TrophyFish)) {
            let fishJSON = JSON.stringify(TrophyFish);
            Settings.saveData = fishJSON;
            Settings.save();
            mainHUD.removeChild(foregroundHUD);
            foregroundHUD = createHUDOverlay();
            mainHUD.addChildren(foregroundHUD);
        }
    }
}).setFps(3);

register('chat', (key) => {
    let splitKey = key.split(" ");
    const trophy = splitKey[splitKey.length - 1];
    const fishName = key.replace(`${trophy}`, "").trim();
    const oldfishData = JSON.stringify(TrophyFish);
    if(TrophyFish.find(fish => fish.name === fishName)) {
        let fish = TrophyFish.find(fish => fish.name === fishName);
        if(trophy === "BRONZE") {
            fish.bronze = true;
        }
        if(trophy === "SILVER") {
            fish.silver = true;
        }
        if(trophy === "GOLD") {
            fish.gold = true;
        }
        if(trophy === "DIAMOND") {
            fish.diamond = true;
        }
    }
    if(oldfishData !== JSON.stringify(TrophyFish)) {    
        let fishJSON = JSON.stringify(TrophyFish);
        Settings.saveData = fishJSON;
        Settings.save();
        mainHUD.removeChild(foregroundHUD);
        foregroundHUD = createHUDOverlay();
        mainHUD.addChildren(foregroundHUD);
    }
}).setCriteria("TROPHY FISH! You caught a ${KEY}.");

register('renderOverlay', () => {
    guiMover();
    if(foregroundHUD && Settings.enabled) {
        mainHUD.draw();
    }
});

register("command", () => GuiHandler.openGui(gui)).setName("trophyhud");
register("command", () => Settings.openGUI()).setName("trophyfish");
register("command", () => Settings.openGUI()).setName("tf");