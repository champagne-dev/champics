CHAMPICS = {};
CHAMPICS.reactive = {};
CHAMPICS.misc = {};
CHAMPICS.utils = {
	insertAt: function(array, o, index){
	    /**
	    * Add an element at the specified index
	    * @param {Object} o The object to add
	    * @param {int} index The index position the element has to be inserted
	    * @return {Boolean} True if you can insert
	    */  
	    var array_copy = JSON.parse(JSON.stringify(array));
	    if ( index > -1 && index <= array_copy.length ) {
	        array_copy.splice(index, 0, o);
	    }        
	    return array_copy;
	},
	insertAfterKey: function(array, o, toInsert){
	/**
	* Add an element before another element
	* @param {Object} The object after which you want to insert
	* @param {Object} The object to insert
	* @return {Boolean} True if inserted, false otherwise
	*/
	var inserted = false;
	var array_copy = JSON.parse(JSON.stringify(array));
	var index = array_copy.indexOf(o);
	if(index == -1)
	    return array_copy;
	else {
	    if(index == array_copy.length - 1){
	        array_copy.push(toInsert);
	    }
	    else{
	       array_copy = CHAMPICS.utils.insertAt(array_copy, toInsert, index + 1);
	    }
	     return array_copy;
	  	}   
	},
	buildCommentThread: function(mut_array, comments, comment){
		for(var it in comments){
			var _comment = comments[it];
			if(parseInt(_comment["id"]) == parseInt(comment.replied_id)){// found the next comment up.
				mut_array.push(_comment);
				return CHAMPICS.utils.buildCommentThread(mut_array, comments, _comment);
			}
			else if(parseInt(_comment["id"]) == parseInt(comment.id) && parseInt(comment.replied_id) == -1){ // Found the top level comment
				return mut_array;
			}
		}
	}
}