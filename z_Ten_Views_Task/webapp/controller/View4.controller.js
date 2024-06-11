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

	return Controller.extend("com.dpz_Ten_Views_Task.controller.View4", {
		onInit:function(){
			debugger;
			
				// this.getView().byId("iconEmployeeGenderMale").setSelected(false);
				// this.getView().byId("iconEmployeeGenderFemale").setSelected(false);
				this.getView().byId("iconEmployeIt").setSelected(false);
				this.getView().byId("iconEmployeNonIt").setSelected(false);
				
					var EmployeeForm = new SimpleForm({
					editable: true,
	                layout: "ResponsiveGridLayout",
	                labelSpanXL:5, labelSpanL:4, labelSpanM:5, labelSpanS:3, emptySpanXL:4,
					emptySpanL:4, emptySpanM:6, emptySpanS:3, columnsXL:6, columnsL:3, columnsM:3,
                content: [
                    new Label({ text: "Employee Id", required:true }),
                	new Input({ placeholder: "Employee Id", id:"iconEmpId"} ),
                	new Label({ text: "Graduation College Name", required:true }),
                    new Input({ placeholder: "Graduation College Name", id:"iconEmpGradName" }),
                    new Label({ text: "Working Company Name", required:true }),
                    new Input({ placeholder: "Working Company Name", id:"iconEmpWorkCompanyName" }),
                	new Label({ text: "Work Experience", required:true}),
                    new Select({id:"iconEmpWorkExperience",  forceSelection:false, items: {
                            path: "TenDataModel>/Experience",
                            template: new sap.ui.core.Item({ key: "{TenDataModel>key}", text: "{TenDataModel>text}" })
                    	}
                    }),
                    new Label({ text: "Date of Joined", required:true}),
                    new DatePicker({displayFormat:"dd.MM.YYYY", id:"iconEmpJoinedDate"}),
                    new Label({ text: "Technical Skills", required:true}),
                    new MultiComboBox({id:"iconEmpTechnicalSkills", placeholder: "Technical Skills", items: {
                            path: "TenDataModel>/employeeMultiComboBoxJob",
                            template: new sap.ui.core.Item({ key: "{TenDataModel>key}", text: "{TenDataModel>text}" })
                        }
                    }),
                    new Label({ required:true}),
                    new CheckBox({text: "Agree Terms & Conditions", id:"agreeCheckBox"}),
                    new Button({
                        text: "Submit",
                        id:"onSubmitDynamicForm",
                        type:"Emphasized",
                        press: this.iconForm6Submit.bind(this)
                    })
                ]
			});
			
				var oForm = this.getView().byId("dynamicForm");
	            oForm.addItem(EmployeeForm);
	            
	            var oButton = this.getView().byId("dynamicButton");
	            var getButton = sap.ui.getCore().byId("onSubmitDynamicForm");
	            oButton.addItem(getButton);
		},
		
		iconForm1Submit:function(){
			debugger;
			
			var iconEmpName = this.getView().byId("iconEmpName").getValue();
			var iconEmpEmailId = this.getView().byId("iconEmpEmailId").getValue();
			var iconEmpMobileNo = this.getView().byId("iconEmpMobileNo").getValue();
			var iconGenderMale = this.getView().byId("iconGenderMale").getSelected();
			if(iconGenderMale === true){
				var iconEmpMale = this.getView().byId("iconGenderMale").getText();
			}
			
			var iconGenderFemale = this.getView().byId("iconGenderFemale").getSelected();
			if(iconGenderFemale === true){
				var iconEmpFemale = this.getView().byId("iconGenderFemale").getText();
			}
			var iconEmpHobbies = this.getView().byId("iconEmpHobbies").getSelectedItems();
			var iconEmpHobbiesKeys = this.getView().byId("iconEmpHobbies").getSelectedKeys();
			var EmpHobbies = [];
			for(var i = 0; i < iconEmpHobbies.length; i++){
				var selectedHobbies = iconEmpHobbies[i].getText();
				EmpHobbies.push(selectedHobbies);
			}
			var iconEmpAge = this.getView().byId("iconEmpAge").getValue();
			
			var validEmpName = /^[a-zA-Z\s]+$/;
			var validEmpEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validPersonMobileNo = /^[6-9]{1}[0-9]{9}$/;
			
			if(iconEmpName.match(validEmpName)){
				this.getView().byId("iconEmpName").setValueState("None");
			}else{
				this.getView().byId("iconEmpName").setValueState("Error");
				this.getView().byId("iconEmpName").setValueStateText("Please Enter Correct Name");
			}
			
			if(iconEmpEmailId.match(validEmpEmailId)){
				this.getView().byId("iconEmpEmailId").setValueState("None");
			}else{
				this.getView().byId("iconEmpEmailId").setValueState("Error");
				this.getView().byId("iconEmpEmailId").setValueStateText("Please Enter Correct Email Id");
			}
			
			if(iconEmpMobileNo.match(validPersonMobileNo)){
				this.getView().byId("iconEmpMobileNo").setValueState("None");
			}else{
				this.getView().byId("iconEmpMobileNo").setValueState("Error");
				this.getView().byId("iconEmpMobileNo").setValueStateText("Please Enter Correct Mobile Number");
			}
			
			if(iconGenderMale === true || iconGenderFemale === true){
				this.getView().byId("iconGenderMale").setValueState("None");
				this.getView().byId("iconGenderFemale").setValueState("None");
			}else{
				this.getView().byId("iconGenderMale").setValueState("Error");
				this.getView().byId("iconGenderFemale").setValueState("Error");
			}
			
			if(iconEmpHobbies.length !== 0){
				this.getView().byId("iconEmpHobbies").setValueState("None");
			}else{
				this.getView().byId("iconEmpHobbies").setValueState("Error");
				this.getView().byId("iconEmpHobbies").setValueStateText("Please Select Hobbies");
			}
			
			if(iconEmpAge !== ""){
				this.getView().byId("iconEmpAge").setValueState("None");
			}else{
				this.getView().byId("iconEmpAge").setValueState("Error");
				this.getView().byId("iconEmpAge").setValueStateText("Please Select Age");
			}
			
			if((iconEmpName.match(validEmpName)) && (iconEmpEmailId.match(validEmpEmailId)) && (iconEmpMobileNo.match(validPersonMobileNo)) &&
			(iconGenderMale === true || iconGenderFemale === true) && (iconEmpHobbies.length !== 0) && (iconEmpAge !== "")){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployee = {
					oEmpName : iconEmpName,
					oEmpEmailId : iconEmpEmailId,
					oEmpMobileNo : iconEmpMobileNo,
					oEmpGender : iconEmpMale || iconEmpFemale,
					oEmpHobbies : EmpHobbies,
					oEmpAge : iconEmpAge,
					oHobbiesKeys : iconEmpHobbiesKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().iconEmployee1.push(objectEmployee);
				var iconTabBar = this.getView().byId("myIconTabBar");
				iconTabBar.setSelectedKey("tab2");
				oModel.refresh(true);
			}else{
				this.getView().byId("iconEmpAge").setValue("");
				MessageBox.warning("Please Fill All Mandatory Details");
				
			}
		},
		
		iconForm2Submit:function(){
			debugger;
			var iconEmpDNo = this.getView().byId("iconEmpDNo").getValue();
			var iconEmpBuildStreetName = this.getView().byId("iconEmpBuildStreetName").getValue();
			var iconEmpLandmark = this.getView().byId("iconEmpLandmark").getValue();
			var iconEmpState = this.getView().byId("iconEmpState").getValue();
			var iconEmpCity = this.getView().byId("iconEmpCity").getValue();
			var iconEmpPincode = this.getView().byId("iconEmpPincode").getValue();
			var iconEmpDistrict = this.getView().byId("iconEmpDistrict").getValue();
			
			var validDNo = /^[0-9]+[/]?[0-9]+$/;
			var validName = /^[a-zA-Z\s]+$/;
			var validPincode = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
			
			if(iconEmpDNo.match(validDNo)){
				this.getView().byId("iconEmpDNo").setValueState("None");
			}else{
				this.getView().byId("iconEmpDNo").setValueState("Error");
				this.getView().byId("iconEmpDNo").setValueStateText("Please Enter Correct D-NO");
			}
			
			if(iconEmpBuildStreetName.match(validName)){
				this.getView().byId("iconEmpBuildStreetName").setValueState("None");
			}else{
				this.getView().byId("iconEmpBuildStreetName").setValueState("Error");
				this.getView().byId("iconEmpBuildStreetName").setValueStateText("Please Enter Correct Street Name");
			}
			
			if(iconEmpLandmark.match(validName)){
				this.getView().byId("iconEmpLandmark").setValueState("None");
			}else{
				this.getView().byId("iconEmpLandmark").setValueState("Error");
				this.getView().byId("iconEmpLandmark").setValueStateText("Please Enter Correct Landmark");
			}
			
			if(iconEmpState !== ""){
				this.getView().byId("iconEmpState").setValueState("None");
			}else{
				this.getView().byId("iconEmpState").setValueState("Error");
				this.getView().byId("iconEmpState").setValueStateText("Please Select State");
			}
			
			if(iconEmpCity !== ""){
				this.getView().byId("iconEmpCity").setValueState("None");
			}else{
				this.getView().byId("iconEmpCity").setValueState("Error");
				this.getView().byId("iconEmpCity").setValueStateText("Please Select City");
			}
			
			if(iconEmpPincode.match(validPincode)){
				this.getView().byId("iconEmpPincode").setValueState("None");
			}else{
				this.getView().byId("iconEmpPincode").setValueState("Error");
				this.getView().byId("iconEmpPincode").setValueStateText("Please Enter Correct Pincode");
			}
			
			if(iconEmpDistrict !== ""){
				this.getView().byId("iconEmpDistrict").setValueState("None");
			}else{
				this.getView().byId("iconEmpDistrict").setValueState("Error");
				this.getView().byId("iconEmpDistrict").setValueStateText("Please Select District");
			}
			
			if((iconEmpDNo.match(validDNo)) && (iconEmpBuildStreetName.match(validName)) && (iconEmpLandmark.match(validName)) &&
			(iconEmpState !== "") && (iconEmpCity !== "") && (iconEmpPincode.match(validPincode)) && (iconEmpDistrict !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeAddress = {
					oEmpDNo : iconEmpDNo,
					oEmpStreetName : iconEmpBuildStreetName,
					oEmpLandmark : iconEmpLandmark,
					oEmpState : iconEmpState,
					oEmpCity : iconEmpCity,
					oEmpPincode : iconEmpPincode,
					oEmpDistrict : iconEmpDistrict
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().iconEmployee2.push(objectEmployeeAddress);
				var iconTabBar = this.getView().byId("myIconTabBar");
				iconTabBar.setSelectedKey("tab3");
				oModel.refresh(true);
			}else{
				this.getView().byId("iconEmpDistrict").setValue("");
				MessageBox.warning("Please Fill All Mandatory Details");
				
			}
		},
		
		iconForm3Submit:function(){
			debugger;
			
			var iconNomName = this.getView().byId("iconNomName").getValue();
			var iconNomEmailId = this.getView().byId("iconNomEmailId").getValue();
			var iconNomMobileNo = this.getView().byId("iconNomMobileNo").getValue();
			var iconNomDob = this.getView().byId("iconNomDob").getValue();
			var iconNomAddress = this.getView().byId("iconNomAddress").getValue();
			var iconNomineeGenderM = this.getView().byId("iconNomineeGenderM").getSelected();
			if(iconNomineeGenderM === true){
				var getNomGenderM = this.getView().byId("iconNomineeGenderM").getText();
			}
			var iconNomineeGenderF = this.getView().byId("iconNomineeGenderF").getSelected();
			if(iconNomineeGenderF === true){
				var getNomGenderF = this.getView().byId("iconNomineeGenderF").getText();
			}
			
			var iconNomRelation = this.getView().byId("iconNomRelation").getValue();
			
			var validNomName = /^[a-zA-Z\s]+$/;
			var validNomEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validNomMobileNo = /^[6-9]{1}[0-9]{9}$/;
			var validAdress = /^(([A-Z])*(\d+)([A-Z])*)(-|\/|&)*(([A-Z])*(\d+)([A-Z])*)*((\/)*(([A-Z])*(\d+)([A-Z])*))*/gm;
			
			if(iconNomName.match(validNomName)){
				this.getView().byId("iconNomName").setValueState("None");
			}else{
				this.getView().byId("iconNomName").setValueState("Error");
				this.getView().byId("iconNomName").setValueStateText("Please Enter Nominee Name");
			}
			
			if(iconNomEmailId.match(validNomEmailId)){
				this.getView().byId("iconNomEmailId").setValueState("None");
			}else{
				this.getView().byId("iconNomEmailId").setValueState("Error");
				this.getView().byId("iconNomEmailId").setValueStateText("Please Enter Nominee Email Id");
			}
			
			if(iconNomMobileNo.match(validNomMobileNo)){
				this.getView().byId("iconNomMobileNo").setValueState("None");
			}else{
				this.getView().byId("iconNomMobileNo").setValueState("Error");
				this.getView().byId("iconNomMobileNo").setValueStateText("Please Enter Nominee Mobile No");
			}
			
			if(iconNomDob !== ""){
				this.getView().byId("iconNomDob").setValueState("None");
			}else{
				this.getView().byId("iconNomDob").setValueState("Error");
				this.getView().byId("iconNomDob").setValueStateText("Please Choose Nominee DOB");
			}
			
			if(iconNomAddress.match(validAdress)){
				this.getView().byId("iconNomAddress").setValueState("None");
			}else{
				this.getView().byId("iconNomAddress").setValueState("Error");
				this.getView().byId("iconNomAddress").setValueStateText("Please Enter Nominee Full Address");
			}
			
			if(iconNomineeGenderM === true || iconNomineeGenderF === true){
				this.getView().byId("iconNomineeGenderM").setValueState("None");
				this.getView().byId("iconNomineeGenderF").setValueState("None");
			}else{
				this.getView().byId("iconNomineeGenderM").setValueState("Error");
				this.getView().byId("iconNomineeGenderF").setValueState("Error");
			}
			
			if(iconNomRelation !== ""){
				this.getView().byId("iconNomRelation").setValueState("None");
			}else{
				this.getView().byId("iconNomRelation").setValueState("Error");
				this.getView().byId("iconNomRelation").setValueStateText("Please Select Nominee Relation");
			}
			
			if((iconNomName.match(validNomName)) && (iconNomEmailId.match(validNomEmailId)) && (iconNomMobileNo.match(validNomMobileNo)) && (iconNomDob !== "") && 
			(iconNomAddress.match(validAdress)) && (iconNomineeGenderM === true || iconNomineeGenderF === true) && (iconNomRelation !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectNominee = {
					oNomName : iconNomName,
					oNomEmailId : iconNomEmailId,
					oNomMobileNo : iconNomMobileNo,
					oNomDob : iconNomDob,
					oNomAddress : iconNomAddress,
					oNomGender : getNomGenderM || getNomGenderF,
					oNomRelation : iconNomRelation
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().iconEmployee3.push(objectNominee);
				var iconTabBar = this.getView().byId("myIconTabBar");
				iconTabBar.setSelectedKey("tab4");
				oModel.refresh(true);
			}else{
				this.getView().byId("iconNomRelation").setValue("");
				MessageBox.warning("Please Fill All Mandatory Details");
			}
			
		},
		
		iconForm4Submit:function(){
			debugger;
			
			var iconHealthName = this.getView().byId("iconHealthName").getValue();
			var iconHealthHeight = this.getView().byId("iconHealthHeight").getValue();
			var iconHealthWeight = this.getView().byId("iconHealthWeight").getValue();
			var iconHealthBloodGroup = this.getView().byId("iconHealthBloodGroup").getValue();
			var iconHealthDisease = this.getView().byId("iconHealthDisease").getSelectedItems();
			var iconHealthDiseaseKeys = this.getView().byId("iconHealthDisease").getSelectedKeys();
			var Disease = [];
			for(var i = 0; i < iconHealthDisease.length; i++){
				var selectedDiseases = iconHealthDisease[i].getText();
				Disease.push(selectedDiseases);
			}
			var iconHealthHospital = this.getView().byId("iconHealthHospital").getValue();
			
			var validName = /^[a-zA-Z\s]+$/;
			var validHeight = /^[3-8]{1}\.[0-9]{1}$/;
			var validWeight = /^[1-9]{2}$/;
			
			if(iconHealthName.match(validName)){
				this.getView().byId("iconHealthName").setValueState("None");
			}else{
				this.getView().byId("iconHealthName").setValueState("Error");
				this.getView().byId("iconHealthName").setValueStateText("Please Enter Correct Name");
			}
			
			if(iconHealthHeight.match(validHeight)){
				this.getView().byId("iconHealthHeight").setValueState("None");
			}else{
				this.getView().byId("iconHealthHeight").setValueState("Error");
				this.getView().byId("iconHealthHeight").setValueStateText("Please Enter Correct Height");
			}
			
			if(iconHealthWeight.match(validWeight)){
				this.getView().byId("iconHealthWeight").setValueState("None");
			}else{
				this.getView().byId("iconHealthWeight").setValueState("Error");
				this.getView().byId("iconHealthWeight").setValueStateText("Please Enter Correct Weight");
			}
			
			if(iconHealthBloodGroup !== ""){
				this.getView().byId("iconHealthBloodGroup").setValueState("None");
			}else{
				this.getView().byId("iconHealthBloodGroup").setValueState("Error");
				this.getView().byId("iconHealthBloodGroup").setValueStateText("Please Select Blood Group");
			}
			
			if(iconHealthDisease.length !== 0){
				this.getView().byId("iconHealthDisease").setValueState("None");
			}else{
				this.getView().byId("iconHealthDisease").setValueState("Error");
				this.getView().byId("iconHealthDisease").setValueStateText("Please Select Disease");
			}
			
			if(iconHealthHospital !== ""){
				this.getView().byId("iconHealthHospital").setValueState("None");
			}else{
				this.getView().byId("iconHealthHospital").setValueState("Error");
				this.getView().byId("iconHealthHospital").setValueStateText("Please Select Hospital");
			}
			
			if((iconHealthName.match(validName)) && (iconHealthHeight.match(validHeight)) && (iconHealthWeight.match(validWeight)) &&
			(iconHealthBloodGroup !== "") && (iconHealthDisease.length !== 0) && (iconHealthHospital !== "")){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeHealth = {
					oEmpName : iconHealthName,
					oEmpHeight : iconHealthHeight,
					oEmpWeight : iconHealthWeight,
					oEmpBloodGroup : iconHealthBloodGroup,
					oEmpDisease : Disease,
					oEmpHospital : iconHealthHospital,
					iconDiseaseKeys : iconHealthDiseaseKeys
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().iconEmployee4.push(objectEmployeeHealth);
				var iconTabBar = this.getView().byId("myIconTabBar");
				iconTabBar.setSelectedKey("tab5");
				oModel.refresh(true);
			}else{
				this.getView().byId("iconHealthHospital").setValue("");
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		},
		
		iconForm5Submit:function(){
			debugger;
			var iconEmployeeId = this.getView().byId("iconEmployeeId").getValue();
			var iconEmployeeWorkMail = this.getView().byId("iconEmployeeWorkMail").getValue();
			var iconEmployeeWorkMobileNo = this.getView().byId("iconEmployeeWorkMobileNo").getValue();
			var iconEmployeeLanguage = this.getView().byId("iconEmployeeLanguage").getSelectedItems();
			var iconEmployeeLanguageKeys = this.getView().byId("iconEmployeeLanguage").getSelectedKeys();
			var languages = [];
			for(var i = 0; i < iconEmployeeLanguage.length; i++){
				var selectedLanguages = iconEmployeeLanguage[i].getText();
				languages.push(selectedLanguages);
			}
			var iconEmployeIt = this.getView().byId("iconEmployeIt").getSelected();
			if(iconEmployeIt === true){
				var iconEmpIt = this.getView().byId("iconEmployeIt").getText();
			}
			
			var iconEmployeNonIt = this.getView().byId("iconEmployeNonIt").getSelected();
			if(iconEmployeNonIt === true){
				var iconEmpNonIt = this.getView().byId("iconEmployeNonIt").getText();
			}
			var iconEmployeeDesignation = this.getView().byId("iconEmployeeDesignation").getValue();
			var iconEmployeeWorkLocation = this.getView().byId("iconEmployeeWorkLocation").getValue();
			
			var validEmpId = /^\d[2,4]{1}[0-9]{8}$/;
			var validEmpEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validEmpMobileNo = /^[6-9]{1}[0-9]{9}$/;
			
			if(iconEmployeeId.match(validEmpId)){
				this.getView().byId("iconEmployeeId").setValueState("None");
			}else{
				this.getView().byId("iconEmployeeId").setValueState("Error");
				this.getView().byId("iconEmployeeId").setValueStateText("Please Enter Correct Id");
			}
			
			if(iconEmployeeWorkMail.match(validEmpEmailId)){
				this.getView().byId("iconEmployeeWorkMail").setValueState("None");
			}else{
				this.getView().byId("iconEmployeeWorkMail").setValueState("Error");
				this.getView().byId("iconEmployeeWorkMail").setValueStateText("Please Enter Correct Email Id");
			}
			
			if(iconEmployeeWorkMobileNo.match(validEmpMobileNo)){
				this.getView().byId("iconEmployeeWorkMobileNo").setValueState("None");
			}else{
				this.getView().byId("iconEmployeeWorkMobileNo").setValueState("Error");
				this.getView().byId("iconEmployeeWorkMobileNo").setValueStateText("Please Enter Correct Mobile No");
			}
			
			if(iconEmployeeLanguage.length !== 0){
				this.getView().byId("iconEmployeeLanguage").setValueState("None");
			}else{
				this.getView().byId("iconEmployeeLanguage").setValueState("Error");
				this.getView().byId("iconEmployeeLanguage").setValueStateText("Please Select Languages");
			}
			
			if(iconEmployeIt === true || iconEmployeNonIt === true){
				this.getView().byId("iconEmployeIt").setValueState("None");
				this.getView().byId("iconEmployeNonIt").setValueState("None");
			}else{
				this.getView().byId("iconEmployeIt").setValueState("Error");
				this.getView().byId("iconEmployeNonIt").setValueState("Error");
			}
			
			if(iconEmployeeDesignation !== ""){
				this.getView().byId("iconEmployeeDesignation").setValueState("None");
			}else{
				this.getView().byId("iconEmployeeDesignation").setValueState("Error");
				this.getView().byId("iconEmployeeDesignation").setValueStateText("Please Select Designation");
			}
			
			if(iconEmployeeWorkLocation !== ""){
				this.getView().byId("iconEmployeeWorkLocation").setValueState("None");
			}else{
				this.getView().byId("iconEmployeeWorkLocation").setValueState("Error");
				this.getView().byId("iconEmployeeWorkLocation").setValueStateText("Please Select Location");
			}
			
			if((iconEmployeeId.match(validEmpId)) && (iconEmployeeWorkMail.match(validEmpEmailId)) && (iconEmployeeWorkMobileNo.match(validEmpMobileNo)) &&
			(iconEmployeeLanguage.length !== 0) && (iconEmployeIt === true || iconEmployeNonIt === true) && 
			(iconEmployeeDesignation !== "") && (iconEmployeeWorkLocation !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeDetails = {
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
				oModel.getData().iconEmployee5.push(objectEmployeeDetails);
				var iconTabBar = this.getView().byId("myIconTabBar");
				iconTabBar.setSelectedKey("tab6");
				oModel.refresh(true);
			}else{
				this.getView().byId("iconEmployeeWorkLocation").setValue("");
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		},
		
		iconForm6Submit:function(){
			debugger;
			
			var iconEmpId = sap.ui.getCore().byId("iconEmpId").getValue();
			var iconEmpGradName = sap.ui.getCore().byId("iconEmpGradName").getValue();
			var iconEmpWorkCompanyName = sap.ui.getCore().byId("iconEmpWorkCompanyName").getValue();
			var iconEmpWorkExperience = sap.ui.getCore().byId("iconEmpWorkExperience")._getSelectedItemText();
						var workkey = sap.ui.getCore().byId("iconEmpWorkExperience").getSelectedKey();

			var iconEmpJoinedDate = sap.ui.getCore().byId("iconEmpJoinedDate").getValue();
			var iconEmpTechnicalSkills = sap.ui.getCore().byId("iconEmpTechnicalSkills").getSelectedItems();
			var iconEmpTechnicalSkillsKeys = sap.ui.getCore().byId("iconEmpTechnicalSkills").getSelectedKeys();
			var TechSkills = [];
			for(var i = 0; i < iconEmpTechnicalSkills.length; i++){
				var selectedTechSkills = iconEmpTechnicalSkills[i].getText();
				TechSkills.push(selectedTechSkills);
			}
			var agreeCheckBox = sap.ui.getCore().byId("agreeCheckBox").getSelected();

			var validEmpId =  /^\d[2,4]{1}[0-9]{8}$/;
			var validEmpName = /^[a-zA-Z\s]+$/;
			
			if(iconEmpId.match(validEmpId)){
				sap.ui.getCore().byId("iconEmpId").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpId").setValueState("Error");
				sap.ui.getCore().byId("iconEmpId").setValueStateText("Please Enter Correct Id");
			}
			
			if(iconEmpGradName.match(validEmpName)){
				sap.ui.getCore().byId("iconEmpGradName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpGradName").setValueState("Error");
				sap.ui.getCore().byId("iconEmpGradName").setValueStateText("Please Enter Correct College Name");
			}
			
			if(iconEmpWorkCompanyName.match(validEmpName)){
				sap.ui.getCore().byId("iconEmpWorkCompanyName").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpWorkCompanyName").setValueState("Error");
				sap.ui.getCore().byId("iconEmpWorkCompanyName").setValueStateText("Please Enter Correct Company Name");
			}
			
			if(iconEmpWorkExperience !== ""){
				sap.ui.getCore().byId("iconEmpWorkExperience").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpWorkExperience").setValueState("Error");
				sap.ui.getCore().byId("iconEmpWorkExperience").setValueStateText("Please Select Work Experience");
			}
			
			if(iconEmpJoinedDate !== ""){
				sap.ui.getCore().byId("iconEmpJoinedDate").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpJoinedDate").setValueState("Error");
				sap.ui.getCore().byId("iconEmpJoinedDate").setValueStateText("Please Choose Date");
			}
			
			if(iconEmpTechnicalSkills.length !== 0){
				sap.ui.getCore().byId("iconEmpTechnicalSkills").setValueState("None");
			}else{
				sap.ui.getCore().byId("iconEmpTechnicalSkills").setValueState("Error");
				sap.ui.getCore().byId("iconEmpTechnicalSkills").setValueStateText("Please Select Technical Skills");
			}
			
			if(agreeCheckBox === true){
				sap.ui.getCore().byId("agreeCheckBox").setValueState("None");
			}else{
				sap.ui.getCore().byId("agreeCheckBox").setValueState("Error");
				
			}
			
			if((iconEmpId.match(validEmpId)) && (iconEmpGradName.match(validEmpName)) && (iconEmpWorkCompanyName.match(validEmpName)) && (iconEmpWorkExperience !== "") &&
			(iconEmpJoinedDate !== "") && (iconEmpTechnicalSkills.length !== 0) && (agreeCheckBox === true)){
				
					MessageToast.show("Data Submitted Successfully");
				
				var objectEmployeeSkills = {
					oEmpId : iconEmpId,
					oEmpCollegeName : iconEmpGradName,
					oEmpCompanyName : iconEmpWorkCompanyName,
					oEmpExperience : iconEmpWorkExperience,
					oEmpJoinedDate :iconEmpJoinedDate,
					oEmpTechnicalSkills : TechSkills,
					iconTechnicalSkillsKeys : iconEmpTechnicalSkillsKeys,
					workkeys:workkey,
					agreeCheckBox:agreeCheckBox
					
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().iconEmployee6.push(objectEmployeeSkills);
				
				this.getOwnerComponent().getRouter().navTo("View5");
				oModel.refresh(true);
			}else{
				MessageBox.warning("Please Fill All Mandatory Details");
			}
		}
	});
});