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
	 "sap/m/CheckBox",
	 "sap/m/TimePicker"
], function(Controller, MessageToast, MessageBox, SimpleForm, Label, Input, Button, Select, DatePicker, CheckBox, TimePicker) {
	"use strict";

	return Controller.extend("com.dpz_Ten_Views_Task.controller.View1", {
		onInit:function(){
			debugger;
			
				this.getView().byId("personMale").setSelected(false);
				this.getView().byId("personFemale").setSelected(false);
				this.getView().byId("personIndia").setSelected(false);
				this.getView().byId("personNotIndia").setSelected(false);
			
				var todayDate = new Date();
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.setProperty("/minDate", todayDate);
			
				var BusForm = new SimpleForm({
					editable: true,
	                layout: "ResponsiveGridLayout",
	                title: "Booking Form",
	                labelSpanXL:5, labelSpanL:4, labelSpanM:5, labelSpanS:3, emptySpanXL:4,
					emptySpanL:4, emptySpanM:6, emptySpanS:3, columnsXL:6, columnsL:3, columnsM:3,
                content: [
                    new Label({ text: "First Name", required:true }),
                	new Input({ placeholder: "Enter First Name", id:"dFirstName"} ),
                	new Label({ text: "Last Name", required:true }),
                	new Input({ placeholder: "Enter Last Name", id:"dLastName" }),
                	new Label({ text: "Email", required:true }),
                    new Input({ placeholder: "Enter Email", id:"dEmailId" }),
                    new Label({ text: "Mobile Number", required:true }),
                    new Input({ placeholder: "Enter Mobile Number", id:"dMobileNumber" }),
                	new Label({ text: "Choose Bus", required:true}),
                    new Select({id:"dChooseBus", forceSelection:false}),
                    new Label({ text: "Choose Date", required:true}),
                    new DatePicker({displayFormat:"dd.MM.YYYY", id:"dChooseDate", minDate:"{TenDataModel>/minDate}"}),
                    new Label({ text: "Category", required:true}),
                    new CheckBox({text: "Non-Stop", id:"nonStopCheckBox"}),
                    new CheckBox({text: "Ac", id:"acCheckBox"}),
                    new Label({ text:"Departure Time", required:true}),
                    new TimePicker({id:"departureTime"}),
                    new Label({ text:"Arraival Time", required:true}),
                    new TimePicker({id:"arraivalTime"}),
                    new Button({
                        text: "Submit",
                        id:"onSubmitDynamicForm",
                        type:"Emphasized",
                        press: this.onSubmitForm6.bind(this)
                    })
                ]
			});
			
			var oForm = this.getView().byId("dynamicForm");
            oForm.addItem(BusForm);
            
            var oButton = this.getView().byId("dynamicButton");
            var getButton = sap.ui.getCore().byId("onSubmitDynamicForm");
            oButton.addItem(getButton);
            
            sap.ui.getCore().byId("dChooseBus").bindAggregation("items", {
                path: "TenDataModel>/busses",
                template: new sap.ui.core.Item({
                    key: "{TenDataModel>key}", 
                    text: "{TenDataModel>text}" 
                })
            });
		},
		
		onSubmitForm6:function(){
			debugger;
			var firstName = sap.ui.getCore().byId("dFirstName").getValue();
			var lastName = sap.ui.getCore().byId("dLastName").getValue();
			var emailId = sap.ui.getCore().byId("dEmailId").getValue();
			var mobileNumber = sap.ui.getCore().byId("dMobileNumber").getValue();
			var chooseBus = sap.ui.getCore().byId("dChooseBus")._getSelectedItemText();
			var chooseDate = sap.ui.getCore().byId("dChooseDate").getValue();
			var categoryA = sap.ui.getCore().byId("nonStopCheckBox").getSelected();
			var categoryB = sap.ui.getCore().byId("acCheckBox").getSelected();
			
			var categoryAText = sap.ui.getCore().byId("nonStopCheckBox").getText();
			var categoryBText = sap.ui.getCore().byId("acCheckBox").getText();
			
			var departureTime = sap.ui.getCore().byId("departureTime").getValue();
			var arraivalTime = sap.ui.getCore().byId("arraivalTime").getValue();
			
			
			var validName = /^[a-zA-Z\s]+$/;
			var validEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validMobileNo = /^[6-9]{1}[0-9]{9}$/;
		
			if(firstName.match(validName)){
				sap.ui.getCore().byId("dFirstName").setValueState("None");
			}else{
				sap.ui.getCore().byId("dFirstName").setValueState("Error");
				sap.ui.getCore().byId("dFirstName").setValueStateText("Please Enter your Correct First Name");
			}
			
			if(lastName.match(validName)){
				sap.ui.getCore().byId("dLastName").setValueState("None");
			}else{
				sap.ui.getCore().byId("dLastName").setValueState("Error");
				sap.ui.getCore().byId("dLastName").setValueStateText("Please Enter your Correct Last Name");
			}
			
			if(emailId.match(validEmailId)){
				sap.ui.getCore().byId("dEmailId").setValueState("None");
			}else{
				sap.ui.getCore().byId("dEmailId").setValueState("Error");
				sap.ui.getCore().byId("dEmailId").setValueStateText("Please Enter your Correct Email Id");
			}
			
			if(mobileNumber.match(validMobileNo)){
				sap.ui.getCore().byId("dMobileNumber").setValueState("None");
			}else{
				sap.ui.getCore().byId("dMobileNumber").setValueState("Error");
				sap.ui.getCore().byId("dMobileNumber").setValueStateText("Please Enter your Correct Mobile Number");
			}
			
			if(chooseBus !== ""){
				sap.ui.getCore().byId("dChooseBus").setValueState("None");
			}else{
				sap.ui.getCore().byId("dChooseBus").setValueState("Error");
				sap.ui.getCore().byId("dChooseBus").setValueStateText("Please Choose The Bus");
			}
			
			if(chooseDate !== ""){
				sap.ui.getCore().byId("dChooseDate").setValueState("None");
			}else{
				sap.ui.getCore().byId("dChooseDate").setValueState("Error");
				sap.ui.getCore().byId("dChooseDate").setValueStateText("Please Choose The Date");
			}
			
			if((categoryA === true) || (categoryB === true)){
				sap.ui.getCore().byId("nonStopCheckBox").setValueState("None");
				sap.ui.getCore().byId("acCheckBox").setValueState("None");
			}else{
				sap.ui.getCore().byId("nonStopCheckBox").setValueState("Error");
				sap.ui.getCore().byId("acCheckBox").setValueState("Error");
			}
			
			if(departureTime !== ""){
				sap.ui.getCore().byId("departureTime").setValueState("None");
			}else{
				sap.ui.getCore().byId("departureTime").setValueState("Error");
				sap.ui.getCore().byId("departureTime").setValueStateText("Please Select Time");
			}
			
			if(arraivalTime !== ""){
				sap.ui.getCore().byId("arraivalTime").setValueState("None");
			}else{
				sap.ui.getCore().byId("arraivalTime").setValueState("Error");
				sap.ui.getCore().byId("arraivalTime").setValueStateText("Please Select time After 7 Hrs of Departure Time");
			}
			
			if((firstName.match(validName)) && (lastName.match(validName)) && (emailId.match(validEmailId)) && (mobileNumber.match(validMobileNo)) &&
			(chooseBus !== "") && (chooseDate !== "") && ((categoryA === true) || (categoryB === true)) && (departureTime !== "") && (arraivalTime !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var BookingFormObject = {
					oFirstName : firstName,
					oLastName : lastName,
					oEmailId : emailId,
					oMobileNo : mobileNumber,
					oChooseBus : chooseBus,
					oChooseDate : chooseDate,
					oCategory : categoryAText || categoryBText,
					oDepartureTime : departureTime,
					oArraivalTime: arraivalTime
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				
				oModel.getData().BookingArray.push(BookingFormObject);
				
				sap.ui.getCore().byId("dFirstName").setValue("");
				sap.ui.getCore().byId("dLastName").setValue("");
				sap.ui.getCore().byId("dEmailId").setValue("");
				sap.ui.getCore().byId("dMobileNumber").setValue("");
				sap.ui.getCore().byId("dChooseBus").setSelectedItem(null);
				sap.ui.getCore().byId("dChooseBus").setValue("");
				sap.ui.getCore().byId("dChooseDate").setValue("");
				sap.ui.getCore().byId("nonStopCheckBox").setSelected(false);
				sap.ui.getCore().byId("acCheckBox").setSelected(false);
				sap.ui.getCore().byId("departureTime").setValue("");
				sap.ui.getCore().byId("arraivalTime").setValue("");
				
				this.getOwnerComponent().getRouter().navTo("View6");
				
				oModel.refresh(true);
			}else{
				MessageBox.error("Please Fill All Mandatoty Fields");
			}
		},
			
			
			onSubmitForm1:function(){
			debugger;
			var studentName = this.getView().byId("inputNameForm1").getValue();
			var studentNameRollNo = this.getView().byId("inputRollNoForm1").getValue();
			var studentMobileNumber = this.getView().byId("inputMobileNoForm1").getValue();
			
			var studentClass8 = this.getView().byId("inputClass8Form1").getSelected();
			if(studentClass8 === true)
			{
				var studentClass8Value = this.getView().byId("inputClass8Form1").getText();
			}
			
			var studentClass9 = this.getView().byId("inputClass9Form1").getSelected();
			if(studentClass9 === true)
			{
				var studentClass9Value = this.getView().byId("inputClass9Form1").getText();
			}
			
			var studentClass10 = this.getView().byId("inputClass10Form1").getSelected();
			if(studentClass10 === true)
			{
				var studentClass10Value = this.getView().byId("inputClass10Form1").getText();
			}
			
			var studentLanguage = this.getView().byId("inputLanguageForm1").getValue();
			
			var studentSubject = this.getView().byId("inputSubjectForm1").getSelectedItems();
			var studentSubjectKeys = this.getView().byId("inputSubjectForm1").getSelectedKeys();
			var subjetValues = [];
			for(var i = 0; i < studentSubject.length; i++){
				var getStudentSubject = studentSubject[i].getText();
				subjetValues.push(getStudentSubject);
			}
			
			var validStudentName = /^[a-zA-Z\s]+$/;
			var validStudentRollNo = /^\d[2,4]{1}[0-9]{8}$/;
			var validStudentMobileNumber = /^[6-9]{1}[0-9]{9}$/;
			
			if(studentName.match(validStudentName)){
				this.getView().byId("inputNameForm1").setValueState("None");
			}else{
				this.getView().byId("inputNameForm1").setValueState("Error");
				this.getView().byId("inputNameForm1").setValueStateText("Please Enter Correct Name");
			}
			
			if(studentNameRollNo.match(validStudentRollNo)){
				this.getView().byId("inputRollNoForm1").setValueState("None");
			}else{
				this.getView().byId("inputRollNoForm1").setValueState("Error");
				this.getView().byId("inputRollNoForm1").setValueStateText("Please Enter Correct Roll No Starts With 24 and 8 Unique Digits");
			}
			
			if(studentMobileNumber.match(validStudentMobileNumber)){
				this.getView().byId("inputMobileNoForm1").setValueState("None");
			}else{
				this.getView().byId("inputMobileNoForm1").setValueState("Error");
				this.getView().byId("inputMobileNoForm1").setValueStateText("Please Enter Correct Mobile Number");
			}
			
			if((studentClass8 === true) || (studentClass9 === true) || (studentClass10 === true)){
				this.getView().byId("inputClass8Form1").setValueState("None");
				this.getView().byId("inputClass9Form1").setValueState("None");
				this.getView().byId("inputClass10Form1").setValueState("None");
			}else{
				this.getView().byId("inputClass8Form1").setValueState("Error");
				this.getView().byId("inputClass9Form1").setValueState("Error");
				this.getView().byId("inputClass10Form1").setValueState("Error");
			}
			
			if(studentLanguage !== ""){
				this.getView().byId("inputLanguageForm1").setValueState("None");
			}else{
				this.getView().byId("inputLanguageForm1").setValueState("Error");
				this.getView().byId("inputLanguageForm1").setValueStateText("Please Select Language");
			}
			
			if(studentSubject.length  !== 0){
				this.getView().byId("inputSubjectForm1").setValueState("None");
			}else{
				this.getView().byId("inputSubjectForm1").setValueState("Error");
				this.getView().byId("inputSubjectForm1").setValueStateText("Please Select Subjects");
			}
			
			if((studentName.match(validStudentName)) && (studentNameRollNo.match(validStudentRollNo)) &&
			(studentMobileNumber.match(validStudentMobileNumber)) && ((studentClass8 === true) || (studentClass9 === true) || (studentClass10 === true)) &&
			(studentLanguage !== "") && (studentSubject.length  !== 0)){
				
				MessageToast.show("Data Submitted Successfully");
				
				var studentForm1Object = {
					oStudentName : studentName,
					oStudentRollNo : studentNameRollNo,
					oStudentMobileNo : studentMobileNumber,
					oStudentClass : studentClass8Value || studentClass9Value || studentClass10Value,
					oStudentLanguage : studentLanguage,
					oStudentSubject : subjetValues,
					oStudentSubjectKeys : studentSubjectKeys
				};
				
				this.getOwnerComponent().getRouter().navTo("View9", {
				studentForm1Object:	JSON.stringify(studentForm1Object)
				});
				
				this.getView().byId("inputNameForm1").setValue("");
				this.getView().byId("inputRollNoForm1").setValue("");
				this.getView().byId("inputMobileNoForm1").setValue("");
				this.getView().byId("inputClass8Form1").setSelected(false);
				this.getView().byId("inputClass9Form1").setSelected(false);
				this.getView().byId("inputClass10Form1").setSelected(false);
				this.getView().byId("inputLanguageForm1").setSelectedItem(null);
				this.getView().byId("inputLanguageForm1").setValue("");
				this.getView().byId("inputSubjectForm1").setSelectedItems("");
				
				this.getView().byId("simpleForm2View1").setVisible(true);
				
				
			}else{
				MessageBox.error("Please Fill All Mandatoty Fields");
			}
			
		},
		
		onSwitchOn:function(){
			debugger;
			var empId = this.getView().byId("inputEmpIdForm1").getValue();
			var empName = this.getView().byId("inputEmpNameForm1").getValue();
			var empAge = this.getView().byId("inputEmpAgeForm1").getValue();
			var empDesignation = this.getView().byId("inputEmpDesignationForm1").getValue();
			
			var empTechnicalSkills = this.getView().byId("inputEmpTechSkillsForm1").getSelectedItems();
			var skillsValues = [];
			for(var i = 0; i < empTechnicalSkills.length; i++){
				var getEmpSkill = empTechnicalSkills[i].getText();
				skillsValues.push(getEmpSkill);
			}
			
			var empInterestedJob = this.getView().byId("inputEmpJobForm1").getSelectedItems();
			var jobValues = [];
			for(var j = 0; j < empInterestedJob.length; j++){
				var getEmpJobs = empInterestedJob[j].getText();
				jobValues.push(getEmpJobs);
			}
			
			var empPlace = this.getView().byId("inputEmpPlaceForm1").getValue();
			
			var validEmpId = /^\d[2,4]{1}[0-9]{8}$/;
			var validEmpName = /^[a-zA-Z\s]+$/;
			var validEmpAge = /^([1-2][0-9])$/;
			var validEmpDesignation = /^[a-zA-Z\s]+$/;
			
			if(empId.match(validEmpId)){
				this.getView().byId("inputEmpIdForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpIdForm1").setValueState("Error");
				this.getView().byId("inputEmpIdForm1").setValueStateText("Please Enter Correct Emp Id Starts With 24 and 8 Unique Digits");
			}
			
			if(empName.match(validEmpName)){
				this.getView().byId("inputEmpNameForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpNameForm1").setValueState("Error");
				this.getView().byId("inputEmpNameForm1").setValueStateText("Please Enter Correct Emp Name");
			}
			
			if(empAge.match(validEmpAge)){
				this.getView().byId("inputEmpAgeForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpAgeForm1").setValueState("Error");
				this.getView().byId("inputEmpAgeForm1").setValueStateText("Please Enter Correct Age");
			}
			
			if(empDesignation.match(validEmpDesignation)){
				this.getView().byId("inputEmpDesignationForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpDesignationForm1").setValueState("Error");
				this.getView().byId("inputEmpDesignationForm1").setValueStateText("Please Enter Correct Emp Designation");
			}
			
			if(empTechnicalSkills.length !== 0){
				this.getView().byId("inputEmpTechSkillsForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpTechSkillsForm1").setValueState("Error");
				this.getView().byId("inputEmpTechSkillsForm1").setValueStateText("Please Select Emp Technical Skills");
			}
			
			if(empInterestedJob.length !== 0){
				this.getView().byId("inputEmpJobForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpJobForm1").setValueState("Error");
				this.getView().byId("inputEmpJobForm1").setValueStateText("Please Select Emp Interested Job");
			}
			
			if(empPlace !== ""){
				this.getView().byId("inputEmpPlaceForm1").setValueState("None");
			}else{
				this.getView().byId("inputEmpPlaceForm1").setValueState("Error");
				this.getView().byId("inputEmpPlaceForm1").setValueStateText("Please Select Emp Place");
			}
			
			if((empId.match(validEmpId)) && (empName.match(validEmpName)) && (empAge.match(validEmpAge)) && 
			(empDesignation.match(validEmpDesignation)) && (empTechnicalSkills.length !== 0) && (empInterestedJob.length !== 0) && (empPlace !== "")){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectEmpForm = {
					oEmpId : empId,
					oEmpName : empName,
					oEmpAge : empAge,
					oEmpDesignation : empDesignation,
					oEmpTechnicalSkills : skillsValues,
					oEmpInterestedJob : jobValues,
					oEmpPlace : empPlace
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				
				oModel.getData().employeeArray.push(objectEmpForm);
				
				this.getView().byId("inputEmpIdForm1").setValue("");
				this.getView().byId("inputEmpNameForm1").setValue("");
				this.getView().byId("inputEmpAgeForm1").setValue("");
				this.getView().byId("inputEmpDesignationForm1").setValue("");
				this.getView().byId("inputEmpTechSkillsForm1").setSelectedItems("");
				this.getView().byId("inputEmpJobForm1").setSelectedItems("");
				this.getView().byId("inputEmpPlaceForm1").setSelectedItem(null);
				this.getView().byId("inputEmpPlaceForm1").setValue("");
				
				this.getView().byId("companyFormTitle").setVisible(true);
				this.getView().byId("panelForm").setVisible(true);
				this.getView().byId("panelButton").setVisible(true);
				
				var oSwitch = this.byId("switchBtn");
				oSwitch.setState(false);
				
				this.getOwnerComponent().getRouter().navTo("View9");
				
			}else{
				MessageBox.error("Please Fill All Mandatoty Fields");
				var oSwitchA = this.byId("switchBtn");
            	oSwitchA.setState(false);
			}
		},
		
		
		onChangeView8:function(){
			debugger;
			var f4StudentName = this.getView().byId("inputSName").getValue();
			var f4StudentRollNo = this.getView().byId("inputSRollNo").getValue();
			var f4StudentAge = this.getView().byId("inputSAge").getValue();
			var f4StudentHobbies = this.getView().byId("inputSHobbies").getSelectedItems();
			var hobbiesArray = [];
			for(var i = 0; i < f4StudentHobbies.length; i++){
				var getHobbies = f4StudentHobbies[i].getText();
				hobbiesArray.push(getHobbies);
			}
			var f4StudentCity = this.getView().byId("inputSCity").getValue();
			var f4StudentState = this.getView().byId("inputSState").getValue();
			
			var validStudentName = /^[a-zA-Z\s]+$/;
			var validStudentRollNo = /^\d[2,4]{1}[0-9]{8}$/;
			var validStudentAge = /^([1-2][0-9])$/;
			
			if(f4StudentName.match(validStudentName)){
				this.getView().byId("inputSName").setValueState("None");
			}else{
				this.getView().byId("inputSName").setValueState("Error");
				this.getView().byId("inputSName").setValueStateText("Please Enter Correct Name");
			}
			
			if(f4StudentRollNo.match(validStudentRollNo)){
				this.getView().byId("inputSRollNo").setValueState("None");
			}else{
				this.getView().byId("inputSRollNo").setValueState("Error");
				this.getView().byId("inputSRollNo").setValueStateText("Please Enter Correct Roll No");
			}
			
			if(f4StudentAge.match(validStudentAge)){
				this.getView().byId("inputSAge").setValueState("None");
			}else{
				this.getView().byId("inputSAge").setValueState("Error");
				this.getView().byId("inputSAge").setValueStateText("Please Enter Correct Age");
			}
			
			if(f4StudentHobbies.length !== 0){
				this.getView().byId("inputSHobbies").setValueState("None");
			}else{
				this.getView().byId("inputSHobbies").setValueState("Error");
				this.getView().byId("inputSHobbies").setValueStateText("Please Select Hobbies");
			}
			
			if(f4StudentCity !== ""){
				this.getView().byId("inputSCity").setValueState("None");
			}else{
				this.getView().byId("inputSCity").setValueState("Error");
				this.getView().byId("inputSCity").setValueStateText("Please Select City");
			}
			
			if(f4StudentState !== ""){
				this.getView().byId("inputSState").setValueState("None");
			}else{
				this.getView().byId("inputSState").setValueState("Error");
				this.getView().byId("inputSState").setValueStateText("Please Select State");
			}
			
			
			if((f4StudentName.match(validStudentName)) && (f4StudentRollNo.match(validStudentRollNo)) && (f4StudentAge.match(validStudentAge)) && 
			(f4StudentHobbies.length !== 0) && (f4StudentCity !== "") && (f4StudentState !== "")){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectStudent = {
					oSName : f4StudentName,
					oSRollNo : f4StudentRollNo,
					oSAge : f4StudentAge,
					oSHobbies : hobbiesArray,
					oSCity : f4StudentCity,
					oSState : f4StudentState
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().studentFormArray = objectStudent;
				
				this.getView().byId("inputSName").setValue("");
				this.getView().byId("inputSRollNo").setValue("");
				this.getView().byId("inputSAge").setValue("");
				this.getView().byId("inputSHobbies").setSelectedItems("");
				this.getView().byId("inputSCity").setSelectedItem(null);
				this.getView().byId("inputSCity").setValue("");
				this.getView().byId("inputSState").setSelectedItem(null);
				this.getView().byId("inputSState").setValue("");
				
				this.getView().byId("gridLayoutForm").setVisible(true);
				this.getView().byId("gridTitle").setVisible(true);
				
				this.getOwnerComponent().getRouter().navTo("View8");
				
				oModel.refresh(true);
				
			}else{
					MessageBox.error("Please Fill All Mandatoty Fields");
					this.getView().byId("inputSState").setValue("");
					this.getView().byId("inputSState").setValueState("Error");
			}
		},
		
		
		onChangeView7:function(){
			debugger;
			var personName = this.getView().byId("personName").getValue();
			var personAge = this.getView().byId("personAge").getValue();
			var personMobileNo = this.getView().byId("personMobileNo").getValue();
			var personEmailId = this.getView().byId("personEmailId").getValue();
			
			var personGenderMale = this.getView().byId("personMale").getSelected();
			if(personGenderMale === true){
				var personMale = this.getView().byId("personMale").getText();
			}
			
			var personGenderFemale = this.getView().byId("personFemale").getSelected();
			if(personGenderFemale === true){
				var personFemale = this.getView().byId("personFemale").getText();
			}
			
			var personResidenceIndia = this.getView().byId("personIndia").getSelected();
			if(personResidenceIndia === true){
				var personIndia = this.getView().byId("personIndia").getText();
			}
			
			var personNonResidenceIndia = this.getView().byId("personNotIndia").getSelected();
			if(personNonResidenceIndia === true){
				var personNonIndia = this.getView().byId("personNotIndia").getText();
			}
			
			var personLanguage = this.getView().byId("personLanguage").getSelectedItems();
			var languageArray = [];
			for(var i = 0; i < personLanguage.length; i++){
				var getSelectedLanguages = personLanguage[i].getText();
				languageArray.push(getSelectedLanguages);
			}
			
			var personCity = this.getView().byId("personCity").getValue();
			
			
			var validPersonName = /^[a-zA-Z\s]+$/;
			var validStudentAge = /^([1-2][0-9])$/;
			var validPersonMobileNo = /^[6-9]{1}[0-9]{9}$/;
			var validPersonEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			
			if(personName.match(validPersonName)){
				this.getView().byId("personName").setValueState("None");
			}else{
				this.getView().byId("personName").setValueState("Error");
				this.getView().byId("personName").setValueStateText("Please Enter Correct Name");
			}
			
			if(personAge.match(validStudentAge)){
				this.getView().byId("personAge").setValueState("None");
			}else{
				this.getView().byId("personAge").setValueState("Error");
				this.getView().byId("personAge").setValueStateText("Please Enter Correct Age");
			}
			
			if(personMobileNo.match(validPersonMobileNo)){
				this.getView().byId("personMobileNo").setValueState("None");
			}else{
				this.getView().byId("personMobileNo").setValueState("Error");
				this.getView().byId("personMobileNo").setValueStateText("Please Enter Correct Mobile NO");
			}
			
			if(personEmailId.match(validPersonEmailId)){
				this.getView().byId("personEmailId").setValueState("None");
			}else{
				this.getView().byId("personEmailId").setValueState("Error");
				this.getView().byId("personEmailId").setValueStateText("Please Enter Correct Name");
			}
			
			if(personGenderMale === true || personGenderFemale === true){
				this.getView().byId("personMale").setValueState("None");
				this.getView().byId("personFemale").setValueState("None");
			}else{
				this.getView().byId("personMale").setValueState("Error");
				this.getView().byId("personFemale").setValueState("Error");
			}
			
			if(personResidenceIndia === true || personNonResidenceIndia === true){
				this.getView().byId("personIndia").setValueState("None");
				this.getView().byId("personNotIndia").setValueState("None");
			}else{
				this.getView().byId("personIndia").setValueState("Error");
				this.getView().byId("personNotIndia").setValueState("Error");
			}
			
			if(personLanguage.length !== 0){
				this.getView().byId("personLanguage").setValueState("None");
			}else{
				this.getView().byId("personLanguage").setValueState("Error");
				this.getView().byId("personLanguage").setValueStateText("Please Select Known Languages");
			}
			
			if(personCity !== ""){
				this.getView().byId("personCity").setValueState("None");
			}else{
				this.getView().byId("personCity").setValueState("Error");
				this.getView().byId("personCity").setValueStateText("Please Select City");
			}
			
			if((personName.match(validPersonName)) && (personAge.match(validStudentAge)) && (personMobileNo.match(validPersonMobileNo)) &&
			(personGenderMale === true || personGenderFemale === true) && (personResidenceIndia === true || personNonResidenceIndia === true) &&
			(personEmailId.match(validPersonEmailId)) && (personLanguage.length !== 0) && (personCity !== "")){
				MessageToast.show("Data Submitted Successfully");
				
				var objectPerson = {
					oPersonName : personName,
					oPersonAge : personAge,
					oPersonMobileNo : personMobileNo,
					oPersonEmailId : personEmailId,
					oPersonGender : personMale || personFemale,
					oPersonResidence : personIndia || personNonIndia,
					oPersonLanguage : languageArray,
					oPersonCity : personCity
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().personFormArray = objectPerson;
				
				this.getView().byId("personName").setValue("");
				this.getView().byId("personAge").setValue("");
				this.getView().byId("personMobileNo").setValue("");
				this.getView().byId("personEmailId").setValue("");
				this.getView().byId("personMale").setSelected(false);
				this.getView().byId("personFemale").setSelected(false);
				this.getView().byId("personIndia").setSelected(false);
				this.getView().byId("personNotIndia").setSelected(false);
				this.getView().byId("personLanguage").setSelectedItems("");
				this.getView().byId("personCity").setSelectedItem(null);
				this.getView().byId("personCity").setValue("");
				
				this.getView().byId("dynamicForm").setVisible(true);
				this.getView().byId("dynamicButton").setVisible(true);
				
				this.getOwnerComponent().getRouter().navTo("View7");
				
				oModel.refresh(true);
			}else{
				MessageBox.error("Please Fill All Mandatoty Fields");
					this.getView().byId("personCity").setValue("");
					this.getView().byId("personCity").setValueState("Error");
			}
		},
		
		onSubmitFormPanel: function(){
			debugger;
			
			var companyName = this.getView().byId("companyName").getValue();
			var companyFounded = this.getView().byId("companyFounded").getValue();
			var companyEmailId = this.getView().byId("companyEmailId").getValue();
			var companyMobileNo = this.getView().byId("companyMobileNo").getValue();
			var companyEmployess = this.getView().byId("noOfEmployees").getValue();
			var companyTypeIt = this.getView().byId("companyTypeIt").getSelected();
			if(companyTypeIt === true){
				var getCompanyIt = this.getView().byId("companyTypeIt").getText();
			}
			var companyTypeNonIt = this.getView().byId("companyTypeNonIt").getSelected();
			if(companyTypeNonIt === true){
				var getCompanyNonIt = this.getView().byId("companyTypeNonIt").getText();
			}
			var companyServices = this.getView().byId("companyServices").getSelectedItems();
			var servicesArray = [];
			for(var i = 0; i < companyServices.length; i++){
				var getServices = companyServices[i].getText();
				servicesArray.push(getServices);
			}
			
			var validCompanyName = /^[a-zA-Z\s]+$/;
			var validCompanyEmailId = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
			var validCompanyMobileNumber = /^[6-9]{1}[0-9]{9}$/;
			
			if(companyName.match(validCompanyName)){
				this.getView().byId("companyName").setValueState("None");
			}else{
				this.getView().byId("companyName").setValueState("Error");
				this.getView().byId("companyName").setValueStateText("Please Enter Correct Company Name");
			}
			
			if(companyFounded !== ""){
				this.getView().byId("companyFounded").setValueState("None");
			}else{
				this.getView().byId("companyFounded").setValueState("Error");
				this.getView().byId("companyFounded").setValueStateText("Please Select Correct Date");
			}
			
			if(companyEmailId.match(validCompanyEmailId)){
				this.getView().byId("companyEmailId").setValueState("None");
			}else{
				this.getView().byId("companyEmailId").setValueState("Error");
				this.getView().byId("companyEmailId").setValueStateText("Please Enter Correct Company Email Id");
			}
			
			if(companyMobileNo.match(validCompanyMobileNumber)){
				this.getView().byId("companyMobileNo").setValueState("None");
			}else{
				this.getView().byId("companyMobileNo").setValueState("Error");
				this.getView().byId("companyMobileNo").setValueStateText("Please Enter Corect Company Mobile Number");
			}
			
			if(companyEmployess !== ""){
				this.getView().byId("noOfEmployees").setValueState("None");
			}else{
				this.getView().byId("noOfEmployees").setValueState("Error");
				this.getView().byId("noOfEmployees").setValueStateText("Please Select Company Employees");
			}
			
			if((companyTypeIt === true) || (companyTypeNonIt === true)){
				this.getView().byId("companyTypeIt").setValueState("None");
				this.getView().byId("companyTypeNonIt").setValueState("None");
			}else{
				this.getView().byId("companyTypeIt").setValueState("Error");
				this.getView().byId("companyTypeNonIt").setValueState("Error");
			}
			
			if(companyServices.length !== 0){
				this.getView().byId("companyServices").setValueState("None");
			}else{
				this.getView().byId("companyServices").setValueState("Error");
				this.getView().byId("companyServices").setValueStateText("Please Select Company Services");
			}
			
			if((companyName.match(validCompanyName)) && (companyFounded !== "") && (companyEmailId.match(validCompanyEmailId)) &&
			(companyMobileNo.match(validCompanyMobileNumber)) && (companyEmployess !== "") && ((companyTypeIt === true) || (companyTypeNonIt === true)) &&
			(companyServices.length !== 0)){
				
				MessageToast.show("Data Submitted Successfully");
				
				var objectCompany = {
					oCompanyName : companyName,
					oCompanyFounded : companyFounded,
					oCompanyEmailId : companyEmailId,
					oCompanyMobileNo : companyMobileNo,
					oCompanyEmployees :companyEmployess,
					oCompanyType : getCompanyIt || getCompanyNonIt,
					oCompanyServices : servicesArray
				};
				
				var oModel = this.getOwnerComponent().getModel("TenDataModel");
				oModel.getData().CompanyFormArray.push(objectCompany);
				
				this.getView().byId("companyName").setValue("");
				this.getView().byId("companyFounded").setValue("");
				this.getView().byId("companyEmailId").setValue("");
				this.getView().byId("companyMobileNo").setValue("");
				this.getView().byId("noOfEmployees").setSelectedItem(null);
				this.getView().byId("noOfEmployees").setValue("");
				this.getView().byId("companyTypeIt").setSelected(false);
				this.getView().byId("companyTypeNonIt").setSelected(false);
				this.getView().byId("companyServices").setSelectedItems("");
				
				this.getView().byId("schoolFormTitle").setVisible(true);
				this.getView().byId("vboxForm").setVisible(true);
				
				this.getOwnerComponent().getRouter().navTo("View9");
				
				oModel.refresh(true);
			}else{
				MessageBox.error("Please Fill All Mandatoty Fields");
			}
		}
		
		
	});
});