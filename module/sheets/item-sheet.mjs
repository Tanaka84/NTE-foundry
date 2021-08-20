export class NteItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["boilerplate", "sheet", "item"],
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
      };
  
    /** @override */
    get template() {
      return `systems/nte/templates/item/item-${this.item.data.type}-sheet.hbs`;
    };

    getData() {
      const context  = super.getData();
      const itemData = context.item.data
      context.data = itemData.data
      context.config = CONFIG.nte

      return context;
    };

};