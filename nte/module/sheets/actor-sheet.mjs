export class NteActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["nte", "sheet", "actor"],
        template: "systems/nte/templates/actor/actor-sheet.html",
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
      });
    }
  
    /** @override */
    get template() {
      return `systems/nte/templates/actor/actor-${this.actor.data.type}-sheet.hbs`;
    };

    getData(){
      const context = super.getData()
      const actorData = context.actor.data
      context.data = actorData.data

      if (actorData.type == 'character'){
        this._prepareItems(context)

      };

      if (actorData.type == 'challenges'){
        this._prepareChallenges(context)
      };

      if (actorData.type == 'setting'){
        this._prepareSetting(context)
      };


      return context
    };

_prepareItems(context){
  const misfortunes = []
  const lessons = []
  const resources = []

for(let i of context.items){
  i.img == i.img || DEFAULT_TOKEN;


  if (i.type === "misfortune"){
    misfortunes.push(i)

  };
  if (i.type === 'lesson'){
    lessons.push(i)

  };

  if (i.type === 'resource'){
    resources.push(i)
  };

  context.misfortunes = misfortunes;
  context.lessons = lessons;
  context.resources = resources;

};

};

_prepareChallenges(context){

const tests = []
const misfortunes = []
const complications = []

for (let i of context.items){
  i.img == i.img || DEFAULT_TOKEN;

  if (i.type === 'test'){
    tests.push(i)
  };
  if (i.type === "misfortune"){
    misfortunes.push(i)
  };
  if (i.type === 'complication'){
    complications.push(i)
  };


  context.tests = tests;
  context.misfortunes = misfortunes;
  context.complications = complications;

};  

};

_prepareSetting(context){
  const traits = []
  const resources = []
  const tests = []

  for(let i of context.items){
    i.img == i.img || DEFAULT_TOKEN;
  
    if (i.type === 'trait'){
      traits.push(i)
  
    };
    if (i.type === 'resource'){
      resources.push(i)
  
    };
    if (i.type === 'test'){
      tests.push(i)
  
    };
  context.traits = traits;
  context.resources = resources;

};

};

activateListeners(html) {
  super.activateListeners(html);

  // Everything below here is only needed if the sheet is editable
  if (!this.options.editable) return;

  // Add Inventory Item
  html.find('.item-create').click(this._onItemCreate.bind(this));

  // Update Inventory Item
  html.find('.item-edit').click(ev => {
    const li = $(ev.currentTarget).parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    item.sheet.render(true);
  });

  // Delete Inventory Item
  html.find(".item-delete").click((ev) => {
    const li = $(ev.currentTarget).parents(".item");
    this._deleteOwnedItemById(li.data("item-id"));
    li.slideUp(200, () => this.render(false));
});
};
async _onItemCreate(event) {
  event.preventDefault();
  const header = event.currentTarget;
  // Get the type of item to create.
  const type = header.dataset.type;
  // Grab any data associated with this control.
  const data = duplicate(header.dataset);
  // Initialize a default name.
  const name = `New ${type.capitalize()}`;
  // Prepare the item object.
  const itemData = {
    name: name,
    type: type,
    data: data
  };
  // Remove the type from the dataset since it's in the itemData.type prop.
  delete itemData.data["type"];

  // Finally, create the item!
  return await Item.create(itemData, {parent: this.actor});
};

async _deleteOwnedItemById(_itemId) {
  await this.actor.deleteEmbeddedDocuments("Item", [_itemId]);
};

};