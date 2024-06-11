sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.dpz_Ten_Views_Task.controller.View7", {
		backBtn:function(){
			this.getOwnerComponent().getRouter().navTo("View1");
		}
	});
});