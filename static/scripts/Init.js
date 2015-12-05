CHAMPICS = {};
CHAMPICS.reactive = {};
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
		console.log(array_copy);
	    if(index == array_copy.length - 1){
	        array_copy.push(toInsert);
	    }
	    else{
	       array_copy = insertAt(array_copy, toInsert, index + 1);
	    }
	     return array_copy;
	  	}   
	},
	buildCommentThread: function(mut_array, comments, replied_id){
		for(var comment in comments){
			if(comment["id"] == replied_id){
				mut_array.push(comment.id)
				if(comment.replied_id == -1)
					return;
				else
					CHAMPICS.utils.buildCommentThread(mut_array, comments, comment.replied_id);
			}
		}
	}
}