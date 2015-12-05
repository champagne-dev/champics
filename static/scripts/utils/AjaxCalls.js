CHAMPICS.ajax = {
	saveComment: function(replied_id, post_id, title, author, success) {
		var data = {
			replied_id: replied_id,
			post_id: post_id,
			edit_data: CHAMPICS.misc.current_canvas_repr,
			text: title,
			author: author
		};

		$.ajax({
			type: "POST",
			url: "/"+CHAMPICS.data.current_topic.name+"/"+CHAMPICS.data.current_post.name+"/createComment",
            data: data,
            success: function(data) {
            	success(data);
            },
            error: function(e) {

            }
		});
	},
	savePost: function(url, name, email, topic_id, topicName, success) {
		var data = {
			url: url,
			name: name,
			email: email,
			topic_id: topic_id
		};

		$.ajax({
			type: "POST",
			url: "/"+topicName+"/createPost",
            data: data,
            success: function(data) {
            	success(data);
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