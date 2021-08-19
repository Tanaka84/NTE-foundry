import {nte} from "./config.mjs"
import {NteActorSheet} from "./sheets/actor-sheet.mjs"
import {NteItemSheet} from  "./sheets/item-sheet.mjs"
import { NteActor } from "./documents/actor.mjs";
import { NteItem } from "./documents/item.mjs";
import {addWhite} from "./bag/bag.mjs"
import {addBlack} from "./bag/bag.mjs"
import {addRandom} from "./bag/bag.mjs"
import {emptyBag} from "./bag/bag.mjs"
import {checkBag} from "./bag/bag.mjs"
import {drawToken} from "./bag/bag.mjs"
import { addBlind } from "./bag/bag.mjs";

Hooks.once('init', function() {
console.log('This is Not The End!, have fun gaming.')
game.nte = {
  NteActor,
  NteItem


}


CONFIG.nte = nte
CONFIG.Combat.initative = {
    formula: "1d12",
    decimals: 1
};


Actors.unregisterSheet("core", ActorSheet);
Actors.registerSheet("nte", NteActorSheet, { makeDefault: true });
Items.unregisterSheet("core", ItemSheet);
Items.registerSheet("nte", NteItemSheet, { makeDefault: true });
});

Hooks.on("getSceneControlButtons", (controls) => {
  let group = controls.find((b) => b.name == "token");
  group.tools.push(
    {
      name: "add White Token",
      title: "Add White",
      icon: "fas fa-plus",
      buttons: true,
      onClick: () => {
        addWhite();
      },
    },
    {
      name: "add Black Token",
      title: "Add Black",
      icon: "fas fa-plus-circle",
      buttons: true,
      onClick: () => {
        addBlack();
      },
    },
    {
      name: "add Random",
      title: "Add Random",
      icon: "fas fa-question",
      buttons: true,
      onClick: () => {
        addRandom();
      },
    },
    {
      name: "add Blind",
      title: "Add Blind",
      icon: "fas fa-eye",
      buttons: true,
      onClick: () => {
        addBlind();
      },
    },
    {
      name: "Check Bag",
      title: "Check Bag",
      icon: "fas fa-shopping-bag",
      buttons: true,
      onClick: () => {
        checkBag();
      },
    },
    {
      name: "Draw Bag",
      title: "Draw Token",
      icon: "fas fa-hand-paper",
      buttons: true,
      onClick: () => {
        drawToken();
      },
    },
    {
      name: "Empty Bag",
      title: "Empty Bag",
      icon: "fas fa-eraser",
      buttons: true,
      onClick: () => {
        emptyBag();
      },
    },
  );
  Hooks.once("renderSidebarTab", function() {
  if(!game.journal.getName("_bag_"))
  {
    JournalEntry.create({name : "_bag_"})
  } 
}  
)

Hooks.on("ready", function() {
if (game.user.isGM){
game.journal.getName("_bag_").update({
  permission: {
    default: CONST.ENTITY_PERMISSIONS.OWNER
  },
});

}})
})
