var selectOptions = "";
var option = "";
var value = "";
var html = "";
var title = "Roll Chummer";

html = `
   <div class="form-group">
	   <label style='font-weight: bold;'>
		  ${title}
	   </label></br></br>
	   <label style='font-weight: bold;'>Why am I rolling?</label>
	   <input id='rollReason' name='rollReason' type='text' value='' onfocus='this.select()' style='width: unset; margin-bottom: 5px;'></br></br>
	   <label style='font-weight: bold;'>Number of Dice</label>
	   <input id='rollQuery' name='rollQuery' type='text' value='' onfocus='this.select()' style='width: unset; margin-bottom: 5px;'></br></br>
	   <label style='font-weight: bold;'>Target Number</label>
	   <input id='rollQuery' name='rollTarget' type='text' value='' onfocus='this.select()' style='width: unset; margin-bottom: 5px;'>
	   
   </div>`;

const selected = await new Promise((resolve, reject) => {
setTimeout(function () {
	new Dialog({
		title: "Query",
		content: html,
		buttons: {
			yes: {
				icon: '<i class="fas fa-check"></i>',
				label: 'Select',
				callback: html => resolve(html.find('[name="rollQuery"]')[0].value)
				},
			no: {
				icon: '<i class="fas fa-times"></i>',
				label: 'Cancel',
				callback: reject
			}
			},
			default: "yes",
			close: reject
				} /* , options */).render(true);
		setTimeout(function() { document.getElementById("rollQuery").focus(); }, 250);
		}, 100);
	});
	
	
	var diceRoll = "";
	var i;
	for (i = 0; i < document.getElementById("rollQuery").value; i++) {
	  diceRoll+="1d6,";
	}

	var dice = "{" + diceRoll + "}cs>=" + document.getElementById("rollTarget").value + "x6";
	var roll = new Roll(dice, token.actor.getRollData()).roll();
	roll.toMessage({
	  flavor: `${actor.name} ` + document.getElementById("rollQuery").value,
	});

