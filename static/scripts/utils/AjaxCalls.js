CHAMPICS.ajax = {
	saveComment: function(replied_id, post_id, edit_data, text, author, topicName, topicName, success) {
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
	savePost: function(name, email, topic_id, topicName, success) {
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
	saveTopic: function(name, success) {

		var data = {
			name: name
		};

		$.ajax({
			type: "POST",
			url: "/createTopic",
            data: data,
            success: function(data) {
            	success(data);
            },
            error: function(e) {

            }
		});
	}
}