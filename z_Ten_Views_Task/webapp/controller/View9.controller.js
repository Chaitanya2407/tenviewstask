sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.dpz_Ten_Views_Task.controller.View9", {
		backBtn:function(){
			this.getOwnerComponent().getRouter().navTo("View1");
		},
	
		onInit:function(){
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View9").attachPatternMatched(this.onRouteMatched, this);
		},
		
		onRouteMatched:function(oEvent){
			var objectStudentName = oEvent.getParameter("arguments").studentForm1Object;
			if(objectStudentName !== undefined){
				var payload = JSON.parse(objectStudentName);
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().studentArray.push(payload);
				oModel.refresh(true);
			}else{
				var oModelE = this.getOwnerComponent().getModel("TenDataModel");
				oModelE.refresh(true);
			}
		},
		
		onTableRowPress:function(oEvent){
			debugger;
			var oModelE = this.getOwnerComponent().getModel("TenDataModel");
			var object = oEvent.getSource().getBindingContext("TenDataModel").getObject();
			var keys = object.oStudentSubjectKeys;
		
 		oModelE.setProperty("/SelectedRow",object);
			
			if(!this.tablein9){
				this.tablein9 = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.tablein9", this);
				this.getView().addDependent(this.tablein9);
			}
			var oModel = this.getOwnerComponent().getModel("TenDataModel");
			if(object.oStudentClass === "8Th")
			{
				sap.ui.getCore().byId("inputClass8Form1").setSelected(true);
			}
			if(object.oStudentClass === "9Th")
			{
				sap.ui.getCore().byId("inputClass9Form1").setSelected(true);
			}
			if(object.oStudentClass === "10Th")
			{
				sap.ui.getCore().byId("inputClass10Form1").setSelected(true);
			}
				oModel.refresh(true);
				
				sap.ui.getCore().byId("inputSubjectForm1").setSelectedKeys(keys);
				
			this.tablein9.open();
		},
		
		onCloseFn1:function(){
			this.tablein9.close();
		},
		
		onListClick:function(oEvent){
			debugger;
			var oModel = this.getOwnerComponent().getModel("TenDataModel");
			var object = oEvent.getSource().getBindingContext("TenDataModel").getObject();
			oModel.setProperty("/SelectedList", object);
			
			if(!this.listin9){
				this.listin9 = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.listin9", this);
				this.getView().addDependent(this.listin9);
			}
			oModel.refresh(true);
			this.listin9.open();
		},
		
		onCloseFn2:function(){
			this.listin9.close();
		},
		
		onSaveFragment1:function(){
			debugger;
			var studentName = sap.ui.getCore().byId("inputNameForm1").getValue();
			var studentNameRollNo = sap.ui.getCore().byId("inputRollNoForm1").getValue();
			var studentMobileNumber = sap.ui.getCore().byId("inputMobileNoForm1").getValue();
			
			var studentClass8 = sap.ui.getCore().byId("inputClass8Form1").getSelected();
			if(studentClass8 === true)
			{
				var studentClass8Value = sap.ui.getCore().byId("inputClass8Form1").getText();
			}
			
			var studentClass9 = sap.ui.getCore().byId("inputClass9Form1").getSelected();
			if(studentClass9 === true)
			{
				var studentClass9Value = sap.ui.getCore().byId("inputClass9Form1").getText();
			}
			
			var studentClass10 = sap.ui.getCore().byId("inputClass10Form1").getSelected();
			if(studentClass10 === true)
			{
				var studentClass10Value = sap.ui.getCore().byId("inputClass10Form1").getText();
			}
			
			var studentLanguage = sap.ui.getCore().byId("inputLanguageForm1").getValue();
			
			var studentSubject = sap.ui.getCore().byId("inputSubjectForm1").getSelectedItems();
			var studentSubjectKeys = sap.ui.getCore().byId("inputSubjectForm1").getSelectedKeys();
			var subjetValues = [];
			for(var i = 0; i < studentSubject.length; i++){
				var getStudentSubject = studentSubject[i].getText();
				subjetValues.push(getStudentSubject);
			}
			
			var validStudentName = /^[a-zA-Z\s]+$/;
			var validStudentRollNo = /^\d[2,4]{1}[0-9]{8}$/;
			var validStudentMobileNumber = /^[6-9]{1}[0-9]{9}$/;
			
			if(studentName.match(validStudentName)){
				sap.ui.getCore().byId("inputNameForm1").setValueState("None");
			}else{
				sap.ui.getCore().byId("inputNameForm1").setValueState("Error");
				sap.ui.getCore().byId("inputNameForm1").setValueStateText("Please Enter Correct Name");
			}
			
			if(studentNameRollNo.match(validStudentRollNo)){
				sap.ui.getCore().byId("inputRollNoForm1").setValueState("None");
			}else{
				sap.ui.getCore().byId("inputRollNoForm1").setValueState("Error");
				sap.ui.getCore().byId("inputRollNoForm1").setValueStateText("Please Enter Correct Roll No Starts With 24 and 8 Unique Digits");
			}
			
			if(studentMobileNumber.match(validStudentMobileNumber)){
				sap.ui.getCore().byId("inputMobileNoForm1").setValueState("None");
			}else{
				sap.ui.getCore().byId("inputMobileNoForm1").setValueState("Error");
				sap.ui.getCore().byId("inputMobileNoForm1").setValueStateText("Please Enter Correct Mobile Number");
			}
			
			if((studentClass8 === true) || (studentClass9 === true) || (studentClass10 === true)){
				sap.ui.getCore().byId("inputClass8Form1").setValueState("None");
				sap.ui.getCore().byId("inputClass9Form1").setValueState("None");
				sap.ui.getCore().byId("inputClass10Form1").setValueState("None");
			}else{
				sap.ui.getCore().byId("inputClass8Form1").setValueState("Error");
				sap.ui.getCore().byId("inputClass9Form1").setValueState("Error");
				sap.ui.getCore().byId("inputClass10Form1").setValueState("Error");
			}
			
			if(studentLanguage !== ""){
				sap.ui.getCore().byId("inputLanguageForm1").setValueState("None");
			}else{
				sap.ui.getCore().byId("inputLanguageForm1").setValueState("Error");
				sap.ui.getCore().byId("inputLanguageForm1").setValueStateText("Please Select Language");
			}
			
			if(studentSubject.length  !== 0){
				sap.ui.getCore().byId("inputSubjectForm1").setValueState("None");
			}else{
				sap.ui.getCore().byId("inputSubjectForm1").setValueState("Error");
				sap.ui.getCore().byId("inputSubjectForm1").setValueStateText("Please Select Subjects");
			}
			
			if((studentName.match(validStudentName)) && (studentNameRollNo.match(validStudentRollNo)) &&
			(studentMobileNumber.match(validStudentMobileNumber)) && ((studentClass8 === true) || (studentClass9 === true) || (studentClass10 === true)) &&
			(studentLanguage !== "") && (studentSubject.length  !== 0)){
				
				MessageToast.show("Data Saves Successfully");
				
				var studentFragment1Object = {
					oStudentName : studentName,
					oStudentRollNo : studentNameRollNo,
					oStudentMobileNo : studentMobileNumber,
					oStudentClass : studentClass8Value || studentClass9Value || studentClass10Value,
					oStudentLanguage : studentLanguage,
					oStudentSubject : subjetValues,
					oStudentSubjectKeys : studentSubjectKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().studentArray;
				
				for(i = 0; i < old.length; i++){
					if(old[i].oStudentRollNo === studentNameRollNo){
						var oldValue = old[i];
						Object.assign(oldValue, studentFragment1Object);
					}
				}
				this.tablein9.close();
				oModel.refresh(true);
			}
		}
	});
});