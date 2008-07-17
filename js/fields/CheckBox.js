(function() {
	
	var inputEx = YAHOO.inputEx, lang = YAHOO.lang, Event = YAHOO.util.Event, Dom = YAHOO.util.Dom;
	
/**
 * @class Create a checkbox.
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for CheckBoxes:
 * <ul>
 *   <li>sentValues: 2D vector of values for checked/unchecked states (default is [true, false])</li>
 * </ul>
 */
inputEx.CheckBox = function(options) {
	inputEx.CheckBox.superclass.constructor.call(this,options);
};
	
lang.extend(inputEx.CheckBox, inputEx.Field, 
/**
 * @scope inputEx.CheckBox.prototype   
 */
{
	   
	/**
	 * Adds the CheckBox specific options
	 */
	setOptions: function() {
	   inputEx.CheckBox.superclass.setOptions.call(this);
	   
	   this.sentValues = this.options.sentValues || [true, false];
	   this.checkedValue = this.sentValues[0];
	   this.uncheckedValue = this.sentValues[1];
	},
	   
	/**
	 * Render the checkbox and the hidden field
	 */
	renderComponent: function() {
	
	   this.el = inputEx.cn('input', {
	        type: 'checkbox', 
	        checked:(this.options.checked === false) ? false : true 
	   });
	   this.divEl.appendChild(this.el);
	
	   this.label = inputEx.cn('label', {className: 'inputExForm-checkbox-rightLabel'}, null, this.options.label || '');
	   this.divEl.appendChild(this.label);
	
	   // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)
	   this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.el.checked ? this.checkedValue : this.uncheckedValue});
	   this.divEl.appendChild(this.hiddenEl);
	},
	   
	/**
	 * Clear the previous events and listen for the "change" event
	 */
	initEvents: function() {
	   Event.addListener(this.el, "change", this.onChange, this, true);	
	   
	   // Awful Hack to work in IE6 and below (the checkbox doesn't fire the change event)
	   if( YAHOO.env.ua.ie && parseInt(YAHOO.env.ua.ie,10) < 7 ) {
	      Event.addListener(this.el, "click", function() { this.fireUpdatedEvt(); }, this, true);	
	   }
	},
	   
	/**
	 * Function called when the checkbox is toggled
	 * @param {Event} e The original 'change' event
	 */
	onChange: function(e) {
	   this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;
	   
	   inputEx.CheckBox.superclass.onChange.call(this,e);
	},
	
	/**
	 * Get the state value
	 * @return {Any} one of [checkedValue,uncheckedValue]
	 */
	getValue: function() {
	      return this.el.checked ? this.checkedValue : this.uncheckedValue;
	},
	
	/**
	 * Set the value of the checkedbox
	 * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]
	 */
	setValue: function(value) {
	   if (value===this.checkedValue) {
			this.hiddenEl.value = value;
			this.el.checked = true;
		}
	   else if (value===this.uncheckedValue) {
			this.hiddenEl.value = value;
			this.el.checked = false;
		}
		else {
		   throw new Error("inputEx.CheckBox.setValue: "+value+" schould be in ["+this.checkedValue+","+this.uncheckedValue+"]");
		}
	}
	
});   
	
/**
 * Register this class as "boolean" type
 */
inputEx.registerType("boolean", inputEx.CheckBox);
	
})();