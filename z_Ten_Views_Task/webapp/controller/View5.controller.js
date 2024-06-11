sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/Input",
	"sap/m/Button",
	 "sap/m/Select",
	 "sap/m/DatePicker",
	 "sap/m/MultiComboBox",
	 "sap/m/CheckBox"
], function(Controller, MessageToast, MessageBox, SimpleForm, Label, Input, Button, Select, DatePicker, MultiComboBox, CheckBox) {
	"use strict";

	return Controller.extend("com.dpz_Ten_Views_Task.controller.View5", {
		
		onInit:function(){
			debugger;
			
				if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
				}
				
				
			var EmployeeEditForm = new SimpleForm({
					editable: true,
	                layout: "ResponsiveGridLayout",
	                labelSpanXL:5, labelSpanL:4, labelSpanM:5, labelSpanS:3, emptySpanXL:4,
					emptySpanL:4, emptySpanM:6, emptySpanS:3, columnsXL:6, columnsL:3, columnsM:3,
                content: [
                    new Label({ text: "Employee Id", required:true }),
                	new Input({ placeholder: "Employee Id", id:"iconTableEmpId"} ),
                	new Label({ text: "Graduation College Name", required:true }),
                    new Input({ placeholder: "Graduation College Name", id:"iconTableEmpGradName" }),
                    new Label({ text: "Working Company Name", required:true }),
                    new Input({ placeholder: "Working Company Name", id:"iconTableEmpWorkCompanyName" }),
                	new Label({ text: "Work Experience", required:true}),
                    new Select({id:"iconTableEmpWorkExperience",  forceSelection:false, items: {
                            path: "TenDataModel>/Experience",
                            template: new sap.ui.core.Item({ key: "{TenDataModel>key}", text: "{TenDataModel>text}" })
                    	}
                    }),
                    new Label({ text: "Date of Joined", required:true}),
                    new DatePicker({displayFormat:"dd.MM.YYYY", id:"iconTableEmpJoinedDate"}),
                    new Label({ text: "Technical Skills", required:true}),
                    new MultiComboBox({id:"iconTableEmpTechnicalSkills", placeholder: "Technical Skills", items: {
                            path: "TenDataModel>/employeeMultiComboBoxJob",
                            template: new sap.ui.core.Item({ key: "{TenDataModel>key}", text: "{TenDataModel>text}" })
                        }
                    }),
                    new Label({ required:true}),
                    new CheckBox({text: "Agree Terms & Conditions", id:"agreeTableCheckBox"}),
                    new Button({
                        text: "Submit",
                        id:"dynSaveButton6",
                        type:"Emphasized",
                        press: this.iconSaveButton6.bind(this)
                    })
                ]
			});
			
				var oForm = sap.ui.getCore().byId("iconDynamicForm");
	            oForm.addItem(EmployeeEditForm);
	            
	            var oButton = sap.ui.getCore().byId("saveButton6");
	            var getButton = sap.ui.getCore().byId("dynSaveButton6");
	            oButton.addItem(getButton);
		},
		
		onRowTablePress1:function(oEvent){
			debugger;
			
				if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
				}
				var getObject = oEvent.getSource().getBindingContext("TenDataModel").getObject();
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.setProperty("/form1entity", getObject);
				
				if(getObject.oEmpGender === "Male")
				{
					sap.ui.getCore().byId("iconGenderTableMale").setSelected(true);
				}
				if(getObject.oEmpGender === "Female")
				{
					sap.ui.getCore().byId("iconGenderTableFemale").setSelected(true);
				}
				
				var hobbyKeys = getObject.oHobbiesKeys;
				sap.ui.getCore().byId("iconEmpHobbies").setSelectedKeys(hobbyKeys);
				
				this.iconTab.open();
				                  
		},
		
		onCloseFn1:function(){
			this.iconTab.close();
		},
		
		iconSaveButton1:function(){
			debugger;
			var iconEmpName = sap.ui.getCore().byId("iconTableEmpName").getValue();
			var iconEmpEmailId = sap.ui.getCore().byId("iconEmpEmailId").getValue();
			var iconEmpMobileNo = sap.ui.getCore().byId("iconEmpMobileNo").getValue();
			var iconGenderMale = sap.ui.getCore().byId("iconGenderTableMale").getSelected();
			if(iconGenderMale === true){
				var iconEmpMale = sap.ui.getCore().byId("iconGenderTableMale").getText();
			}
			
			var iconGenderFemale = sap.ui.getCore().byId("iconGenderTableFemale").getSelected();
			if(iconGenderFemale === true){
				var iconEmpFemale = sap.ui.getCore().byId("iconGenderTableFemale").getText();
			}
			var iconEmpHobbies = sap.ui.getCore().byId("iconEmpHobbies").getSelectedItems();
			var iconEmpHobbiesKeys = sap.ui.getCore().byId("iconEmpHobbies").getSelectedKeys();
			var EmpHobbies = [];
			for(var i = 0; i < iconEmpHobbies.length; i++){
				var selectedHobbies = iconEmpHobbies[i].getText();
				EmpHobbies.push(selectedHobbies);
			}
			var iconEmpAge = sap.ui.getCore().byId("iconEmpAge").getValue();
			
			var validEmpName = /^[a-zA-Z\s]+$/;
			var validEmpEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validPersonMobileNo = /^[6-9]{1}[0-9]{9}$/;
			
			if(iconEmpName.match(validEmpName)){
				sap.ui.getCore().byId("iconTableEmpName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpName").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpName").setValueStateText("Please Enter Correct Name");
			}
			
			if(iconEmpEmailId.match(validEmpEmailId)){
				sap.ui.getCore().byId("iconEmpEmailId").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpEmailId").setValueState("Error");
				sap.ui.getCore().byId("iconEmpEmailId").setValueStateText("Please Enter Correct Email Id");
			}
			
			if(iconEmpMobileNo.match(validPersonMobileNo)){
				sap.ui.getCore().byId("iconEmpMobileNo").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpMobileNo").setValueState("Error");
				sap.ui.getCore().byId("iconEmpMobileNo").setValueStateText("Please Enter Correct Mobile Number");
			}
			
			if(iconGenderMale === true || iconGenderFemale === true){
				sap.ui.getCore().byId("iconGenderTableMale").setValueState("None");
				sap.ui.getCore().byId("iconGenderTableFemale").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconGenderTableMale").setValueState("Error");
				sap.ui.getCore().byId("iconGenderTableFemale").setValueState("Error");
			}
			
			if(iconEmpHobbies.length !== 0){
				sap.ui.getCore().byId("iconEmpHobbies").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpHobbies").setValueState("Error");
				sap.ui.getCore().byId("iconEmpHobbies").setValueStateText("Please Select Hobbies");
			}
			
			if(iconEmpAge !== ""){
				sap.ui.getCore().byId("iconEmpAge").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpAge").setValueState("Error");
				sap.ui.getCore().byId("iconEmpAge").setValueStateText("Please Select Age");
			}
			
			if((iconEmpName.match(validEmpName)) && (iconEmpEmailId.match(validEmpEmailId)) && (iconEmpMobileNo.match(validPersonMobileNo)) &&
			(iconGenderMale === true || iconGenderFemale === true) && (iconEmpHobbies.length !== 0) && (iconEmpAge !== "")){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeF1 = {
					oEmpName : iconEmpName,
					oEmpEmailId : iconEmpEmailId,
					oEmpMobileNo : iconEmpMobileNo,
					oEmpGender : iconEmpMale || iconEmpFemale,
					oEmpHobbies : EmpHobbies,
					oEmpAge : iconEmpAge,
					oHobbiesKeys : iconEmpHobbiesKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().iconEmployee1;
				
				for(i = 0; i < old.length; i++){
						var oldValue = old[i];
						Object.assign(oldValue, objectEmployeeF1);
				}
				this.iconTab.close();
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
				
			}
		},
		
		onRowTablePress2:function(oEvent){
			debugger;
			if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
			}
			
			sap.ui.getCore().byId("simpleForm2View1").setVisible(true);
			sap.ui.getCore().byId("saveButton2").setVisible(true);
			sap.ui.getCore().byId("iconForm1").setVisible(false);
			sap.ui.getCore().byId("saveButton1").setVisible(false);
			sap.ui.getCore().byId("panelForm").setVisible(false);
			sap.ui.getCore().byId("saveButton3").setVisible(false);
			sap.ui.getCore().byId("vboxForm").setVisible(false);
			sap.ui.getCore().byId("saveButton4").setVisible(false);
			sap.ui.getCore().byId("gridLayoutForm").setVisible(false);
			sap.ui.getCore().byId("saveButton5").setVisible(false);
			sap.ui.getCore().byId("iconDynamicForm").setVisible(false);
			sap.ui.getCore().byId("saveButton6").setVisible(false);
			
			var getObject = oEvent.getSource().getBindingContext("TenDataModel").getObject();
			var oModel = this.getOwnerComponent().getModel("TenDataModel");
			oModel.setProperty("/form2entity", getObject);
				
		
			this.iconTab.open();	
		},
		
		iconSaveButton2:function(){
			debugger;
			var iconEmpDNo = sap.ui.getCore().byId("iconEmpDNo").getValue();
			var iconEmpBuildStreetName = sap.ui.getCore().byId("iconEmpBuildStreetName").getValue();
			var iconEmpLandmark = sap.ui.getCore().byId("iconEmpLandmark").getValue();
			var iconEmpState = sap.ui.getCore().byId("iconEmpState").getValue();
			var iconEmpCity = sap.ui.getCore().byId("iconEmpCity").getValue();
			var iconEmpPincode = sap.ui.getCore().byId("iconEmpPincode").getValue();
			var iconEmpDistrict = sap.ui.getCore().byId("iconEmpDistrict").getValue();
			
			var validDNo = /^[0-9]+[/]?[0-9]+$/;
			var validName = /^[a-zA-Z\s]+$/;
			var validPincode = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
			
			if(iconEmpDNo.match(validDNo)){
				sap.ui.getCore().byId("iconEmpDNo").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpDNo").setValueState("Error");
				sap.ui.getCore().byId("iconEmpDNo").setValueStateText("Please Enter Correct D-NO");
			}
			
			if(iconEmpBuildStreetName.match(validName)){
				sap.ui.getCore().byId("iconEmpBuildStreetName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpBuildStreetName").setValueState("Error");
				sap.ui.getCore().byId("iconEmpBuildStreetName").setValueStateText("Please Enter Correct Street Name");
			}
			
			if(iconEmpLandmark.match(validName)){
				sap.ui.getCore().byId("iconEmpLandmark").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpLandmark").setValueState("Error");
				sap.ui.getCore().byId("iconEmpLandmark").setValueStateText("Please Enter Correct Landmark");
			}
			
			if(iconEmpState !== ""){
				sap.ui.getCore().byId("iconEmpState").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpState").setValueState("Error");
				sap.ui.getCore().byId("iconEmpState").setValueStateText("Please Select State");
			}
			
			if(iconEmpCity !== ""){
				sap.ui.getCore().byId("iconEmpCity").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpCity").setValueState("Error");
				sap.ui.getCore().byId("iconEmpCity").setValueStateText("Please Select City");
			}
			
			if(iconEmpPincode.match(validPincode)){
				sap.ui.getCore().byId("iconEmpPincode").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpPincode").setValueState("Error");
				sap.ui.getCore().byId("iconEmpPincode").setValueStateText("Please Enter Correct Pincode");
			}
			
			if(iconEmpDistrict !== ""){
				sap.ui.getCore().byId("iconEmpDistrict").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpDistrict").setValueState("Error");
				sap.ui.getCore().byId("iconEmpDistrict").setValueStateText("Please Select District");
			}
			
			if((iconEmpDNo.match(validDNo)) && (iconEmpBuildStreetName.match(validName)) && (iconEmpLandmark.match(validName)) &&
			(iconEmpState !== "") && (iconEmpCity !== "") && (iconEmpPincode.match(validPincode)) && (iconEmpDistrict !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeAddressF2 = {
					oEmpDNo : iconEmpDNo,
					oEmpStreetName : iconEmpBuildStreetName,
					oEmpLandmark : iconEmpLandmark,
					oEmpState : iconEmpState,
					oEmpCity : iconEmpCity,
					oEmpPincode : iconEmpPincode,
					oEmpDistrict : iconEmpDistrict
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().iconEmployee2;
				
				for(var i = 0; i < old.length; i++){
						var oldValue = old[i];
						Object.assign(oldValue, objectEmployeeAddressF2);
				}
				this.iconTab.close();
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
				
			}
		},
		
		onRowTablePress3:function(oEvent){
			debugger;
			if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
			}
			
			sap.ui.getCore().byId("simpleForm2View1").setVisible(false);
			sap.ui.getCore().byId("saveButton2").setVisible(false);
			sap.ui.getCore().byId("iconForm1").setVisible(false);
			sap.ui.getCore().byId("saveButton1").setVisible(false);
			sap.ui.getCore().byId("panelForm").setVisible(true);
			sap.ui.getCore().byId("saveButton3").setVisible(true);
			sap.ui.getCore().byId("vboxForm").setVisible(false);
			sap.ui.getCore().byId("saveButton4").setVisible(false);
			sap.ui.getCore().byId("gridLayoutForm").setVisible(false);
			sap.ui.getCore().byId("saveButton5").setVisible(false);
			sap.ui.getCore().byId("iconDynamicForm").setVisible(false);
			sap.ui.getCore().byId("saveButton6").setVisible(false);
			
			var getObject = oEvent.getSource().getBindingContext("TenDataModel").getObject();
			var oModel = this.getOwnerComponent().getModel("TenDataModel");
			oModel.setProperty("/form3entity", getObject);
			
			if(getObject.oNomGender === "Male")
				{
					sap.ui.getCore().byId("iconNomineeGenderM").setSelected(true);
				}
				if(getObject.oNomGender === "Female")
				{
					sap.ui.getCore().byId("iconNomineeGenderF").setSelected(true);
			}
			
			this.iconTab.open();
		},
		
		iconSaveButton3:function(){
			debugger;
			var iconNomName = sap.ui.getCore().byId("iconNomName").getValue();
			var iconNomEmailId = sap.ui.getCore().byId("iconNomEmailId").getValue();
			var iconNomMobileNo = sap.ui.getCore().byId("iconNomMobileNo").getValue();
			var iconNomDob = sap.ui.getCore().byId("iconNomDob").getValue();
			var iconNomAddress = sap.ui.getCore().byId("iconNomAddress").getValue();
			var iconNomineeGenderM = sap.ui.getCore().byId("iconNomineeGenderM").getSelected();
			if(iconNomineeGenderM === true){
				var getNomGenderM = sap.ui.getCore().byId("iconNomineeGenderM").getText();
			}
			var iconNomineeGenderF = sap.ui.getCore().byId("iconNomineeGenderF").getSelected();
			if(iconNomineeGenderF === true){
				var getNomGenderF = sap.ui.getCore().byId("iconNomineeGenderF").getText();
			}
			
			var iconNomRelation = sap.ui.getCore().byId("iconNomRelation").getValue();
			
			var validNomName = /^[a-zA-Z\s]+$/;
			var validNomEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validNomMobileNo = /^[6-9]{1}[0-9]{9}$/;
			var validAdress = /^(([A-Z])*(\d+)([A-Z])*)(-|\/|&)*(([A-Z])*(\d+)([A-Z])*)*((\/)*(([A-Z])*(\d+)([A-Z])*))*/gm;
			
			if(iconNomName.match(validNomName)){
				sap.ui.getCore().byId("iconNomName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomName").setValueState("Error");
				sap.ui.getCore().byId("iconNomName").setValueStateText("Please Enter Nominee Name");
			}
			
			if(iconNomEmailId.match(validNomEmailId)){
				sap.ui.getCore().byId("iconNomEmailId").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomEmailId").setValueState("Error");
				sap.ui.getCore().byId("iconNomEmailId").setValueStateText("Please Enter Nominee Email Id");
			}
			
			if(iconNomMobileNo.match(validNomMobileNo)){
				sap.ui.getCore().byId("iconNomMobileNo").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomMobileNo").setValueState("Error");
				sap.ui.getCore().byId("iconNomMobileNo").setValueStateText("Please Enter Nominee Mobile No");
			}
			
			if(iconNomDob !== ""){
				sap.ui.getCore().byId("iconNomDob").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomDob").setValueState("Error");
				sap.ui.getCore().byId("iconNomDob").setValueStateText("Please Choose Nominee DOB");
			}
			
			if(iconNomAddress.match(validAdress)){
				sap.ui.getCore().byId("iconNomAddress").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomAddress").setValueState("Error");
				sap.ui.getCore().byId("iconNomAddress").setValueStateText("Please Enter Nominee Full Address");
			}
			
			if(iconNomineeGenderM === true || iconNomineeGenderF === true){
				sap.ui.getCore().byId("iconNomineeGenderM").setValueState("None");
				sap.ui.getCore().byId("iconNomineeGenderF").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomineeGenderM").setValueState("Error");
				sap.ui.getCore().byId("iconNomineeGenderF").setValueState("Error");
			}
			
			if(iconNomRelation !== ""){
				sap.ui.getCore().byId("iconNomRelation").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconNomRelation").setValueState("Error");
				sap.ui.getCore().byId("iconNomRelation").setValueStateText("Please Select Nominee Relation");
			}
			
			if((iconNomName.match(validNomName)) && (iconNomEmailId.match(validNomEmailId)) && (iconNomMobileNo.match(validNomMobileNo)) && (iconNomDob !== "") && 
			(iconNomAddress.match(validAdress)) && (iconNomineeGenderM === true || iconNomineeGenderF === true) && (iconNomRelation !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectNomineeF3 = {
					oNomName : iconNomName,
					oNomEmailId : iconNomEmailId,
					oNomMobileNo : iconNomMobileNo,
					oNomDob : iconNomDob,
					oNomAddress : iconNomAddress,
					oNomGender : getNomGenderM || getNomGenderF,
					oNomRelation : iconNomRelation
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().iconEmployee3;
				
				for(var i = 0; i < old.length; i++){
						var oldValue = old[i];
						Object.assign(oldValue, objectNomineeF3);
				}
				this.iconTab.close();
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		},
		
		onRowTablePress4:function(oEvent){
			debugger;
			if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
			}
			
			sap.ui.getCore().byId("simpleForm2View1").setVisible(false);
			sap.ui.getCore().byId("saveButton2").setVisible(false);
			sap.ui.getCore().byId("iconForm1").setVisible(false);
			sap.ui.getCore().byId("saveButton1").setVisible(false);
			sap.ui.getCore().byId("panelForm").setVisible(false);
			sap.ui.getCore().byId("saveButton3").setVisible(false);
			sap.ui.getCore().byId("vboxForm").setVisible(true);
			sap.ui.getCore().byId("saveButton4").setVisible(true);
			sap.ui.getCore().byId("gridLayoutForm").setVisible(false);
			sap.ui.getCore().byId("saveButton5").setVisible(false);
			sap.ui.getCore().byId("iconDynamicForm").setVisible(false);
			sap.ui.getCore().byId("saveButton6").setVisible(false);
			
			var getObject = oEvent.getSource().getBindingContext("TenDataModel").getObject();
			var oModel = this.getOwnerComponent().getModel("TenDataModel");
			oModel.setProperty("/form4entity", getObject);
			
			var diseaseKeys = getObject.iconDiseaseKeys;
			sap.ui.getCore().byId("iconHealthDisease").setSelectedKeys(diseaseKeys);
			
			this.iconTab.open();
		},
		
		iconSaveButton4:function(){
			debugger;
			var iconHealthName = sap.ui.getCore().byId("iconHealthName").getValue();
			var iconHealthHeight = sap.ui.getCore().byId("iconHealthHeight").getValue();
			var iconHealthWeight = sap.ui.getCore().byId("iconHealthWeight").getValue();
			var iconHealthBloodGroup = sap.ui.getCore().byId("iconHealthBloodGroup").getValue();
			var iconHealthDisease = sap.ui.getCore().byId("iconHealthDisease").getSelectedItems();
			var iconHealthDiseaseKeys = sap.ui.getCore().byId("iconHealthDisease").getSelectedKeys();
			var Disease = [];
			for(var i = 0; i < iconHealthDisease.length; i++){
				var selectedDiseases = iconHealthDisease[i].getText();
				Disease.push(selectedDiseases);
			}
			var iconHealthHospital = sap.ui.getCore().byId("iconHealthHospital").getValue();
			
			var validName = /^[a-zA-Z\s]+$/;
			var validHeight = /^[3-8]{1}\.[0-9]{1}$/;
			var validWeight = /^[1-9]{2}$/;
			
			if(iconHealthName.match(validName)){
				sap.ui.getCore().byId("iconHealthName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconHealthName").setValueState("Error");
				sap.ui.getCore().byId("iconHealthName").setValueStateText("Please Enter Correct Name");
			}
			
			if(iconHealthHeight.match(validHeight)){
				sap.ui.getCore().byId("iconHealthHeight").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconHealthHeight").setValueState("Error");
				sap.ui.getCore().byId("iconHealthHeight").setValueStateText("Please Enter Correct Height");
			}
			
			if(iconHealthWeight.match(validWeight)){
				sap.ui.getCore().byId("iconHealthWeight").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconHealthWeight").setValueState("Error");
				sap.ui.getCore().byId("iconHealthWeight").setValueStateText("Please Enter Correct Weight");
			}
			
			if(iconHealthBloodGroup !== ""){
				sap.ui.getCore().byId("iconHealthBloodGroup").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconHealthBloodGroup").setValueState("Error");
				sap.ui.getCore().byId("iconHealthBloodGroup").setValueStateText("Please Select Blood Group");
			}
			
			if(iconHealthDisease.length !== 0){
				sap.ui.getCore().byId("iconHealthDisease").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconHealthDisease").setValueState("Error");
				sap.ui.getCore().byId("iconHealthDisease").setValueStateText("Please Select Disease");
			}
			
			if(iconHealthHospital !== ""){
				sap.ui.getCore().byId("iconHealthHospital").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconHealthHospital").setValueState("Error");
				sap.ui.getCore().byId("iconHealthHospital").setValueStateText("Please Select Hospital");
			}
			
			if((iconHealthName.match(validName)) && (iconHealthHeight.match(validHeight)) && (iconHealthWeight.match(validWeight)) &&
			(iconHealthBloodGroup !== "") && (iconHealthDisease.length !== 0) && (iconHealthHospital !== "")){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeHealthF4 = {
					oEmpName : iconHealthName,
					oEmpHeight : iconHealthHeight,
					oEmpWeight : iconHealthWeight,
					oEmpBloodGroup : iconHealthBloodGroup,
					oEmpDisease : Disease,
					oEmpHospital : iconHealthHospital,
					iconDiseaseKeys : iconHealthDiseaseKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().iconEmployee4;
				
				for(i = 0; i < old.length; i++){
					var oldValue = old[i];
					Object.assign(oldValue, objectEmployeeHealthF4);
				}
				this.iconTab.close();
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		},
		
		onRowTablePress5:function(oEvent){
			debugger;
				if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
				}
				
				sap.ui.getCore().byId("simpleForm2View1").setVisible(false);
				sap.ui.getCore().byId("saveButton2").setVisible(false);
				sap.ui.getCore().byId("iconForm1").setVisible(false);
				sap.ui.getCore().byId("saveButton1").setVisible(false);
				sap.ui.getCore().byId("panelForm").setVisible(false);
				sap.ui.getCore().byId("saveButton3").setVisible(false);
				sap.ui.getCore().byId("vboxForm").setVisible(false);
				sap.ui.getCore().byId("saveButton4").setVisible(false);
				sap.ui.getCore().byId("gridLayoutForm").setVisible(true);
				sap.ui.getCore().byId("saveButton5").setVisible(true);
				sap.ui.getCore().byId("iconDynamicForm").setVisible(false);
				sap.ui.getCore().byId("saveButton6").setVisible(false);
				
				var getObject = oEvent.getSource().getBindingContext("TenDataModel").getObject();
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.setProperty("/form5entity", getObject);
				
				if(getObject.oEmpCompanyType === "IT")
				{
					sap.ui.getCore().byId("iconEmployeIt").setSelected(true);
				}
				if(getObject.oEmpCompanyType === "NON-IT")
				{
					sap.ui.getCore().byId("iconEmployeNonIt").setSelected(true);
				}
				
				var languageKeys = getObject.iconLanguageKeys;
				sap.ui.getCore().byId("iconEmployeeLanguage").setSelectedKeys(languageKeys);
				
				
				// oModel.refresh(true); 
				
				
				this.iconTab.open();
		},
		
		iconSaveButton5:function(){
			debugger;
			
			var iconEmployeeId = sap.ui.getCore().byId("iconEmployeeId").getValue();
			var iconEmployeeWorkMail = sap.ui.getCore().byId("iconEmployeeWorkMail").getValue();
			var iconEmployeeWorkMobileNo = sap.ui.getCore().byId("iconEmployeeWorkMobileNo").getValue();
			var iconEmployeeLanguage = sap.ui.getCore().byId("iconEmployeeLanguage").getSelectedItems();
			var iconEmployeeLanguageKeys = sap.ui.getCore().byId("iconEmployeeLanguage").getSelectedKeys();
			var languages = [];
			for(var i = 0; i < iconEmployeeLanguage.length; i++){
				var selectedLanguages = iconEmployeeLanguage[i].getText();
				languages.push(selectedLanguages);
			}
			var iconEmployeIt = sap.ui.getCore().byId("iconEmployeIt").getSelected();
			if(iconEmployeIt === true){
				var iconEmpIt = sap.ui.getCore().byId("iconEmployeIt").getText();
			}
			
			var iconEmployeNonIt = sap.ui.getCore().byId("iconEmployeNonIt").getSelected();
			if(iconEmployeNonIt === true){
				var iconEmpNonIt = sap.ui.getCore().byId("iconEmployeNonIt").getText();
			}
			var iconEmployeeDesignation = sap.ui.getCore().byId("iconEmployeeDesignation").getValue();
			var iconEmployeeWorkLocation = sap.ui.getCore().byId("iconEmployeeWorkLocation").getValue();
			
			var validEmpId = /^\d[2,4]{1}[0-9]{8}$/;
			var validEmpEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validEmpMobileNo = /^[6-9]{1}[0-9]{9}$/;
			
			if(iconEmployeeId.match(validEmpId)){
				sap.ui.getCore().byId("iconEmployeeId").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeeId").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeeId").setValueStateText("Please Enter Correct Id");
			}
			
			if(iconEmployeeWorkMail.match(validEmpEmailId)){
				sap.ui.getCore().byId("iconEmployeeWorkMail").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeeWorkMail").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeeWorkMail").setValueStateText("Please Enter Correct Email Id");
			}
			
			if(iconEmployeeWorkMobileNo.match(validEmpMobileNo)){
				sap.ui.getCore().byId("iconEmployeeWorkMobileNo").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeeWorkMobileNo").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeeWorkMobileNo").setValueStateText("Please Enter Correct Mobile No");
			}
			
			if(iconEmployeeLanguage.length !== 0){
				sap.ui.getCore().byId("iconEmployeeLanguage").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeeLanguage").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeeLanguage").setValueStateText("Please Select Languages");
			}
			
			if(iconEmployeIt === true || iconEmployeNonIt === true){
				sap.ui.getCore().byId("iconEmployeIt").setValueState("None");
				sap.ui.getCore().byId("iconEmployeNonIt").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeIt").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeNonIt").setValueState("Error");
			}
			
			if(iconEmployeeDesignation !== ""){
				sap.ui.getCore().byId("iconEmployeeDesignation").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeeDesignation").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeeDesignation").setValueStateText("Please Select Designation");
			}
			
			if(iconEmployeeWorkLocation !== ""){
				sap.ui.getCore().byId("iconEmployeeWorkLocation").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmployeeWorkLocation").setValueState("Error");
				sap.ui.getCore().byId("iconEmployeeWorkLocation").setValueStateText("Please Select Location");
			}
			
			if((iconEmployeeId.match(validEmpId)) && (iconEmployeeWorkMail.match(validEmpEmailId)) && (iconEmployeeWorkMobileNo.match(validEmpMobileNo)) &&
			(iconEmployeeLanguage.length !== 0) && (iconEmployeIt === true || iconEmployeNonIt === true) && 
			(iconEmployeeDesignation !== "") && (iconEmployeeWorkLocation !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeDetailsF5 = {
					oEmpId : iconEmployeeId,
					oEmpWorkMail : iconEmployeeWorkMail,
					oEmpWorkMobileNo : iconEmployeeWorkMobileNo,
					oEmpLanguage : languages,
					oEmpCompanyType :iconEmpIt || iconEmpNonIt,
					oEmpDesignation : iconEmployeeDesignation,
					oEmpLocation : iconEmployeeWorkLocation,
					iconLanguageKeys : iconEmployeeLanguageKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().iconEmployee5;
				
				for(i = 0; i < old.length; i++){
					var oldValue = old[i];
					Object.assign(oldValue, objectEmployeeDetailsF5);
				}
				this.iconTab.close();
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		},
		
		onRowTablePress6:function(oEvent){
			debugger;
			if(!this.iconTab){
				this.iconTab = sap.ui.xmlfragment("com.dpz_Ten_Views_Task.view.Fragment.iconTab", this);
				this.getView().addDependent(this.iconTab);
				}
				
				sap.ui.getCore().byId("simpleForm2View1").setVisible(false);
				sap.ui.getCore().byId("saveButton2").setVisible(false);
				sap.ui.getCore().byId("iconForm1").setVisible(false);
				sap.ui.getCore().byId("saveButton1").setVisible(false);
				sap.ui.getCore().byId("panelForm").setVisible(false);
				sap.ui.getCore().byId("saveButton3").setVisible(false);
				sap.ui.getCore().byId("vboxForm").setVisible(false);
				sap.ui.getCore().byId("saveButton4").setVisible(false);
				sap.ui.getCore().byId("gridLayoutForm").setVisible(false);
				sap.ui.getCore().byId("saveButton5").setVisible(false);
				sap.ui.getCore().byId("iconDynamicForm").setVisible(true);
				sap.ui.getCore().byId("saveButton6").setVisible(true);
				
				var getObject = oEvent.getSource().getBindingContext("TenDataModel").getObject();
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.setProperty("/form6entity", getObject);
				
				sap.ui.getCore().byId("iconTableEmpId").setValue(getObject.oEmpId);
				sap.ui.getCore().byId("iconTableEmpGradName").setValue(getObject.oEmpCollegeName);
				sap.ui.getCore().byId("iconTableEmpWorkCompanyName").setValue(getObject.oEmpCompanyName);
				sap.ui.getCore().byId("iconTableEmpWorkExperience").setSelectedKey(getObject.workkeys);
				sap.ui.getCore().byId("iconTableEmpJoinedDate").setValue(getObject.oEmpJoinedDate);
				
				var techSkillsKeys = getObject.iconTechnicalSkillsKeys;
				sap.ui.getCore().byId("iconTableEmpTechnicalSkills").setSelectedKeys(techSkillsKeys);
				
				var agreeCheckBox =	getObject.agreeCheckBox;                     
				if(agreeCheckBox === true){
				sap.ui.getCore().byId("agreeTableCheckBox").setSelected(true);
				}
				
				this.iconTab.open();	
		},
		
		iconSaveButton6:function(){
			debugger;
			var iconEmpId = sap.ui.getCore().byId("iconTableEmpId").getValue();
			var iconEmpGradName = sap.ui.getCore().byId("iconTableEmpGradName").getValue();
			var iconEmpWorkCompanyName = sap.ui.getCore().byId("iconTableEmpWorkCompanyName").getValue();
			var iconEmpWorkExperience = sap.ui.getCore().byId("iconTableEmpWorkExperience")._getSelectedItemText();
			var iconEmpJoinedDate = sap.ui.getCore().byId("iconTableEmpJoinedDate").getValue();
			var iconEmpTechnicalSkills = sap.ui.getCore().byId("iconTableEmpTechnicalSkills").getSelectedItems();
			var iconEmpTechnicalSkillsKeys = sap.ui.getCore().byId("iconTableEmpTechnicalSkills").getSelectedKeys();
			var TechSkills = [];
			for(var i = 0; i < iconEmpTechnicalSkills.length; i++){
				var selectedTechSkills = iconEmpTechnicalSkills[i].getText();
				TechSkills.push(selectedTechSkills);
			}
			var agreeCheckBox = sap.ui.getCore().byId("agreeTableCheckBox").getSelected();

			var validEmpId =  /^\d[2,4]{1}[0-9]{8}$/;
			var validEmpName = /^[a-zA-Z\s]+$/;
			
			if(iconEmpId.match(validEmpId)){
				sap.ui.getCore().byId("iconTableEmpId").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpId").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpId").setValueStateText("Please Enter Correct Id");
			}
			
			if(iconEmpGradName.match(validEmpName)){
				sap.ui.getCore().byId("iconTableEmpGradName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpGradName").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpGradName").setValueStateText("Please Enter Correct College Name");
			}
			
			if(iconEmpWorkCompanyName.match(validEmpName)){
				sap.ui.getCore().byId("iconTableEmpWorkCompanyName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpWorkCompanyName").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpWorkCompanyName").setValueStateText("Please Enter Correct Company Name");
			}
			
			if(iconEmpWorkExperience !== ""){
				sap.ui.getCore().byId("iconTableEmpWorkExperience").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpWorkExperience").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpWorkExperience").setValueStateText("Please Select Work Experience");
			}
			
			if(iconEmpJoinedDate !== ""){
				sap.ui.getCore().byId("iconTableEmpJoinedDate").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpJoinedDate").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpJoinedDate").setValueStateText("Please Choose Date");
			}
			
			if(iconEmpTechnicalSkills.length !== 0){
				sap.ui.getCore().byId("iconTableEmpTechnicalSkills").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconTableEmpTechnicalSkills").setValueState("Error");
				sap.ui.getCore().byId("iconTableEmpTechnicalSkills").setValueStateText("Please Select Technical Skills");
			}
			
			if(agreeCheckBox === true){
				sap.ui.getCore().byId("agreeTableCheckBox").setValueState("None");
			}else{
				sap.ui.getCore().byId("agreeTableCheckBox").setValueState("Error");
				
			}
			
			if((iconEmpId.match(validEmpId)) && (iconEmpGradName.match(validEmpName)) && (iconEmpWorkCompanyName.match(validEmpName)) && (iconEmpWorkExperience !== "") &&
			(iconEmpJoinedDate !== "") && (iconEmpTechnicalSkills.length !== 0) && (agreeCheckBox === true)){
				
					MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeSkillsF6 = {
					oEmpId : iconEmpId,
					oEmpCollegeName : iconEmpGradName,
					oEmpCompanyName : iconEmpWorkCompanyName,
					oEmpExperience : iconEmpWorkExperience,
					oEmpJoinedDate :iconEmpJoinedDate,
					oEmpTechnicalSkills : TechSkills,
					iconTechnicalSkillsKeys : iconEmpTechnicalSkillsKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				var old = oModel.getData().iconEmployee6;
				
				for(i = 0; i < old.length; i++){
					var oldValue = old[i];
					Object.assign(oldValue, objectEmployeeSkillsF6);
				}
				this.iconTab.close();
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		},
		
		iconDeleteBtn1:function(){
			debugger;
			var iconTable1 = this.getView().byId("iconTable1Id");
			var oModel = this.getOwnerComponent().getModel("TenDataModel");
			var iconTabTable1 = oModel.getProperty("/iconEmployee1");
			var icontableSelected = iconTable1.getSelectedItems();
			
			if(icontableSelected.length === 0){
				MessageBox.warning("No Items Selected to Delete");
			}
		}
	});
});