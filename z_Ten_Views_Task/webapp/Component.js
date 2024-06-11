sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/dpz_Ten_Views_Task/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("com.dpz_Ten_Views_Task.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			var oModel = new JSONModel("model/TenViews.json");
			this.setModel(oModel, "TenDataModel");
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			this.getRouter().initialize();
		}
	});
});