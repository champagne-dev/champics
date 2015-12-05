CHAMPICS.ajax = {
	saveComment: function(replied_id, post_id, edit_data, text, author, success) {
		var topicName = window.topicName || null;
		var postName = window.postName || null;

		var data = {
			replied_id: replied_id,
			post_id: post_id,
			edit_data: edit_data,
			text: text,
			author: author
		};

		$.ajax({
			type: "POST",
			url: "/"+topicName+"/"+postName+"/createComment",
            data: data,
            success: function(data) {

            },
            error: function(e) {

            }
		});
	},
	savePost: function(name, email, topic_id, success) {
		var topicName = window.topicName || null;

		var data = {
			name: name,
			email: email,
			topic_id: topic_id
		};

		$.ajax({
			type: "POST",
			url: "/"+topicName+"/createPost",
            data: data,
            success: function(data) {
            	
            },
            error: function(e) {

            }
		});
	},
	saveTopic: function(name) {

		var data = {
			name: name
		};

		$.ajax({
			type: "POST",
			url: "/createTopic",
            data: data,
            success: function(data) {
            	
            },
            error: function(e) {

            }
		});
	}
}