module.exports = {
	emptyObject: (inputObj) => {
		if (inputObj.constructor !== Object) {
			const err = new Error("The input type sould be an object.");
			err.statusCode = 400;
			throw err;
		}
		if (Object.keys(inputObj).length === 0) {
			const err = new Error("The input should not be empty.");
			err.statusCode = 400;
			throw err;
		}
		return;
	},

	filledAllFieldObject: (inputObj, requiredFieldsAry) => {
		const notFound = [];
		let allFilled = true;
		requiredFieldsAry.forEach((field) => {
			if (inputObj[field] === undefined || inputObj[field] === "") { 
				notFound.push(field);
				allFilled = false;
			}
		});
		if (allFilled) {
			return;
		} else {
			const err = new Error(
				`All fields are required, missing ${notFound.join()}.`
			);
			err.statusCode = 400;
			throw err;
		}
	},

	validPhoneNumber: (phoneNumber) => {
		let noOfNumber = phoneNumber.replace(/[^0-9]/g, "");
        if(noOfNumber.length < 4){
            const err = new Error("For phone number please at least enter 4 number.")
			err.statusCode = 400;
			throw err;
        }
        return;
	},

    validEmail: (email) => {
		let emailReg = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$');
        let validEmail = emailReg.test(email);
        if(!validEmail){
            const err = new Error("Invalid email, please enter email in following format abc@example.com")
			err.statusCode = 400;
			throw err;
        }
        return;
	},
};
